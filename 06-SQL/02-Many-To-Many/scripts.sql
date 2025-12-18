CREATE DATABASE `library`;

use `library`;

CREATE TABLE `authors` (
    `author_id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `date_of_birth` DATE,
    `date_of_death` DATE,
    PRIMARY KEY (`author_id`)
);

CREATE TABLE `books` (
    `book_id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `publication_year` YEAR,
    `isbn` VARCHAR(13) UNIQUE,
    `author_id` INT NOT NULL, -- This column will hold the ID of the author

    PRIMARY KEY (`book_id`),

    -- Define the Foreign Key constraint
    CONSTRAINT `fk_author`
        FOREIGN KEY (`author_id`)
        REFERENCES `authors` (`author_id`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

INSERT INTO `authors` (first_name, last_name, date_of_birth, date_of_death)
VALUES
    ('Stephen', 'King', '1947-09-21', NULL),
    ('Agatha', 'Christie', '1890-09-15', '1976-01-12'),
    ('Gabriel', 'Garcia Marquez', '1927-03-06', '2014-04-17'),
    ('Harper', 'Lee', '1926-04-28', '2016-02-19'),
    ('Neil', 'Gaiman', '1960-11-10', NULL);
    
INSERT INTO `books` (title, publication_year, isbn, author_id)
VALUES
    -- Stephen King (author_id = 1)
    ('The Shining', 1977, '9780385121675', 1),
    ('The Shining', 1977, '9780385121675', 1),
    ('It', 1986, '9780670813025', 1),
    
    -- Agatha Christie (author_id = 2)
    ('Murder on the Orient Express', 1934, '9780062073501', 2),
    ('And Then There Were None', 1939, '9780062073488', 2),
    
    -- Gabriel Garcia Marquez (author_id = 3)
    ('One Hundred Years of Solitude', 1967, '9780060883287', 3),
    ('Love in the Time of Cholera', 1985, '9780307389732', 3),
    
    -- Harper Lee (author_id = 4)
    ('To Kill a Mockingbird', 1960, '9780061120084', 4),
    ('Go Set a Watchman', 2015, '9780062400926', 4),
    
    -- Neil Gaiman (author_id = 5)
    ('American Gods', 2001, '9780062562471', 5),
    ('Coraline', 2002, '9780380807345', 5);
    
INSERT INTO `books` (title, publication_year, isbn)
values
	('test', 2005, '9780062073501');
    
    
-- Tags table
CREATE TABLE `tags` (
    `tag_id` INT NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`tag_id`)
);

-- Junction table for many-to-many relationship between books and tags
CREATE TABLE `books_tags` (
    `tag_id` INT NOT NULL,
    `book_id` INT NOT NULL,
    PRIMARY KEY (`tag_id`, `book_id`),
    CONSTRAINT `fk_books_tags_tag`
        FOREIGN KEY (`tag_id`)
        REFERENCES `tags` (`tag_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT `fk_books_tags_book`
        FOREIGN KEY (`book_id`)
        REFERENCES `books` (`book_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Insert tags
INSERT INTO `tags` (`text`) VALUES 
    ('Fiction'),
    ('Non-Fiction'),
    ('Science'),
    ('Romance'),
    ('Mystery'),
    ('History');

-- Insert books (assuming authors with IDs 1-3 exist)
INSERT INTO `books` (`title`, `publication_year`, `isbn`, `author_id`) VALUES 
    ('The Great Adventure', 2020, '9781234567001', 1),
    ('Love in Paris', 2019, '9781234567002', 2),
    ('Murder at Midnight', 2021, '9781234567003', 1),
    ('A Brief History of Time', 1988, '9781234567004', 3),
    ('The Hidden Truth', 2022, '9781234567005', 2),
    ('Chemistry Basics', 2018, '9781234567006', 3);

-- Insert books_tags relationships (linking books to tags)
-- Insert books_tags relationships for existing books
INSERT INTO `books_tags` (`book_id`, `tag_id`) VALUES 
    (1, 1),   -- The Shining -> Fiction
    (1, 5),   -- The Shining -> Mystery
    (2, 1),   -- It -> Fiction
    (2, 5),   -- It -> Mystery
    (3, 1),   -- Murder on the Orient Express -> Fiction
    (3, 5),   -- Murder on the Orient Express -> Mystery
    (4, 1),   -- And Then There Were None -> Fiction
    (4, 5),   -- And Then There Were None -> Mystery
    (5, 1),   -- One Hundred Years of Solitude -> Fiction
    (5, 6),   -- One Hundred Years of Solitude -> History
    (6, 1),   -- Love in the Time of Cholera -> Fiction
    (6, 4),   -- Love in the Time of Cholera -> Romance
    (7, 1),   -- To Kill a Mockingbird -> Fiction
    (7, 6),   -- To Kill a Mockingbird -> History
    (8, 1),   -- Go Set a Watchman -> Fiction
    (9, 1),   -- American Gods -> Fiction
    (9, 5),   -- American Gods -> Mystery
    (10, 1),  -- Coraline -> Fiction
    (11, 1),  -- The Great Adventure -> Fiction
    (11, 5),  -- The Great Adventure -> Mystery
    (12, 1),  -- Love in Paris -> Fiction
    (12, 4),  -- Love in Paris -> Romance
    (13, 1),  -- Murder at Midnight -> Fiction
    (13, 5),  -- Murder at Midnight -> Mystery
    (14, 2),  -- A Brief History of Time -> Non-Fiction
    (14, 3),  -- A Brief History of Time -> Science
    (14, 6),  -- A Brief History of Time -> History
    (15, 1),  -- The Hidden Truth -> Fiction
    (15, 5),  -- The Hidden Truth -> Mystery
    (16, 2),  -- Chemistry Basics -> Non-Fiction
    (16, 3);  -- Chemistry Basics -> Science