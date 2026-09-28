import 'package:flutter/material.dart';

import '../core/store.dart';
import '../core/theme.dart';
import 'alphabet.dart';
import 'articulation.dart';
import 'focus.dart';
import 'listen.dart';
import 'review.dart';
import 'stats.dart';

/// Dashboard: XP balans-karta, streak, kunlik maqsad, tezkor kirishlar.
class DashboardScreen extends StatelessWidget {
  final AppStore store;
  const DashboardScreen({super.key, required this.store});

  @override
  Widget build(BuildContext context) {
    final goal = store.dailyGoal;
    final done = store.todayWords;
    final pct = goal == 0 ? 0.0 : (done / goal).clamp(0.0, 1.0);
    return ListView(
      padding: const EdgeInsets.all(18),
      children: [
        Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Salom, ${store.name.isEmpty ? 'Do‘stim' : store.name}! 👋',
                      style: const TextStyle(
                          fontSize: 20, fontWeight: FontWeight.w800)),
                  const SizedBox(height: 4),
                  Text('Bugun ham bir qadam oldinga.',
                      style: TextStyle(
                          color: Colors.white.withOpacity(0.55), fontSize: 13)),
                ],
              ),
            ),
            Container(
              padding:
                  const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.orange.withOpacity(0.14),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: Colors.orange.withOpacity(0.4)),
              ),
              child: Text('🔥 ${store.streak} kun',
                  style: const TextStyle(
                      fontWeight: FontWeight.w800, fontSize: 14)),
            ),
          ],
        ),
        const SizedBox(height: 16),
        // XP balans-karta
        GlassCard(
          glow: true,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('XP BALANS',
                      style: TextStyle(
                          letterSpacing: 2,
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: Colors.white.withOpacity(0.55))),
                  const Text('💰', style: TextStyle(fontSize: 22)),
                ],
              ),
              const SizedBox(height: 6),
              Text('${store.xp} XP',
                  style: const TextStyle(
                      fontSize: 40,
                      fontWeight: FontWeight.w900,
                      color: AppTheme.gold)),
              const SizedBox(height: 10),
              ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: LinearProgressIndicator(
                  value: pct,
                  minHeight: 10,
                  backgroundColor: Colors.white.withOpacity(0.08),
                  valueColor: const AlwaysStoppedAnimation(AppTheme.neon),
                ),
              ),
              const SizedBox(height: 8),
              Text('Kunlik maqsad: $done / $goal so‘z (${(pct * 100).round()}%)',
                  style: TextStyle(
                      color: Colors.white.withOpacity(0.7), fontSize: 13)),
            ],
          ),
        ),
        const SizedBox(height: 14),
        Row(
          children: [
            _mini(context, '📚', 'Alifbo', '28 harf', () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (_) => AlphabetScreen(store: store)));
            }),
            const SizedBox(width: 12),
            _mini(context, '🔁', 'Takrorlash', '${store.smartQueue(limit: 99).length} so‘z', () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (_) => ReviewScreen(store: store)));
            }),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            _mini(context, '📊', 'Statistika', 'haftalik', () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (_) => StatsScreen(store: store)));
            }),
            const SizedBox(width: 12),
            _mini(context, '👄', 'Artikulatsiya', '28 yo‘riqnoma', () {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (_) => ArticulationScreen(store: store)));
            }),
          ],
        ),
        const SizedBox(height: 16),
        const Text('Mashq turlari',
            style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800)),
        const SizedBox(height: 10),
        GlassCard(
          onTap: () => Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (_) => FocusScreen(store: store, queue: store.smartQueue(limit: 20)))),
          child: const Row(children: [
            Text('🟢', style: TextStyle(fontSize: 30)),
            SizedBox(width: 12),
            Expanded(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                  Text('Focus trenajer',
                      style:
                          TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
                  Text('Bo‘g‘in chiplari + TTS tinglash',
                      style: TextStyle(color: AppTheme.muted, fontSize: 13)),
                ])),
            Icon(Icons.arrow_forward_ios, size: 16, color: AppTheme.muted),
          ]),
        ),
        const SizedBox(height: 10),
        GlassCard(
          onTap: () => Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (_) => ListenScreen(store: store, queue: store.smartQueue(limit: 20)))),
          child: const Row(children: [
            Text('🎤', style: TextStyle(fontSize: 30)),
            SizedBox(width: 12),
            Expanded(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                  Text('Eshit-takrorla',
                      style:
                          TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
                  Text('Nutqni tanish + Levenshtein baho',
                      style: TextStyle(color: AppTheme.muted, fontSize: 13)),
                ])),
            Icon(Icons.arrow_forward_ios, size: 16, color: AppTheme.muted),
          ]),
        ),
      ],
    );
  }

  Widget _mini(BuildContext context, String emoji, String title, String sub,
      VoidCallback go) {
    return Expanded(
      child: GlassCard(
        onTap: go,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(emoji, style: const TextStyle(fontSize: 26)),
            const SizedBox(height: 8),
            Text(title,
                style:
                    const TextStyle(fontWeight: FontWeight.w800, fontSize: 15)),
            Text(sub,
                style:
                    const TextStyle(color: AppTheme.muted, fontSize: 12)),
          ],
        ),
      ),
    );
  }
}
