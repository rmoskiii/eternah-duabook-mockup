export interface Dua {
  id: string;
  category: string;
  arabic: string;
  transliteration?: string;
  translation: string;
  reference?: string;
  tags: string[];
  audioUrl?: string;
  // --- New Visual Fields ---
  illustration?: string; // For a custom image URL (future proofing)
  iconType?: 'heart' | 'sun' | 'moon' | 'cloud' | 'mosque' | 'book'; // The vector icon key
}