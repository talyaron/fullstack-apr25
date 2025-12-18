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