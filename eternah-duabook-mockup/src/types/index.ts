export interface Dua {
  id: string;
  category: string;
  arabic: string;
  transliteration?: string;
  translation: string;
  reference?: string;
  tags: string[];
  audioUrl?: string;
}
