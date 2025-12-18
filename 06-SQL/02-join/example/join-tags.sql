SELECT b.title, b.publication_year,  CONCAT(a.first_name, ' ', a.last_name) AS author_name,t.text
FROM books b
JOIN authors a ON b.author_id = a.author_id
JOIN books_tags bt ON b.book_id = bt.book_id
JOIN tags t ON bt.tag_id = t.tag_id
WHERE t.text = 'Fiction'
ORDER BY b.book_id;