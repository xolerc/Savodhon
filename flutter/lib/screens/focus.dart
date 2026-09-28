import 'package:flutter/material.dart';

import '../core/old_new.dart';
import '../core/srs.dart';
import '../core/store.dart';
import '../core/theme.dart';
import '../core/tts.dart';
import '../data/en.dart';
import '../data/visual.dart';
import '../data/words.dart';

/// Focus trenajer: bo'g'in chiplari, vizual emoji, kulrang EN, TTS tinglash.
class FocusScreen extends StatefulWidget {
  final AppStore store;
  final List<QueueItem> queue;
  final String title;
  const FocusScreen(
      {super.key, required this.store, required this.queue, this.title = 'Focus trenajer'});

  @override
  State<FocusScreen> createState() => _FocusScreenState();
}

class _FocusScreenState extends State<FocusScreen> {
  int idx = 0;
  int activeChip = -1;
  bool showAnswer = false;

  QueueItem get cur => widget.queue[idx];

  String stepName(String s) {
    final i = kSteps.indexOf(s);
    return i < 0 ? s : kStepNames[i];
  }

  Future<void> _speak() async {
    final parts = cur.hyphen.split('-');
    setState(() => activeChip = 0);
    for (var i = 0; i < parts.length; i++) {
      if (!mounted) return;
      setState(() => activeChip = i);
      await TtsHelper.speak(parts[i]);
      await Future<void>.delayed(const Duration(milliseconds: 650));
    }
    if (!mounted) return;
    setState(() => activeChip = -1);
    await TtsHelper.speak(cur.hyphen);
  }

  Future<void> _grade(bool known) async {
    await widget.store.recordWord(cur.letter, cur.step, cur.hyphen, known ? 5 : 2);
    if (!mounted) return;
    if (idx + 1 < widget.queue.length) {
      setState(() {
        idx++;
        showAnswer = false;
        activeChip = -1;
      });
    } else {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('🎉 Mashq tugadi! +XP yozildi.')),
      );
      Navigator.pop(context);
    }
  }

  @override
  void dispose() {
    TtsHelper.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.queue.isEmpty) {
      return Scaffold(
        backgroundColor: AppTheme.bg,
        appBar: AppBar(title: Text(widget.title)),
        body: const Center(child: Text('Navbat bo‘sh — hamma so‘z mustahkam! 🎉')),
      );
    }
    final en = kEn[cur.plain] ?? '';
    final emoji = visualFor(cur.plain, cur.letter);
    final notice = orthographyNotice(cur.hyphen);
    return Scaffold(
      backgroundColor: AppTheme.bg,
      appBar: AppBar(
          title: Text('${widget.title} • ${idx + 1}/${widget.queue.length}')),
      body: ListView(
        padding: const EdgeInsets.all(18),
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: LinearProgressIndicator(
              value: (idx + 1) / widget.queue.length,
              minHeight: 8,
              backgroundColor: Colors.white.withOpacity(0.08),
              valueColor: const AlwaysStoppedAnimation(AppTheme.gold),
            ),
          ),
          const SizedBox(height: 16),
          GlassCard(
            glow: true,
            child: Column(
              children: [
                Text('${cur.letter} • ${stepName(cur.step)}',
                    style: TextStyle(
                        color: Colors.white.withOpacity(0.6),
                        fontWeight: FontWeight.w700)),
                const SizedBox(height: 8),
                Text(emoji, style: const TextStyle(fontSize: 84)),
                const SizedBox(height: 12),
                SyllableChips(
                    hyphen: cur.hyphen,
                    active: activeChip,
                    activeColor: AppTheme.gold),
                const SizedBox(height: 10),
                if (en.isNotEmpty)
                  Text(en,
                      style: TextStyle(
                          color: Colors.white.withOpacity(0.45),
                          fontSize: 15,
                          fontStyle: FontStyle.italic)),
                if (notice != null) ...[
                  const SizedBox(height: 6),
                  Text('🔄 Eski/yangi imlo bir xil qabul qilinadi',
                      style: TextStyle(
                          color: AppTheme.neon.withOpacity(0.85),
                          fontSize: 12)),
                ],
              ],
            ),
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: _speak,
                  icon: const Text('🔊'),
                  label: const Text('Tinglash'),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () => setState(() => showAnswer = !showAnswer),
                  icon: const Text('👁'),
                  label: Text(showAnswer ? 'Yashirish' : 'Ko‘rsatish'),
                ),
              ),
            ],
          ),
          if (showAnswer) ...[
            const SizedBox(height: 10),
            GlassCard(
              child: Text('To‘liq so‘z: ${cur.hyphen.replaceAll('-', '')}',
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                      fontSize: 22, fontWeight: FontWeight.w900)),
            ),
          ],
          const SizedBox(height: 14),
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () => _grade(false),
                  child: const Text('😅 Qiyin'),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: ElevatedButton(
                  onPressed: () => _grade(true),
                  child: const Text('✅ Bildim'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
