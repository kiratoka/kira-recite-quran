export const tajweedInfo: Record<string, {
  title: string;
  description: string;
  contoh: string;
}> = {
  'Idgham - With Ghunnah': {
    title: 'Idgham Bighunnah',
    description: `Ketika huruf Nun mati & atau Tanwin bertemu dengan salah satu dari 4 huruf ini (ي، ن، م، و). 
Cara baca: meleburkan nun mati atau tanwin dengan huruf di depannya dan seolah-olah huruf N di nun mati atau tanwin tidak dibaca, sambil didengungkan serta ditahan sekitar 2 harakat sebelum menyebut jelas huruf di depannya.
* Namun jika huruf Nun mati & bertemu dengan huruf Wau (,) atau Ya () itu tersambung (tanpa dipisah oleh spasi), maka hukumnya menjadi Idzhar Wajib (dibaca dengan jelas tanpa dengung) contohnya ada di QS. Al-Baqarah ayat 86 pada kata "dun-yaa". Di aplikasi ini hukum Idzhar tidak kami beri warna dikarenakan hukum Idzhar dibaca jelas sesuai huruf tanpa ada dengung.
`,
    contoh: 'فَم<span class="idgh_ghn">نْ ي</span>َعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْ<span class="idgh_ghn">رًا ي</span>َرَهُۥ'
  },
  'Idgham - Without Ghunnah': {
    title: 'Idgham Bilaghunnah',
    description: `Ketika huruf Nun mati & atau Tanwin bertemu dengan salah satu dari 2 huruf ini: Lam (ل) atau Ra (ر).
Cara baca: meleburkan nun mati atau tanwin dengan huruf di depannya dan seolah-olah huruf N tidak dibaca **tanpa didengungkan**, serta ditahan sekitar 1–2 harakat sebelum menyebut huruf selanjutnya.`,
    contoh: 'وَيْ<span class="idgh_w_ghn">لٌ ل</span>ِكُلِّ هُمَزَةٍ'
  },
  'Idgham - Mutajanisayn': {
    title: 'Idgham Mutajanisayn',
    description: `Ketika huruf yang sejenis bertemu dengan huruf yang sama atau hampir sama dalam makhraj dan sifatnya.
Cara baca: meleburkan huruf pertama dengan huruf kedua, biasanya tanpa ghunnah kecuali ada ketentuan khusus.`,
    contoh: '<span>وَاِذْ قَالَ</span><span class="idgh_mus">تْ طّ</span>'
  },
  'Idgham Shafawi - With Meem': {
    title: 'Idgham Syafawi',
    description: `Ketika huruf Mim mati bertemu dengan huruf Mim hidup (berharakat).
Cara baca: meleburkan huruf Mim mati dengan Mim hidup di depannya, sambil didengungkan dan ditahan sekitar 2 harakat.`,
    // Surah Al-Mutaffifin ayat 14-15: كَلَّا بَلْ ۜ رَانَ عَلَىٰ قُلُوبِهِم مَّا كَانُوا يَكْسِبُونَ
    contoh: 'كَلَّا بَلْ ۜ رَانَ عَلَىٰ قُلُوبِهِ<span class="idghm_shfw">مْ م</span>َا كَانُوا يَكْسِبُونَ'
  },
  'Ikhafa\'': {
    title: 'Ikhfa',
    description: `Ketika huruf Nun mati & atau Tanwin bertemu dengan salah satu dari 15 huruf Ikhfa.
Cara baca: menyamarkan huruf nun mati atau tanwin seperti bunyi "NG", serta ditahan sekitar 2 harakat sebelum menyebut huruf selanjutnya. 
Ikhfa terbagi menjadi:
1. Ikhfa Aqrob (Dekat)
 NG terdengar kurang jelas (contoh: د، ت، ط)
2. Ikhfa Ausath (Sedang)
NG sedang (contoh: ث , ج , ذ , س , ش , ص , ض , ز , ظ , ف ).
3. Ikhfa Ab'ad (Jauh)
NG terdengar jelas (contoh: ق، ك).`,
    contoh: 'مِ<span class="ikhf">ن ش</span>َرِّ مَا خَلَقَ'
  },
  'Ikhafa\' Shafawi - With Meem': {
    title: 'Ikhfa Syafawi',
    description: `Ketika huruf Mim mati bertemu dengan huruf Ba (ب).
Cara baca: menyamarkan huruf Mim mati seperti "MNG" dan ditahan sekitar 2 harakat sebelum menyebut huruf Ba.`,
    // Contoh ini diambil dari Surah Al-Ghasyiyah ayat 22
    contoh: 'لَسْتَ عَلَيْهِ<span class="ikhf_shfw">مْ ب</span>ِمُصَيْطِرٍ'
  },
  'Ghunnah: 2 Vowels': {
    title: 'Ghunnah',
    description: `Ketika huruf Nun bertasyidid atau Mim bertasyidid.
Cara baca: didengungkan dan ditahan sekitar 2 harakat sebelum menyebut huruf Nun/Mim-nya.
*Catatan: Jika huruf sebelumnya adalah nun mati atau tanwin, maka hukumnya bisa berubah menjadi Idgham Bighunnah.`,
    contoh: 'ثُ<span class="ghn">مَّ</span> لَتَرَوُ<span class="ghn">نَّ</span>هَا عَيْنَ الْيَقِينِ'
  },
  'Iqlab': {
    title: 'Iqlab',
    description: `Ketika huruf Nun mati & atau Tanwin bertemu dengan huruf Ba (ب).
Cara baca: menggantikan bunyi nun mati/tanwin dengan bunyi Mim mati yang didengungkan dan ditahan sekitar 2 harakat sebelum menyebut huruf Ba.
Pada beberapa mushaf ditandai dengan huruf Mim kecil berdiri di antaranya.`,
    contoh: 'أَلِي<span class="iqlb">مٌ ب</span>ِمَا كَانُوا يَكْذِبُونَ'
  },
  'Qalaqah': {
    title: 'Qalqalah',
    description: `Terjadi saat salah satu dari 5 huruf Qalqalah (ق، ط، ب، ج، د) mati (sukun).
- Jika hurufnya di tengah kalimat, disebut **Qalqalah Sughra (kecil)**.
- Jika berhenti di akhir ayat atau waqaf, disebut **Qalqalah Kubra (besar)**.
Cara baca: dipantulkan dengan cepat dan kuat saat mengucapkan huruf qalqalah-nya.`,
    contoh: 'ٱ<span class="qlq">قْ</span>رَأْ بِٱسْمِ رَبِّكَ ٱلَّذِى خَلَ<span class="qlq">قَ</span>'
  }
};