/// Eski/yangi imlo tengligi: sh<->sh, ch<->ch, o'<->o, g'<->g kanonik taqqoslash.
///
/// Web versiyadagi qoida: foydalanuvchi "shamol" yozsa ham, "samol" emas,
/// "şamol" ham to'g'ri qabul qilinadi. Har ikki imlo bir xil kanonik shaklga
/// keltiriladi, so'ng taqqoslanadi.
String canonOldNew(String s) {
  var t = s.toLowerCase().trim();
  t = t.replaceAll('-', '').replaceAll('ʼ', '').replaceAll('’', '');
  // Avval yangi imlo belgilarini eski digrafga o'tkazamiz.
  t = t
      .replaceAll('ş', 'sh')
      .replaceAll('ç', 'ch')
      .replaceAll('ö', "o'")
      .replaceAll('ğ', "g'")
      .replaceAll('ñ', 'ng');
  // Apostrof variantlarini birxillashtiramiz.
  t = t
      .replaceAll('‘', "'")
      .replaceAll('ʼ', "'")
      .replaceAll('’', "'")
      .replaceAll('`', "'")
      .replaceAll('ʼ', "'");
  // o' / g' dagi apostrofni saqlab, qolganlarini tozalaymiz.
  final buf = StringBuffer();
  for (var i = 0; i < t.length; i++) {
    final c = t[i];
    if (c == "'") {
      final prev = i > 0 ? t[i - 1] : '';
      if (prev == 'o' || prev == 'g') {
        buf.write(c);
      }
      continue;
    }
    buf.write(c);
  }
  return buf.toString().replaceAll(' ', '');
}

/// Ikki yozuv (masalan nutqdan kelgan matn vs to'g'ri so'z) tengmi?
bool equalOldNew(String a, String b) => canonOldNew(a) == canonOldNew(b);

/// Bildirishnoma matni: qaysi imlo juftligi ishlatilgani haqida.
String? orthographyNotice(String input) {
  final t = input.toLowerCase();
  if (t.contains('ş') || t.contains('ç') || t.contains('ö') || t.contains('ğ')) {
    return 'Yangi imlo belgisi (ş ç ö ğ) qabul qilindi ✓';
  }
  if (t.contains('sh') || t.contains('ch') || t.contains("o'") || t.contains("g'")) {
    return 'Eski imlo (sh ch o\u02bb g\u02bb) qabul qilindi ✓';
  }
  return null;
}
