import 'package:flutter/material.dart';

import '../core/store.dart';
import '../core/theme.dart';

/// Haftalik statistika (7 kunlik XP/so'z barlari — custom paint, depsiz).
class StatsScreen extends StatelessWidget {
  final AppStore store;
  const StatsScreen({super.key, required this.store});

  List<String> _last7Keys() {
    final now = DateTime.now();
    return [
      for (var i = 6; i >= 0; i--)
        (() {
          final d = now.subtract(Duration(days: i));
          return '${d.year.toString().padLeft(4, '0')}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';
        })()
    ];
  }

  @override
  Widget build(BuildContext context) {
    final keys = _last7Keys();
    final vals = [for (final k in keys) store.dayXp[k] ?? 0];
    final words = [for (final k in keys) store.dayWords[k] ?? 0];
    final maxV = (vals.fold<int>(0, (a, b) => a > b ? a : b)).clamp(1, 1 << 30);
    final totalXp = vals.fold<int>(0, (a, b) => a + b);
    final totalW = words.fold<int>(0, (a, b) => a + b);
    const wd = ['D', 'S', 'Ch', 'P', 'J', 'Sh', 'Y'];
    final nowWd = DateTime.now().weekday; // 1=Mon..7=Sun
    final labels = [
      for (var i = 6; i >= 0; i--)
        wd[(((nowWd - 1 - i) % 7) + 7) % 7]
    ];
    return Scaffold(
      backgroundColor: AppTheme.bg,
      appBar: AppBar(title: const Text('Haftalik statistika 📊')),
      body: ListView(
        padding: const EdgeInsets.all(18),
        children: [
          Row(children: [
            Expanded(
                child: GlassCard(
                    child: Column(children: [
              const Text('Haftalik XP',
                  style: TextStyle(color: AppTheme.muted, fontSize: 12)),
              Text('$totalXp',
                  style: const TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.w900,
                      color: AppTheme.gold)),
            ]))),
            const SizedBox(width: 12),
            Expanded(
                child: GlassCard(
                    child: Column(children: [
              const Text('Haftalik so‘z',
                  style: TextStyle(color: AppTheme.muted, fontSize: 12)),
              Text('$totalW',
                  style: const TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.w900,
                      color: AppTheme.neon)),
            ]))),
          ]),
          const SizedBox(height: 14),
          GlassCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Kunlik XP',
                    style:
                        TextStyle(fontWeight: FontWeight.w800, fontSize: 15)),
                const SizedBox(height: 14),
                SizedBox(
                  height: 170,
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      for (var i = 0; i < 7; i++)
                        Expanded(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              Text('${vals[i]}',
                                  style: TextStyle(
                                      fontSize: 10,
                                      color: Colors.white
                                          .withOpacity(0.6))),
                              const SizedBox(height: 4),
                              Expanded(
                                flex: 100,
                                child: Center(
                                  child: FractionallySizedBox(
                                    heightFactor:
                                        (vals[i] / maxV).clamp(0.04, 1.0),
                                    child: Container(
                                      width: 26,
                                      decoration: BoxDecoration(
                                        borderRadius:
                                            BorderRadius.circular(8),
                                        gradient: LinearGradient(
                                          begin: Alignment.bottomCenter,
                                          end: Alignment.topCenter,
                                          colors: i == 6
                                              ? [
                                                  AppTheme.gold,
                                                  const Color(0xFFFFE29A)
                                                ]
                                              : [
                                                  AppTheme.violet,
                                                  AppTheme.neon
                                                ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(height: 6),
                              Text(labels[i],
                                  style: const TextStyle(
                                      color: AppTheme.muted,
                                      fontSize: 12,
                                      fontWeight: FontWeight.w700)),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          GlassCard(
            child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Kunlik tafsilot',
                      style:
                          TextStyle(fontWeight: FontWeight.w800, fontSize: 15)),
                  const SizedBox(height: 8),
                  for (var i = 6; i >= 0; i--)
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 4),
                      child: Row(
                          mainAxisAlignment:
                              MainAxisAlignment.spaceBetween,
                          children: [
                            Text(keys[6 - (6 - i)].substring(5),
                                style: const TextStyle(
                                    color: AppTheme.muted)),
                            Text('${words[6 - (6 - i)]} so‘z • ${vals[6 - (6 - i)]} XP',
                                style: const TextStyle(
                                    fontWeight: FontWeight.w700)),
                          ]),
                    ),
                ]),
          ),
        ],
      ),
    );
  }
}
