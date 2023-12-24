export interface Book {
  id: number;
  title: string;
  author: string;
  date: string;
  lang: string;
  publisher: string;
  style: string;
  takeBookId: number | null;
}
