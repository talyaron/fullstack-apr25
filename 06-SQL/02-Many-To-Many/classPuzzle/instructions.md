# SQL Practice Questions - Library Database

## Tables in the database:
- `authors` (author_id, first_name, last_name, date_of_birth, date_of_death)
- `books` (book_id, title, publication_year, isbn, author_id)
- `tags` (tag_id, text)
- `books_tags` (tag_id, book_id) - junction table

---

## Questions (Easy to Hard)

### Easy

**1.** Get all books from the database.

**2.** Get all authors' first and last names.

**3.** Get all books that were published before 2000.

### Medium

**4.** Get all books with their author's full name (first_name + last_name).

**5.** Get all living authors (authors where date_of_death is NULL).

**6.** Get all books that have the tag "Mystery" (use JOIN with books_tags and tags).

### Hard

**7.** Get all books with ALL their tags (each book should show with its tag names).

**8.** Count how many books each author has written (show author name and book count).

**9.** Get all authors who have written at least one book with the "Fiction" tag.

**10.** Get all books that have BOTH "Fiction" AND "Mystery" tags (hint: you may need to join books_tags twice or use GROUP BY with HAVING).
