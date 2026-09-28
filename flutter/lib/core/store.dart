import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../data/words.dart';
import 'srs.dart';

/// Real persist saqlash: xp, streak, progress, history, sozlamalar, SM-2.
class AppStore extends ChangeNotifier {
  static const _kName = 'savodhon.name';
  static const _kXp = 'savodhon.xp';
  static const _kStreak = 'savodhon.streak';
  static const _kLastDay = 'savodhon.lastDay';
  static const _kGoal = 'savodhon.goal';
  static const _kTheme = 'savodhon.theme'; // 0 midnight, 1 light
  static const _kSrs = 'savodhon.srs';
  static const _kHist = 'savodhon.history';
  static const _kStars = 'savodhon.stars';

  String name = '';
  int xp = 0;
  int streak = 0;
  String lastDay = '';
  int dailyGoal = 10;
  int themeMode = 0; // 0 midnight dark, 1 light
  Map<String, SrsState> srs = {};
  Map<String, int> dayXp = {}; // yyyy-MM-dd -> xp
  Map<String, int> dayWords = {}; // yyyy-MM-dd -> so'z soni
  Map<String, int> stars = {}; // wordKey -> 0..3 yulduz

  bool loaded = false;

  static String todayKey() {
    final n = DateTime.now();
    return '${n.year.toString().padLeft(4, '0')}-${n.month.toString().padLeft(2, '0')}-${n.day.toString().padLeft(2, '0')}';
  }

  Future<void> load() async {
    final p = await SharedPreferences.getInstance();
    name = p.getString(_kName) ?? '';
    xp = p.getInt(_kXp) ?? 0;
    streak = p.getInt(_kStreak) ?? 0;
    lastDay = p.getString(_kLastDay) ?? '';
    dailyGoal = p.getInt(_kGoal) ?? 10;
    themeMode = p.getInt(_kTheme) ?? 0;
    try {
      final raw = p.getString(_kSrs);
      if (raw != null && raw.isNotEmpty) {
        final m = jsonDecode(raw) as Map<String, dynamic>;
        srs = m.map((k, v) =>
            MapEntry(k, SrsState.fromJson((v as Map).cast<String, Object?>())));
      }
    } catch (_) {}
    try {
      final raw = p.getString(_kHist);
      if (raw != null && raw.isNotEmpty) {
        final m = jsonDecode(raw) as Map<String, dynamic>;
        final dx = (m['xp'] as Map?)?.cast<String, dynamic>() ?? {};
        final dw = (m['words'] as Map?)?.cast<String, dynamic>() ?? {};
        dayXp = dx.map((k, v) => MapEntry(k, (v as num).toInt()));
        dayWords = dw.map((k, v) => MapEntry(k, (v as num).toInt()));
      }
    } catch (_) {}
    try {
      final raw = p.getString(_kStars);
      if (raw != null && raw.isNotEmpty) {
        final m = jsonDecode(raw) as Map<String, dynamic>;
        stars = m.map((k, v) => MapEntry(k, (v as num).toInt()));
      }
    } catch (_) {}
    _rollStreak();
    loaded = true;
    notifyListeners();
  }

  Future<void> _save() async {
    final p = await SharedPreferences.getInstance();
    await p.setString(_kName, name);
    await p.setInt(_kXp, xp);
    await p.setInt(_kStreak, streak);
    await p.setString(_kLastDay, lastDay);
    await p.setInt(_kGoal, dailyGoal);
    await p.setInt(_kTheme, themeMode);
    await p.setString(
        _kSrs, jsonEncode(srs.map((k, v) => MapEntry(k, v.toJson()))));
    await p.setString(
        _kHist, jsonEncode({'xp': dayXp, 'words': dayWords}));
    await p.setString(_kStars,
        jsonEncode(stars.map((k, v) => MapEntry(k, v))));
  }

  void _rollStreak() {
    final today = todayKey();
    if (lastDay.isEmpty) return;
    if (lastDay == today) return;
    final last = DateTime.tryParse(lastDay);
    if (last == null) {
      streak = 0;
      return;
    }
    final now = DateTime.now();
    final a = DateTime(last.year, last.month, last.day);
    final b = DateTime(now.year, now.month, now.day);
    final diff = b.difference(a).inDays;
    if (diff > 1) streak = 0; // streak uzildi
  }

  void _touchDay(int gainedXp, int words) {
    final today = todayKey();
    if (lastDay != today) {
      final last = DateTime.tryParse(lastDay.isEmpty ? today : lastDay);
      final now = DateTime.now();
      if (last != null) {
        final diff = DateTime(now.year, now.month, now.day)
            .difference(DateTime(last.year, last.month, last.day))
            .inDays;
        if (diff == 1) {
          streak += 1;
        } else if (diff > 1) {
          streak = 1;
        } else if (lastDay.isEmpty) {
          streak = 1;
        }
      } else {
        streak = 1;
      }
      lastDay = today;
    }
    dayXp[today] = (dayXp[today] ?? 0) + gainedXp;
    dayWords[today] = (dayWords[today] ?? 0) + words;
  }

  Future<void> setName(String v) async {
    name = v.trim();
    await _save();
    notifyListeners();
  }

  Future<void> setGoal(int v) async {
    dailyGoal = v.clamp(5, 50);
    await _save();
    notifyListeners();
  }

  Future<void> setThemeMode(int v) async {
    themeMode = v;
    await _save();
    notifyListeners();
  }

  /// So'z mashq qilindi: XP + streak + SM-2 + yulduz.
  Future<void> recordWord(
      String letter, String step, String hyphen, int quality) async {
    final plain = plainOf(hyphen);
    final key = '$letter/$step/$plain';
    final now = DateTime.now().millisecondsSinceEpoch;
    final prev = srs[key] ?? SrsState();
    srs[key] = sm2Update(prev, quality, now);
    final gain = quality >= 4 ? 10 : (quality == 3 ? 6 : 2);
    xp += gain;
    _touchDay(gain, 1);
    final cur = stars[key] ?? 0;
    if (quality >= 4 && cur < 3) stars[key] = cur + 1;
    if (quality >= 3 && cur < 1) stars[key] = 1;
    await _save();
    notifyListeners();
  }

  int starsFor(String letter, String step, String hyphen) {
    return stars['$letter/$step/${plainOf(hyphen)}'] ?? 0;
  }

  double letterProgress(String letter) {
    final steps = kWordsDB[letter];
    if (steps == null) return 0;
    var done = 0, total = 0;
    for (final e in steps.entries) {
      for (final w in e.value) {
        total++;
        if ((stars['$letter/${e.key}/${plainOf(w)}'] ?? 0) > 0) done++;
      }
    }
    return total == 0 ? 0 : done / total;
  }

  int get todayWords => dayWords[todayKey()] ?? 0;
  int get todayXp => dayXp[todayKey()] ?? 0;

  /// Aqlli navbat: muddati o'tgan SM-2 → kuchsiz → yangi. Limitgacha.
  List<QueueItem> smartQueue({int limit = 20}) {
    final now = DateTime.now().millisecondsSinceEpoch;
    final overdue = <QueueItem>[];
    final weak = <QueueItem>[];
    final fresh = <QueueItem>[];
    for (final letter in kLetters) {
      final steps = kWordsDB[letter]!;
      for (final step in kSteps) {
        for (final h in steps[step]!) {
          final plain = plainOf(h);
          final key = '$letter/$step/$plain';
          final st = srs[key];
          final item = QueueItem(letter, step, h, plain);
          if (st == null) {
            fresh.add(item);
          } else if (st.next <= now) {
            overdue.add(item);
          } else if ((st.correct / (st.seen == 0 ? 1 : st.seen)) < 0.7 ||
              (stars[key] ?? 0) < 2) {
            weak.add(item);
          }
        }
      }
    }
    int cmpSrs(QueueItem a, QueueItem b) {
      final sa = srs[a.key]!;
      final sb = srs[b.key]!;
      final ra = sa.seen == 0 ? 1.0 : sa.correct / sa.seen;
      final rb = sb.seen == 0 ? 1.0 : sb.correct / sb.seen;
      final c = ra.compareTo(rb);
      if (c != 0) return c;
      return sa.next.compareTo(sb.next);
    }

    overdue.sort(cmpSrs);
    weak.sort(cmpSrs);
    final out = <QueueItem>[];
    for (final l in [overdue, weak, fresh]) {
      for (final it in l) {
        if (out.length >= limit) break;
        out.add(it);
      }
      if (out.length >= limit) break;
    }
    return out;
  }

  /// Export: barcha ma'lumot JSON.
  String exportJson() => jsonEncode({
        'name': name,
        'xp': xp,
        'streak': streak,
        'lastDay': lastDay,
        'goal': dailyGoal,
        'theme': themeMode,
        'srs': srs.map((k, v) => MapEntry(k, v.toJson())),
        'dayXp': dayXp,
        'dayWords': dayWords,
        'stars': stars,
      });

  /// Import: JSON dan tiklash. true = ok.
  Future<bool> importJson(String raw) async {
    try {
      final m = jsonDecode(raw) as Map<String, dynamic>;
      name = (m['name'] as String?) ?? name;
      xp = (m['xp'] as num?)?.toInt() ?? xp;
      streak = (m['streak'] as num?)?.toInt() ?? streak;
      lastDay = (m['lastDay'] as String?) ?? lastDay;
      dailyGoal = (m['goal'] as num?)?.toInt() ?? dailyGoal;
      themeMode = (m['theme'] as num?)?.toInt() ?? themeMode;
      final s = (m['srs'] as Map?)?.cast<String, dynamic>() ?? {};
      srs = s.map((k, v) =>
          MapEntry(k, SrsState.fromJson((v as Map).cast<String, Object?>())));
      dayXp = ((m['dayXp'] as Map?)?.cast<String, dynamic>() ?? {})
          .map((k, v) => MapEntry(k, (v as num).toInt()));
      dayWords = ((m['dayWords'] as Map?)?.cast<String, dynamic>() ?? {})
          .map((k, v) => MapEntry(k, (v as num).toInt()));
      stars = ((m['stars'] as Map?)?.cast<String, dynamic>() ?? {})
          .map((k, v) => MapEntry(k, (v as num).toInt()));
      await _save();
      notifyListeners();
      return true;
    } catch (_) {
      return false;
    }
  }

  Future<void> resetAll() async {
    final p = await SharedPreferences.getInstance();
    await p.clear();
    name = '';
    xp = 0;
    streak = 0;
    lastDay = '';
    srs = {};
    dayXp = {};
    dayWords = {};
    stars = {};
    dailyGoal = 10;
    themeMode = 0;
    notifyListeners();
  }
}
