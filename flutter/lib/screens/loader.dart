import 'dart:async';

import 'package:flutter/material.dart';

import '../core/theme.dart';

/// XOLERIC loader ekrani — oltin glow + progress.
class LoaderScreen extends StatefulWidget {
  final Future<void> Function() init;
  final VoidCallback onDone;
  const LoaderScreen({super.key, required this.init, required this.onDone});

  @override
  State<LoaderScreen> createState() => _LoaderScreenState();
}

class _LoaderScreenState extends State<LoaderScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _c;
  String _status = 'Yuklanmoqda...';

  @override
  void initState() {
    super.initState();
    _c = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 1400))
      ..repeat();
    _boot();
  }

  Future<void> _boot() async {
    try {
      setState(() => _status = 'So‘zlar tayyorlanmoqda...');
      await widget.init();
      setState(() => _status = 'Tayyor!');
      await Future<void>.delayed(const Duration(milliseconds: 350));
      widget.onDone();
    } catch (_) {
      setState(() => _status = 'Xatolik — qayta urinilmoqda...');
      await Future<void>.delayed(const Duration(seconds: 1));
      widget.onDone();
    }
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bg,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            RotationTransition(
              turns: _c,
              child: Container(
                width: 92,
                height: 92,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: const LinearGradient(colors: [
                    Color(0xFFFFE29A),
                    AppTheme.gold,
                    Color(0xFF8B5CF6)
                  ]),
                  boxShadow: [
                    BoxShadow(
                        color: AppTheme.gold.withOpacity(0.5),
                        blurRadius: 44,
                        spreadRadius: 2),
                  ],
                ),
                child: const Center(
                    child: Text('S',
                        style: TextStyle(
                            fontSize: 44,
                            fontWeight: FontWeight.w900,
                            color: Color(0xFF1A1405)))),
              ),
            ),
            const SizedBox(height: 22),
            const GoldTitle('SAVODHON'),
            const SizedBox(height: 6),
            Text('XOLERIC • So‘z Ustasi',
                style: TextStyle(
                    color: Colors.white.withOpacity(0.55),
                    letterSpacing: 3,
                    fontSize: 11,
                    fontWeight: FontWeight.w600)),
            const SizedBox(height: 26),
            SizedBox(
              width: 42,
              height: 42,
              child: CircularProgressIndicator(
                  color: AppTheme.gold.withOpacity(0.9), strokeWidth: 3),
            ),
            const SizedBox(height: 14),
            Text(_status,
                style: TextStyle(color: Colors.white.withOpacity(0.6))),
          ],
        ),
      ),
    );
  }
}
