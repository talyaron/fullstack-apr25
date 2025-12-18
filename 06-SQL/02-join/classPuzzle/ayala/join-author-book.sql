SELECT
    a.first_name,
    a.last_name,
    b.title,
    b.publication_year
FROM
    authors as a                         -- Alias the authors table as 'a'
JOIN
    books as b ON a.author_id = b.author_id -- Alias the books table as 'b' and join on the author_id
ORDER BY
    a.last_name, b.publication_year;