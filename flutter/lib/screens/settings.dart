import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../core/store.dart';
import '../core/theme.dart';

/// Sozlamalar: mavzu, kunlik maqsad, export/import, ism, reset.
class SettingsScreen extends StatefulWidget {
  final AppStore store;
  const SettingsScreen({super.key, required this.store});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  final _importCtl = TextEditingController();

  @override
  void dispose() {
    _importCtl.dispose();
    super.dispose();
  }

  void _export() {
    final data = widget.store.exportJson();
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        backgroundColor: AppTheme.card,
        title: const Text('Export JSON',
            style: TextStyle(color: Colors.white)),
        content: SizedBox(
          width: 400,
          child: SelectableText(data,
              style:
                  const TextStyle(color: Colors.white70, fontSize: 11)),
        ),
        actions: [
          TextButton(
            onPressed: () {
              Clipboard.setData(ClipboardData(text: data));
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                  content: Text('📋 Nusxalandi!')));
            },
            child: const Text('Nusxalash'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Yopish'),
          ),
        ],
      ),
    );
  }

  Future<void> _import() async {
    final ok = await widget.store.importJson(_importCtl.text.trim());
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(ok ? '✅ Import qilindi!' : '❌ JSON noto‘g‘ri!')));
    if (ok) _importCtl.clear();
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.store;
    return ListView(
      padding: const EdgeInsets.all(18),
      children: [
        const Text('Sozlamalar ⚙️',
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900)),
        const SizedBox(height: 12),
        GlassCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('🎨 Mavzu',
                  style: TextStyle(fontWeight: FontWeight.w800)),
              RadioListTile<int>(
                value: 0,
                groupValue: s.themeMode,
                activeColor: AppTheme.gold,
                title: const Text('Midnight Premium (tungi)',
                    style: TextStyle(color: Colors.white)),
                onChanged: (v) => s.setThemeMode(v ?? 0),
              ),
              RadioListTile<int>(
                value: 1,
                groupValue: s.themeMode,
                activeColor: AppTheme.gold,
                title: const Text('Yorug‘ (kunduzgi)',
                    style: TextStyle(color: Colors.white)),
                onChanged: (v) => s.setThemeMode(v ?? 0),
              ),
            ],
          ),
        ),
        const SizedBox(height: 10),
        GlassCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('🎯 Kunlik maqsad: ${s.dailyGoal} so‘z',
                  style: const TextStyle(fontWeight: FontWeight.w800)),
              Slider(
                value: s.dailyGoal.toDouble(),
                min: 5,
                max: 50,
                divisions: 9,
                activeColor: AppTheme.gold,
                label: '${s.dailyGoal}',
                onChanged: (v) => s.setGoal(v.round()),
              ),
            ],
          ),
        ),
        const SizedBox(height: 10),
        GlassCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('👤 Ism',
                  style: TextStyle(fontWeight: FontWeight.w800)),
              const SizedBox(height: 8),
              Row(children: [
                Expanded(
                    child: Text(s.name.isEmpty ? '—' : s.name,
                        style: const TextStyle(fontSize: 16))),
                OutlinedButton(
                  onPressed: () {
                    final c = TextEditingController(text: s.name);
                    showDialog(
                      context: context,
                      builder: (_) => AlertDialog(
                        backgroundColor: AppTheme.card,
                        title: const Text('Ismni o‘zgartirish',
                            style: TextStyle(color: Colors.white)),
                        content: TextField(
                          controller: c,
                          style:
                              const TextStyle(color: Colors.white),
                          decoration: const InputDecoration(
                              hintText: 'Ismingiz'),
                        ),
                        actions: [
                          TextButton(
                              onPressed: () => Navigator.pop(context),
                              child: const Text('Bekor')),
                          ElevatedButton(
                              onPressed: () async {
                                await s.setName(c.text);
                                if (context.mounted) {
                                  Navigator.pop(context);
                                }
                              },
                              child: const Text('Saqlash')),
                        ],
                      ),
                    );
                  },
                  child: const Text('O‘zgartirish'),
                ),
              ]),
            ],
          ),
        ),
        const SizedBox(height: 10),
        GlassCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('💾 Zaxira (export/import)',
                  style: TextStyle(fontWeight: FontWeight.w800)),
              const SizedBox(height: 8),
              Row(children: [
                Expanded(
                    child: OutlinedButton(
                        onPressed: _export,
                        child: const Text('📤 Export'))),
                const SizedBox(width: 10),
                Expanded(
                    child: OutlinedButton(
                        onPressed: () {
                          Clipboard.getData('text/plain').then((d) {
                            if (d?.text != null && mounted) {
                              setState(() =>
                                  _importCtl.text = d!.text!.trim());
                            }
                          });
                        },
                        child: const Text('📋 Qo‘yish'))),
              ]),
              const SizedBox(height: 8),
              TextField(
                controller: _importCtl,
                maxLines: 3,
                style: const TextStyle(
                    color: Colors.white70, fontSize: 12),
                decoration: InputDecoration(
                  hintText: 'JSON ni bu yerga joylashtiring...',
                  filled: true,
                  fillColor: Colors.white.withOpacity(0.06),
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide.none),
                ),
              ),
              const SizedBox(height: 8),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                    onPressed: _import,
                    child: const Text('📥 Import qilish')),
              ),
            ],
          ),
        ),
        const SizedBox(height: 10),
        OutlinedButton(
          style: OutlinedButton.styleFrom(
              foregroundColor: Colors.redAccent,
              side: const BorderSide(color: Colors.redAccent)),
          onPressed: () {
            showDialog(
              context: context,
              builder: (_) => AlertDialog(
                backgroundColor: AppTheme.card,
                title: const Text('Barchasini o‘chirish?',
                    style: TextStyle(color: Colors.white)),
                content: const Text(
                    'XP, streak, progress — hammasi o‘chadi!',
                    style: TextStyle(color: Colors.white70)),
                actions: [
                  TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Bekor')),
                  TextButton(
                      onPressed: () async {
                        await s.resetAll();
                        if (context.mounted) Navigator.pop(context);
                      },
                      child: const Text('Ha, o‘chirish',
                          style:
                              TextStyle(color: Colors.redAccent))),
                ],
              ),
            );
          },
          child: const Text('🗑 Barchasini tiklash'),
        ),
        const SizedBox(height: 10),
        Center(
          child: Text('Savodhon 1.0.0 • XOLERIC',
              style:
                  TextStyle(color: Colors.white.withOpacity(0.4), fontSize: 12)),
        ),
      ],
    );
  }
}
