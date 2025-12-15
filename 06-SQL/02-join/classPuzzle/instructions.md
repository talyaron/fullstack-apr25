author_id INT NOT NULL, 

FOREIGN KEY (author_id) REFERENCES author(author_id)copy from example to classPuzzle/you-name

run npm i for server and client

create in init_db also table for genres, and update table books to have genre_id as FK to genres
update seed_db to insert some genres, and update books to have genre_id values

your goal is to be able to CRUD books with their authors and genres

User can search books by genre

make the app use react, to display books with their authors and genres, and search by genre

The user should be able to add, edit, delete books, authors, and genres
