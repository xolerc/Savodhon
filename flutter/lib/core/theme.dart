import 'package:flutter/material.dart';

/// Midnight Premium dizayn tizimi: #050508 fon + neon glass + golden glow.
/// Tashqi font yo'q — tizim fonti (tezlik + 60fps uchun).
class AppTheme {
  static const Color bg = Color(0xFF050508);
  static const Color bg2 = Color(0xFF0B0B14);
  static const Color card = Color(0xFF101018);
  static const Color gold = Color(0xFFF5C044);
  static const Color neon = Color(0xFF5EEAD4);
  static const Color violet = Color(0xFF8B5CF6);
  static const Color text = Color(0xFFF4F2EA);
  static const Color muted = Color(0xFF9AA0B4);

  static ThemeData dark() {
    const scheme = ColorScheme.dark(
      primary: gold,
      secondary: neon,
      surface: card,
    );
    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: bg,
      fontFamilyFallback: const ['Inter', 'Roboto', 'Segoe UI', 'sans-serif'],
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: TextStyle(
            fontSize: 20, fontWeight: FontWeight.w800, color: text),
      ),
      cardTheme: CardThemeData(
        color: card.withOpacity(0.72),
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: BorderSide(color: Colors.white.withOpacity(0.09)),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: gold,
          foregroundColor: const Color(0xFF1A1405),
          minimumSize: const Size(48, 52),
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          textStyle:
              const TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: text,
          minimumSize: const Size(48, 52),
          side: BorderSide(color: Colors.white.withOpacity(0.16)),
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        ),
      ),
      bottomNavigationBarTheme: BottomNavigationBarThemeData(
        backgroundColor: bg2.withOpacity(0.92),
        selectedItemColor: gold,
        unselectedItemColor: muted,
        type: BottomNavigationBarType.fixed,
        elevation: 0,
      ),
    );
  }

  static ThemeData light() {
    return ThemeData(
      useMaterial3: true,
      colorScheme: const ColorScheme.light(
        primary: Color(0xFF8A6A00),
        secondary: Color(0xFF0E7C6B),
        surface: Colors.white,
      ),
      scaffoldBackgroundColor: const Color(0xFFF6F1E3),
    );
  }
}

/// Neon glass karta — fon ustida yengil shisha effekt.
class GlassCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final VoidCallback? onTap;
  final bool glow;
  const GlassCard(
      {super.key,
      required this.child,
      this.padding = const EdgeInsets.all(18),
      this.onTap,
      this.glow = false});

  @override
  Widget build(BuildContext context) {
    final card = Container(
      padding: padding,
      decoration: BoxDecoration(
        color: const Color(0xFF101018).withOpacity(0.72),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withOpacity(0.09)),
        boxShadow: glow
            ? [
                BoxShadow(
                    color: AppTheme.gold.withOpacity(0.28),
                    blurRadius: 28,
                    spreadRadius: 1),
              ]
            : [
                BoxShadow(
                    color: Colors.black.withOpacity(0.45), blurRadius: 18),
              ],
      ),
      child: child,
    );
    if (onTap == null) return card;
    return InkWell(
        borderRadius: BorderRadius.circular(20), onTap: onTap, child: card);
  }
}

/// Gradient sarlavha matni.
class GoldTitle extends StatelessWidget {
  final String text;
  final double size;
  const GoldTitle(this.text, {super.key, this.size = 26});

  @override
  Widget build(BuildContext context) {
    return ShaderMask(
      shaderCallback: (b) => const LinearGradient(
        colors: [Color(0xFFFFE29A), AppTheme.gold, Color(0xFFB97E0B)],
      ).createShader(b),
      child: Text(text,
          style: TextStyle(
              fontSize: size,
              fontWeight: FontWeight.w900,
              color: Colors.white)),
    );
  }
}
