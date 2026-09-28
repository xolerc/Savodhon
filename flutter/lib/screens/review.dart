import 'package:flutter/material.dart';

import '../core/store.dart';
import '../core/theme.dart';
import '../data/en.dart';
import '../data/visual.dart';
import 'focus.dart';
import 'listen.dart';

/// SM-2 takrorlash + aqlli navbat ekrani.
class ReviewScreen extends StatelessWidget {
  final AppStore store;
  const ReviewScreen({super.key, required this.store});

  @override
  Widget build(BuildContext context) {
    final q = store.smartQueue(limit: 20);
    return Scaffold(
      backgroundColor: AppTheme.bg,
      appBar: AppBar(title: const Text('Takrorlash 🔁 SM-2')),
      body: ListView(
        padding: const EdgeInsets.all(18),
        children: [
          GlassCard(
            child: Text(
                'Aqlli navbat: muddati o‘tgan → kuchsiz → yangi.\nHozir: ${q.length} so‘z tayyor.',
                style:
                    TextStyle(color: Colors.white.withValues(alpha: 0.75), height: 1.6)),
          ),
          const SizedBox(height: 12),
          Row(children: [
            Expanded(
              child: ElevatedButton(
                onPressed: q.isEmpty
                    ? null
                    : () => Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (_) =>
                                FocusScreen(store: store, queue: q))),
                child: const Text('🟢 Focus bilan'),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: OutlinedButton(
                onPressed: q.isEmpty
                    ? null
                    : () => Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (_) =>
                                ListenScreen(store: store, queue: q))),
                child: const Text('🎤 Eshitib'),
              ),
            ),
          ]),
          const SizedBox(height: 14),
          if (q.isEmpty)
            const Center(
                child: Padding(
                    padding: EdgeInsets.all(24),
                    child: Text('Hamma so‘z mustahkam! 🎉'))),
          for (var i = 0; i < q.length; i++)
            Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: GlassCard(
                padding:
                    const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                child: Row(children: [
                  Text(visualFor(q[i].plain, q[i].letter),
                      style: const TextStyle(fontSize: 28)),
                  const SizedBox(width: 12),
                  Expanded(
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                        Text(q[i].hyphen,
                            style: const TextStyle(
                                fontWeight: FontWeight.w800, fontSize: 15)),
                        Text(
                            '${q[i].letter} • ${q[i].step} • ${kEn[q[i].plain] ?? ''}',
                            style: const TextStyle(
                                color: AppTheme.muted, fontSize: 12)),
                      ])),
                  const Icon(Icons.chevron_right,
                      color: AppTheme.muted, size: 18),
                ]),
              ),
            ),
        ],
      ),
    );
  }
}
