import 'package:flutter/material.dart';

import '../core/store.dart';
import '../core/theme.dart';
import '../data/words.dart';

class _Ach {
  final String emoji;
  final String title;
  final String desc;
  final bool done;
  const _Ach(this.emoji, this.title, this.desc, this.done);
}

/// Yutuqlar ekrani.
class AchievementsScreen extends StatelessWidget {
  final AppStore store;
  const AchievementsScreen({super.key, required this.store});

  List<_Ach> _build() {
    var lettersDone = 0;
    for (final l in kLetters) {
      if (store.letterProgress(l) >= 1.0) lettersDone++;
    }
    final wordsLearned = store.stars.length;
    return [
      _Ach('👋', 'Xush kelibsiz', 'Ismingizni kiritdingiz',
          store.name.isNotEmpty),
      _Ach('📖', 'Ilk so‘z', '1 ta so‘z mashq qilindi', wordsLearned >= 1),
      _Ach('📚', '10 so‘z', '10 ta so‘z o‘rganildi', wordsLearned >= 10),
      _Ach('📘', '100 so‘z', '100 ta so‘z o‘rganildi', wordsLearned >= 100),
      _Ach('⭐', '500 XP', '500 XP yig‘ildi', store.xp >= 500),
      _Ach('💰', '1000 XP', '1000 XP yig‘ildi', store.xp >= 1000),
      _Ach('🔥', '3 kun streak', '3 kun ketma-ket', store.streak >= 3),
      _Ach('🔥', '7 kun streak', '7 kun ketma-ket', store.streak >= 7),
      _Ach('🏆', '30 kun streak', '30 kun ketma-ket', store.streak >= 30),
      _Ach('🔤', 'Ilk harf', '1 harf 100% tugatildi', lettersDone >= 1),
      _Ach('🎓', '5 harf ustasi', '5 harf 100% tugatildi', lettersDone >= 5),
      _Ach('👑', 'Savodxon', 'Barcha 28 harf 100%', lettersDone >= 28),
    ];
  }

  @override
  Widget build(BuildContext context) {
    final list = _build();
    final done = list.where((e) => e.done).length;
    return ListView(
      padding: const EdgeInsets.all(18),
      children: [
        const Text('Yutuqlar 🏆',
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900)),
        const SizedBox(height: 12),
        GlassCard(
          glow: true,
          child: Row(children: [
            const Text('🏆', style: TextStyle(fontSize: 40)),
            const SizedBox(width: 12),
            Expanded(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                  Text('$done / ${list.length} yutuq',
                      style: const TextStyle(
                          fontWeight: FontWeight.w900, fontSize: 20)),
                  Text('Davom eting — har kun +XP!',
                      style: TextStyle(
                          color: Colors.white.withOpacity(0.6))),
                ])),
          ]),
        ),
        const SizedBox(height: 12),
        for (final a in list)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: GlassCard(
              padding:
                  const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              child: Row(children: [
                Opacity(
                    opacity: a.done ? 1.0 : 0.35,
                    child: Text(a.emoji,
                        style: const TextStyle(fontSize: 30))),
                const SizedBox(width: 12),
                Expanded(
                    child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                      Text(a.title,
                          style: const TextStyle(
                              fontWeight: FontWeight.w800, fontSize: 15)),
                      Text(a.desc,
                          style: const TextStyle(
                              color: AppTheme.muted, fontSize: 12)),
                    ])),
                Icon(
                    a.done ? Icons.verified : Icons.lock_outline,
                    color: a.done ? AppTheme.gold : AppTheme.muted),
              ]),
            ),
          ),
      ],
    );
  }
}
