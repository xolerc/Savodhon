import 'package:flutter/material.dart';

import '../core/store.dart';
import '../core/theme.dart';
import '../core/tts.dart';
import '../data/artic.dart';
import '../data/visual.dart';
import '../data/words.dart';

/// Artikulatsiya: 28 harf yo'riqnomasi.
class ArticulationScreen extends StatefulWidget {
  final AppStore store;
  const ArticulationScreen({super.key, required this.store});

  @override
  State<ArticulationScreen> createState() => _ArticulationScreenState();
}

class _ArticulationScreenState extends State<ArticulationScreen> {
  String selected = 'A';

  @override
  Widget build(BuildContext context) {
    final a = kArtic[selected]!;
    return Scaffold(
      backgroundColor: AppTheme.bg,
      appBar: AppBar(title: const Text('Artikulatsiya 👄')),
      body: Column(
        children: [
          SizedBox(
            height: 76,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              itemCount: kLetters.length,
              itemBuilder: (c, i) {
                final l = kLetters[i];
                final sel = l == selected;
                return GestureDetector(
                  onTap: () => setState(() => selected = l),
                  child: Container(
                    width: 56,
                    margin: const EdgeInsets.only(right: 8),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(14),
                      color: sel
                          ? AppTheme.gold
                          : Colors.white.withOpacity(0.06),
                      border: Border.all(
                          color: sel
                              ? AppTheme.gold
                              : Colors.white.withOpacity(0.12)),
                    ),
                    child: Center(
                        child: Text(l,
                            style: TextStyle(
                                fontSize: 22,
                                fontWeight: FontWeight.w900,
                                color: sel
                                    ? const Color(0xFF1A1405)
                                    : Colors.white))),
                  ),
                );
              },
            ),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(18),
              children: [
                GlassCard(
                  glow: true,
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Text(selected,
                              style: const TextStyle(
                                  fontSize: 56,
                                  fontWeight: FontWeight.w900,
                                  color: AppTheme.gold)),
                          const SizedBox(width: 14),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(a.sound,
                                    style: const TextStyle(
                                        fontWeight: FontWeight.w800,
                                        fontSize: 15)),
                                const SizedBox(height: 6),
                                Text(
                                    '${visualFor(a.example, selected)}  Misol: ${a.example}',
                                    style: TextStyle(
                                        color: Colors.white
                                            .withOpacity(0.6))),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      OutlinedButton.icon(
                        onPressed: () =>
                            TtsHelper.speak('$selected. ${a.example}'),
                        icon: const Text('🔊'),
                        label: const Text('Tovushni eshitish'),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                const GlassCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('👄 Lab / til / havo',
                          style: TextStyle(
                              fontWeight: FontWeight.w800, fontSize: 16)),
                      SizedBox(height: 4),
                    ],
                  ),
                ),
                GlassCard(
                  child: Text(a.guide,
                      style: const TextStyle(height: 1.7, fontSize: 15)),
                ),
                const SizedBox(height: 12),
                ElevatedButton.icon(
                  onPressed: () => TtsHelper.speak(a.guide),
                  icon: const Text('🔊'),
                  label: const Text('Yo‘riqnomani eshitish'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
