select * from library.books;
select * from library.authors;

select * from library.tags order by tag_id;
select * from library.books_tags order by book_id;
-- BEGINNER
-- 1
select count(books.title) from library.books ;

-- 2
select avg(books.price) from library.books ;

-- 3
select * from library.books
where  title like 'The%';

-- 4
select * from library.books
where price between 30 and 60;

-- INTERMIDIATE
-- 5
select
concat(a.first_name,' ',a.last_name) as author_name,
a.author_id,
count(b.author_id) as amount_of_books
from authors as a
join books as b on a.author_id =b.author_id
group by (a.author_id) ;

-- 6
select
Min(price),
max(price)
from books
where publication_year>2000 ;

-- 7
select * from authors
where last_name like '%a%';

-- 8
select
author_id
from books
group by (author_id)
having count(book_id)>2
;

-- 9
select
a.author_id,
concat(a.first_name , ' ', a.last_name) as author_name,
avg(b.price)
from authors as a
join books as b on a.author_id = b.author_id
group by (a.author_id)
;

-- 10
select * from books as b
join books_tags as bt on b.book_id = bt.book_id
join tags as t on bt.tag_id = t.tag_id
where t.text = 'Fiction' and b.publication_year%2 = 0 and b.price>(SELECT AVG(price) FROM books);
