export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: "Available" | "Borrowed";
  publishedYear: string;
}
