export interface Author {
  author_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  date_of_death: string | null;
}

export type AuthorInput = Omit<Author, 'author_id'>;

export interface Book {
  book_id: number;
  title: string;
  publication_year: number | null;
  isbn: string | null;
  author_id: number | null;
}

export type BookInput = Omit<Book, 'book_id'>;

export interface BookWithAuthor extends Book {
  author_first_name: string | null;
  author_last_name: string | null;
}
