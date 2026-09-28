import 'dart:math';

/// SM-2 (SuperMemo) takrorlash + Levenshtein baholash + aqlli navbat.
class SrsState {
  double ef;
  int interval;
  int reps;
  int next; // epoch millis — keyingi takrorlash vaqti
  int seen;
  int correct;
  SrsState(
      {this.ef = 2.5,
      this.interval = 0,
      this.reps = 0,
      this.next = 0,
      this.seen = 0,
      this.correct = 0});

  Map<String, Object> toJson() => {
        'ef': ef,
        'interval': interval,
        'reps': reps,
        'next': next,
        'seen': seen,
        'correct': correct,
      };

  factory SrsState.fromJson(Map<String, Object?> j) => SrsState(
        ef: (j['ef'] as num?)?.toDouble() ?? 2.5,
        interval: (j['interval'] as num?)?.toInt() ?? 0,
        reps: (j['reps'] as num?)?.toInt() ?? 0,
        next: (j['next'] as num?)?.toInt() ?? 0,
        seen: (j['seen'] as num?)?.toInt() ?? 0,
        correct: (j['correct'] as num?)?.toInt() ?? 0,
      );
}

/// SM-2 yangilash: quality 0..5 (5 = mukammal, <3 = unutgan).
SrsState sm2Update(SrsState s, int quality, int nowMs) {
  final q = quality.clamp(0, 5);
  var ef = s.ef + (0.1 - (5 - q) * (0.048 + (5 - q) * 0.002));
  ef = ef < 1.3 ? 1.3 : ef;
  int reps = s.reps;
  int interval = s.interval;
  if (q < 3) {
    reps = 0;
    interval = 1;
  } else {
    reps += 1;
    if (reps == 1) {
      interval = 1;
    } else if (reps == 2) {
      interval = 6;
    } else {
      interval = max(1, (interval * ef).round());
    }
  }
  final next = nowMs + interval * 24 * 3600 * 1000;
  return SrsState(
      ef: ef,
      interval: interval,
      reps: reps,
      next: next,
      seen: s.seen + 1,
      correct: s.correct + (q >= 4 ? 1 : 0));
}

/// Levenshtein masofasi (kichik matnlar uchun DP).
int levenshtein(String a, String b) {
  if (a == b) return 0;
  if (a.isEmpty) return b.length;
  if (b.isEmpty) return a.length;
  final m = a.length, n = b.length;
  var prev = List<int>.generate(n + 1, (j) => j);
  var cur = List<int>.filled(n + 1, 0);
  for (var i = 1; i <= m; i++) {
    cur[0] = i;
    for (var j = 1; j <= n; j++) {
      final cost = a.codeUnitAt(i - 1) == b.codeUnitAt(j - 1) ? 0 : 1;
      cur[j] = min(min(prev[j] + 1, cur[j - 1] + 1), prev[j - 1] + cost);
    }
    final tmp = prev;
    prev = cur;
    cur = tmp;
  }
  return prev[n];
}

/// 0..100 aniqlik foizi.
int accuracyPct(String expected, String heard) {
  final e = expected.toLowerCase().trim();
  final h = heard.toLowerCase().trim();
  if (e.isEmpty || h.isEmpty) return 0;
  final d = levenshtein(e, h);
  final mx = max(e.length, h.length);
  return ((1 - d / mx) * 100).round().clamp(0, 100);
}

/// Foizdan SM-2 quality ga: >=95→5, >=80→4, >=60→3, >=40→2, >0→1, 0→0.
int qualityFromPct(int pct) {
  if (pct >= 95) return 5;
  if (pct >= 80) return 4;
  if (pct >= 60) return 3;
  if (pct >= 40) return 2;
  if (pct > 0) return 1;
  return 0;
}

class QueueItem {
  final String letter;
  final String step;
  final String hyphen;
  final String plain;
  const QueueItem(this.letter, this.step, this.hyphen, this.plain);
  String get key => '$letter/$step/$plain';
}
