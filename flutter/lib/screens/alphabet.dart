import 'package:flutter/material.dart';

import '../core/store.dart';
import '../core/theme.dart';
import '../data/words.dart';
import 'focus.dart';
import '../core/srs.dart';

/// Alifbo grid: 28 harf + har birida progress.
class AlphabetScreen extends StatelessWidget {
  final AppStore store;
  const AlphabetScreen({super.key, required this.store});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bg,
      appBar: AppBar(title: const Text('Alifbo • 28 harf')),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2, mainAxisSpacing: 12, crossAxisSpacing: 12,
            childAspectRatio: 1.35),
        itemCount: kLetters.length,
        itemBuilder: (c, i) {
          final l = kLetters[i];
          final p = store.letterProgress(l);
          return GlassCard(
            glow: p >= 1.0,
            onTap: () {
              final q = <QueueItem>[];
              for (final s in kSteps) {
                for (final h in kWordsDB[l]![s]!) {
                  q.add(QueueItem(l, s, h, plainOf(h)));
                }
              }
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (_) => FocusScreen(
                          store: store, queue: q, title: '$l harfi')));
            },
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(l,
                        style: const TextStyle(
                            fontSize: 34,
                            fontWeight: FontWeight.w900,
                            color: AppTheme.gold)),
                    Text('${(p * 100).round()}%',
                        style: TextStyle(
                            color: Colors.white.withValues(alpha: 0.6),
                            fontWeight: FontWeight.w700)),
                  ],
                ),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: LinearProgressIndicator(
                    value: p,
                    minHeight: 8,
                    backgroundColor: Colors.white.withValues(alpha: 0.08),
                    valueColor:
                        const AlwaysStoppedAnimation(AppTheme.neon),
                  ),
                ),
                const SizedBox(height: 6),
                Text('36 so‘z • 6 bosqich',
                    style: TextStyle(
                        color: Colors.white.withValues(alpha: 0.5), fontSize: 12)),
              ],
            ),
          );
        },
      ),
    );
  }
}
