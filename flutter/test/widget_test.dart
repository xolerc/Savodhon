import 'package:flutter_test/flutter_test.dart';
import 'package:savodhon/core/old_new.dart';
import 'package:savodhon/core/srs.dart';
import 'package:savodhon/data/words.dart';
import 'package:savodhon/data/en.dart';

void main() {
  test('DB 28 harf x 6 bosqich x 6 soz = 1008', () {
    expect(kLetters.length, 28);
    var total = 0;
    for (final l in kLetters) {
      for (final s in kSteps) {
        expect(kWordsDB[l]![s]!.length, 6);
        total += 6;
      }
    }
    expect(total, 1008);
  });

  test('EN 1008 tarjima, har soz qoplangan', () {
    expect(kEn.length, 1008);
    for (final l in kLetters) {
      for (final s in kSteps) {
        for (final h in kWordsDB[l]![s]!) {
          expect(kEn.containsKey(plainOf(h)), true,
              reason: 'EN missing: $h');
        }
      }
    }
  });

  test('Eski/yangi imlo tengligi', () {
    expect(equalOldNew('shamol', 'şamol'), true);
    expect(equalOldNew('chiroq', 'çiroq'), true);
    expect(equalOldNew("o'rik", 'örik'), true);
    expect(equalOldNew("g'olib", 'ğolib'), true);
    expect(equalOldNew('olma', 'anor'), false);
  });

  test('SM-2 va Levenshtein', () {
    expect(levenshtein('olma', 'olma'), 0);
    expect(accuracyPct('olma', 'olma'), 100);
    expect(qualityFromPct(97), 5);
    final s = sm2Update(SrsState(), 5, 1000);
    expect(s.reps, 1);
    expect(s.interval, 1);
  });
}
