import 'package:flutter/material.dart';

import '../core/store.dart';
import '../core/theme.dart';

/// Welcome — ism kiritish (birinchi ochilish).
class WelcomeScreen extends StatefulWidget {
  final AppStore store;
  final VoidCallback onDone;
  const WelcomeScreen({super.key, required this.store, required this.onDone});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  final _ctl = TextEditingController();
  String? _err;

  @override
  void dispose() {
    _ctl.dispose();
    super.dispose();
  }

  Future<void> _go() async {
    final v = _ctl.text.trim();
    if (v.length < 2) {
      setState(() => _err = 'Ismingizni yozing (kamida 2 harf)');
      return;
    }
    if (v.length > 24) {
      setState(() => _err = 'Ism 24 harfdan oshmasin');
      return;
    }
    await widget.store.setName(v);
    widget.onDone();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bg,
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(24),
          children: [
            const SizedBox(height: 30),
            Center(
              child: Container(
                width: 110,
                height: 110,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: const LinearGradient(colors: [
                    Color(0xFFFFE29A),
                    AppTheme.gold,
                    Color(0xFFB97E0B)
                  ]),
                  boxShadow: [
                    BoxShadow(
                        color: AppTheme.gold.withOpacity(0.45),
                        blurRadius: 50,
                        spreadRadius: 2),
                  ],
                ),
                child: const Center(
                    child: Text('📖', style: TextStyle(fontSize: 52))),
              ),
            ),
            const SizedBox(height: 24),
            const Center(child: GoldTitle('Xush kelibsiz!', size: 30)),
            const SizedBox(height: 10),
            Center(
              child: Text(
                'Savodhon — o‘zbekcha savodxonlik ustasi.\n28 harf • 6 bosqich • 1008 so‘z',
                textAlign: TextAlign.center,
                style:
                    TextStyle(color: Colors.white.withOpacity(0.65), height: 1.5),
              ),
            ),
            const SizedBox(height: 28),
            const GlassCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('🎯 Nima qilasiz?',
                      style:
                          TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
                  SizedBox(height: 8),
                  Text(
                      '• Bo‘g‘inlab o‘qish\n• Eshitib takrorlash\n• Har kuni streak yig‘ish\n• SM-2 bilan mustahkamlash',
                      style: TextStyle(
                          color: AppTheme.muted, height: 1.7, fontSize: 14)),
                ],
              ),
            ),
            const SizedBox(height: 20),
            TextField(
              controller: _ctl,
              maxLength: 24,
              textCapitalization: TextCapitalization.words,
              style: const TextStyle(color: Colors.white, fontSize: 18),
              decoration: InputDecoration(
                labelText: 'Ismingiz',
                hintText: 'Masalan: Jasur',
                errorText: _err,
                filled: true,
                fillColor: Colors.white.withOpacity(0.06),
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(16),
                    borderSide: BorderSide.none),
              ),
              onSubmitted: (_) => _go(),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: _go,
              child: const Text('Boshlash  →'),
            ),
          ],
        ),
      ),
    );
  }
}
