Here are 10 exercises designed to test your knowledge of MySQL aggregation, filtering, and joining, based on the books, authors, and tags tables we've been working with.

Level: Beginner (Warm-up)
1. The Basic Count Write a query to find the total number of books in the books table.

Keywords: COUNT

2. Finding the Average Calculate the average price of all books in the store.

Keywords: AVG

3. Pattern Matching (Authors) Find all books where the title starts with the word "The".

Keywords: LIKE, %

4. The Price Range List all books that have a price between 30 and 60.

Keywords: BETWEEN or AND

Level: Intermediate (Grouping & Logic)
5. Authors and their Catalog Show a list of author_ids and how many books each author has written.

Keywords: COUNT, GROUP BY

6. Expensive vs. Cheap Find the highest (MAX) and lowest (MIN) price among books published after the year 2000.

Keywords: MAX, MIN, WHERE

7. Specific Name Search Find all authors whose last name contains the letter 'a' (case-insensitive).

Keywords: LIKE

8. Filtering Aggregates Show the author_ids for only those authors who have written more than 2 books.

Keywords: GROUP BY, HAVING, COUNT

Level: Advanced (Joins & Complex Logic)
9. The Author's Average Join the books and authors tables to show the Author's Full Name (First + Last) and their average book price.

Keywords: JOIN, CONCAT, GROUP BY, AVG

10. The Ultimate Filter Find the total number of books that have the tag "Fiction", were published in an even year, and cost more than the average price of all books.

Keywords: JOIN, COUNT, Subquery, % (Modulo)