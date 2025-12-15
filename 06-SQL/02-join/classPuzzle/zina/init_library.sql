CREATE DATABASE library;
USE library;
CREATE TABLE author (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    nationality VARCHAR(50)
) ENGINE=InnoDB;

CREATE TABLE genre (
    genre_id INT PRIMARY KEY AUTO_INCREMENT,
    genre_name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE book (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    publication_year INT,
    author_id INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES author(author_id)
) ENGINE=InnoDB;

CREATE TABLE book_genre (
    book_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (book_id, genre_id),
    FOREIGN KEY (book_id) REFERENCES book(book_id),
    FOREIGN KEY (genre_id) REFERENCES genre(genre_id)
) ENGINE=InnoDB;

INSERT INTO author (first_name, last_name, nationality)
VALUES 
    ('Alan', 'Smith', 'American'),
    ('Betty', 'Jones', 'British'),
    ('Charlie', 'Brown', 'Canadian'),
    ('Dana', 'White', 'Irish'),
    ('Ethan', 'Clark', 'American'),
    ('Fiona', 'Gray', 'British'),
    ('George', 'King', 'Australian'),
    ('Hannah', 'Lee', 'Canadian');

INSERT INTO genre (genre_name)
VALUES 
    ('Mystery'),
    ('Historical Fiction'),
    ('Science Fiction'),
    ('Romance'),
    ('Thriller'),
    ('Young Adult');

INSERT INTO book (title, author_id, publication_year)
VALUES 
    ('The Silicon Secret', 1, 2018),
    ('Cybernetic Dreams', 1, 2021),
    ('Whispers in the Library', 2, 2015),
    ('The Emerald Heirloom', 2, 2020),
    ('Shadow of the Northern Lights', 3, 2019),
    ('A Summer in Dublin', 4, 2017),
    ('The Chronos Paradox', 5, 2022),
    ('Broken Promises', 6, 2016),
    ('Outback Escape', 7, 2023);

SELECT
    CONCAT(A.first_name, ' ', A.last_name) AS AuthorName,
    B.title AS BookTitle,
    B.publication_year AS Year,
    G.genre_name AS Genre
FROM
    book B
JOIN 
    author A ON B.author_id = A.author_id
JOIN
    book_genre BG ON B.book_id = BG.book_id
JOIN
    genre G ON BG.genre_id = G.genre_id
ORDER BY 
    AuthorName, BookTitle;
