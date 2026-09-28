import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_to_text.dart';

import '../core/old_new.dart';
import '../core/srs.dart';
import '../core/store.dart';
import '../core/theme.dart';
import '../core/tts.dart';
import '../data/en.dart';
import '../data/visual.dart';

/// Eshit-takrorla: speech_to_text (uz-UZ) + Levenshtein baho.
/// Mikrofon bo'lmasa — o'z-o'zini baholash rejimi.
class ListenScreen extends StatefulWidget {
  final AppStore store;
  final List<QueueItem> queue;
  const ListenScreen({super.key, required this.store, required this.queue});

  @override
  State<ListenScreen> createState() => _ListenScreenState();
}

class _ListenScreenState extends State<ListenScreen> {
  final SpeechToText _stt = SpeechToText();
  int idx = 0;
  bool sttReady = false;
  bool listening = false;
  String heard = '';
  int? pct;
  String? notice;
  bool noMicMode = false;

  QueueItem get cur => widget.queue[idx];

  @override
  void initState() {
    super.initState();
    _initStt();
    TtsHelper.speak(widget.queue.isNotEmpty ? widget.queue.first.hyphen : '');
  }

  Future<void> _initStt() async {
    try {
      sttReady = await _stt.initialize();
    } catch (_) {
      sttReady = false;
    }
    if (!mounted) return;
    setState(() => noMicMode = !sttReady);
  }

  Future<void> _toggleListen() async {
    if (!sttReady) {
      setState(() => noMicMode = true);
      return;
    }
    if (listening) {
      await _stt.stop();
      setState(() => listening = false);
      return;
    }
    setState(() {
      listening = true;
      heard = '';
      pct = null;
      notice = null;
    });
    try {
      await _stt.listen(
        onResult: (r) {
          if (!mounted) return;
          setState(() {
            heard = r.recognizedWords;
            _score();
          });
          if (r.finalResult) setState(() => listening = false);
        },
        listenOptions: SpeechListenOptions(
          localeId: 'uz-UZ',
          listenFor: const Duration(seconds: 15),
        ),
      );
    } catch (_) {
      if (!mounted) return;
      setState(() {
        listening = false;
        noMicMode = true;
      });
    }
  }

  void _score() {
    if (heard.trim().isEmpty) return;
    final expectedCanon = canonOldNew(cur.plain);
    final heardCanon = canonOldNew(heard);
    final p = accuracyPct(expectedCanon, heardCanon);
    pct = p;
    final n = orthographyNotice(heard);
    notice = equalOldNew(heard, cur.plain)
        ? '✅ To‘g‘ri! ${n ?? ''}'.trim()
        : (n ?? 'Qayta urinib ko‘ring 🎧');
  }

  Future<void> _next({int? qualityOverride}) async {
    final q = qualityOverride ?? (pct == null ? 3 : qualityFromPct(pct!));
    await widget.store.recordWord(cur.letter, cur.step, cur.hyphen, q);
    if (!mounted) return;
    if (idx + 1 < widget.queue.length) {
      setState(() {
        idx++;
        heard = '';
        pct = null;
        notice = null;
      });
      TtsHelper.speak(cur.hyphen);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('🎉 Eshit-takrorla tugadi!')));
      Navigator.pop(context);
    }
  }

  @override
  void dispose() {
    _stt.stop();
    TtsHelper.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.queue.isEmpty) {
      return Scaffold(
        backgroundColor: AppTheme.bg,
        appBar: AppBar(title: const Text('Eshit-takrorla')),
        body: const Center(child: Text('Navbat bo‘sh 🎉')),
      );
    }
    final emoji = visualFor(cur.plain, cur.letter);
    final en = kEn[cur.plain] ?? '';
    return Scaffold(
      backgroundColor: AppTheme.bg,
      appBar:
          AppBar(title: Text('Eshit-takrorla • ${idx + 1}/${widget.queue.length}')),
      body: ListView(
        padding: const EdgeInsets.all(18),
        children: [
          GlassCard(
            glow: true,
            child: Column(
              children: [
                Text(emoji, style: const TextStyle(fontSize: 84)),
                const SizedBox(height: 8),
                Text('«${cur.hyphen}» ni eshitib takrorlang',
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                        fontSize: 18, fontWeight: FontWeight.w800)),
                if (en.isNotEmpty)
                  Text(en,
                      style: TextStyle(
                          color: Colors.white.withValues(alpha: 0.45),
                          fontStyle: FontStyle.italic)),
                const SizedBox(height: 10),
                OutlinedButton.icon(
                  onPressed: () => TtsHelper.speak(cur.hyphen),
                  icon: const Text('🔊'),
                  label: const Text('Namunani eshitish'),
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),
          if (!noMicMode) ...[
            Center(
              child: GestureDetector(
                onTap: _toggleListen,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 250),
                  width: 96,
                  height: 96,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: listening
                        ? Colors.red.withValues(alpha: 0.85)
                        : AppTheme.gold,
                    boxShadow: [
                      BoxShadow(
                          color: (listening ? Colors.red : AppTheme.gold)
                              .withValues(alpha: 0.5),
                          blurRadius: 30),
                    ],
                  ),
                  child: Center(
                      child: Text(listening ? '⏹' : '🎤',
                          style: const TextStyle(fontSize: 40))),
                ),
              ),
            ),
            const SizedBox(height: 8),
            Center(
                child: Text(
                    listening ? 'Tinglanmoqda... gapiring!' : 'Mikrofonni bosing',
                    style: TextStyle(
                        color: Colors.white.withValues(alpha: 0.6)))),
            if (heard.isNotEmpty) ...[
              const SizedBox(height: 12),
              GlassCard(
                  child: Column(children: [
                Text('Siz aytdingiz: «$heard»',
                    style: const TextStyle(
                        fontSize: 16, fontWeight: FontWeight.w700)),
                if (pct != null) ...[
                  const SizedBox(height: 8),
                  Text('Aniqlik: $pct%',
                      style: TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.w900,
                          color: pct! >= 80
                              ? AppTheme.neon
                              : pct! >= 60
                                  ? AppTheme.gold
                                  : Colors.redAccent)),
                  if (notice != null)
                    Text(notice!,
                        style: TextStyle(
                            color: Colors.white.withValues(alpha: 0.65))),
                ],
              ])),
              const SizedBox(height: 10),
              ElevatedButton(
                  onPressed: _next, child: const Text('Keyingi so‘z →')),
            ],
            TextButton(
              onPressed: () => setState(() => noMicMode = true),
              child: Text('Mikrofon ishlamasa — o‘z-o‘zini baholash',
                  style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.55))),
            ),
          ] else ...[
            GlassCard(
              child: Column(
                children: [
                  const Text('🎧 Namunani eshitib, ovoz chiqarib takrorlang.',
                      textAlign: TextAlign.center),
                  const SizedBox(height: 12),
                  Row(children: [
                    Expanded(
                        child: OutlinedButton(
                            onPressed: () => _next(qualityOverride: 2),
                            child: const Text('😅 Qiyin'))),
                    const SizedBox(width: 10),
                    Expanded(
                        child: ElevatedButton(
                            onPressed: () => _next(qualityOverride: 5),
                            child: const Text('✅ Aniqlik zo‘r'))),
                  ]),
                ],
              ),
            ),
            TextButton(
              onPressed: () =>
                  setState(() => noMicMode = !sttReady ? false : true),
              child: const Text('Mikrofonni qayta urinish'),
            ),
          ],
        ],
      ),
    );
  }
}
