import type { Dua } from '../types'; // type-only import to avoid runtime import error

export const mockDuas: Dua[] = [
  {
    id: '1',
    category: 'Anxiety',
    iconType: 'cloud', // <--- Represents lifting the fog/weight
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي',
    transliteration: "Rabbi-shrah li sadri, wa yassir li amri, wah-lul 'uqdatam-min lisani, yafqahu qawli",
    translation: 'My Lord, expand for me my breast [with assurance] and ease for me my task and untie the knot from my tongue that they may understand my speech.',
    reference: 'Surah Taha (20:25-28)',
    tags: ['speech', 'confidence', 'exam', 'meeting']
  },
  {
    id: '2',
    category: 'General',
    iconType: 'mosque', // <--- Represents the comprehensive prayer
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil 'akhirati hasanatan waqina 'adhaban-nar",
    translation: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
    reference: 'Surah Al-Baqarah (2:201)',
    tags: ['success', 'protection', 'comprehensive']
  },
  {
    id: '3',
    category: 'Sadness',
    iconType: 'heart', // <--- Represents healing the heart
    arabic: 'لَّا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: "La ilaha illa anta subhanaka inni kuntu minaz-zalimin",
    translation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    reference: 'Surah Al-Anbiya (21:87)',
    tags: ['distress', 'forgiveness', 'grief']
  },
  {
    id: '4',
    category: 'Family',
    iconType: 'heart', // <--- Represents family love
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama",
    translation: 'Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.',
    reference: 'Surah Al-Furqan (25:74)',
    tags: ['marriage', 'children', 'future']
  }
];