import 'package:flutter/material.dart';

import 'core/store.dart';
import 'core/theme.dart';
import 'screens/achievements.dart';
import 'screens/alphabet.dart';
import 'screens/dashboard.dart';
import 'screens/loader.dart';
import 'screens/review.dart';
import 'screens/settings.dart';
import 'screens/welcome.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const SavodhonApp());
}

class SavodhonApp extends StatefulWidget {
  const SavodhonApp({super.key});

  @override
  State<SavodhonApp> createState() => _SavodhonAppState();
}

class _SavodhonAppState extends State<SavodhonApp> {
  final AppStore _store = AppStore();
  bool _booted = false;

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: _store,
      builder: (context, _) {
        return MaterialApp(
          title: 'Savodhon',
          debugShowCheckedModeBanner: false,
          theme: AppTheme.dark(),
          darkTheme: AppTheme.dark(),
          themeMode:
              _store.themeMode == 1 ? ThemeMode.light : ThemeMode.dark,
          home: !_booted
              ? LoaderScreen(
                  init: _store.load,
                  onDone: () => setState(() => _booted = true),
                )
              : !_store.loaded
                  ? const Scaffold(
                      backgroundColor: AppTheme.bg,
                      body: Center(child: CircularProgressIndicator()))
                  : _store.name.isEmpty
                      ? WelcomeScreen(
                          store: _store,
                          onDone: () => setState(() {}),
                        )
                      : HomeShell(store: _store),
        );
      },
    );
  }
}

class HomeShell extends StatefulWidget {
  final AppStore store;
  const HomeShell({super.key, required this.store});

  @override
  State<HomeShell> createState() => _HomeShellState();
}

class _HomeShellState extends State<HomeShell> {
  int idx = 0;

  @override
  Widget build(BuildContext context) {
    final pages = [
      DashboardScreen(store: widget.store),
      AlphabetScreen(store: widget.store),
      ReviewScreen(store: widget.store),
      AchievementsScreen(store: widget.store),
      SettingsScreen(store: widget.store),
    ];
    // Alifbo/Takror sahifalari o'z AppBar'iga ega (push'da ham kerak),
    // shuning uchun qobiqda ortiqcha AppBar yo'q.
    return Scaffold(
      backgroundColor: AppTheme.bg,
      body: SafeArea(
        top: idx == 0,
        child: IndexedStack(index: idx, children: pages),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: idx,
        onTap: (v) => setState(() => idx = v),
        items: const [
          BottomNavigationBarItem(icon: Text('🏠', style: TextStyle(fontSize: 22)), label: 'Uy'),
          BottomNavigationBarItem(icon: Text('🔤', style: TextStyle(fontSize: 22)), label: 'Alifbo'),
          BottomNavigationBarItem(icon: Text('🔁', style: TextStyle(fontSize: 22)), label: 'Takror'),
          BottomNavigationBarItem(icon: Text('🏆', style: TextStyle(fontSize: 22)), label: 'Yutuq'),
          BottomNavigationBarItem(icon: Text('⚙️', style: TextStyle(fontSize: 22)), label: 'Sozlama'),
        ],
      ),
    );
  }
}
