import 'package:flutter/material.dart';
import 'package:flutter_tts/flutter_tts.dart';

/// TTS yordamchisi (uz-UZ, topilmasa tr-TR/en fallback).
class TtsHelper {
  static final FlutterTts _tts = FlutterTts();
  static bool _init = false;

  static Future<void> _ensure() async {
    if (_init) return;
    _init = true;
    try {
      await _tts.setSharedInstance(true);
      await _tts.setSpeechRate(0.45);
      await _tts.setVolume(1.0);
      await _tts.setPitch(1.0);
      try {
        await _tts.setLanguage('uz-UZ');
      } catch (_) {
        try {
          await _tts.setLanguage('tr-TR');
        } catch (_) {}
      }
    } catch (_) {}
  }

  static Future<void> speak(String text) async {
    try {
      await _ensure();
      final plain = text.replaceAll('-', ' ').replaceAll("'", 'ʼ');
      await _tts.stop();
      await _tts.speak(plain);
    } catch (_) {}
  }

  static Future<void> stop() async {
    try {
      await _tts.stop();
    } catch (_) {}
  }
}

/// Bo'g'in chiplari qatori.
class SyllableChips extends StatelessWidget {
  final String hyphen;
  final int active;
  final Color activeColor;
  const SyllableChips(
      {super.key, required this.hyphen, this.active = -1, required this.activeColor});

  @override
  Widget build(BuildContext context) {
    final parts = hyphen.split('-');
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      alignment: WrapAlignment.center,
      children: [
        for (var i = 0; i < parts.length; i++)
          AnimatedContainer(
            duration: const Duration(milliseconds: 220),
            padding:
                const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(14),
              color: i == active
                  ? activeColor.withValues(alpha: 0.28)
                  : Colors.white.withValues(alpha: 0.06),
              border: Border.all(
                  color: i == active
                      ? activeColor
                      : Colors.white.withValues(alpha: 0.14),
                  width: i == active ? 1.6 : 1),
            ),
            child: Text(parts[i],
                style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w800,
                    color: i == active
                        ? Colors.white
                        : Colors.white.withValues(alpha: 0.85))),
          ),
      ],
    );
  }
}
