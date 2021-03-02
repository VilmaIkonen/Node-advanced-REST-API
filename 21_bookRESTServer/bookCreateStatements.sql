DROP DATABASE IF EXISTS bookdb;
CREATE DATABASE bookdb;

CREATE TABLE bookdb.book(
  bookID INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  author VARCHAR(20) NOT NULL,
  type VARCHAR(30) NOT NULL,
  year INTEGER NOT NULL
);

DROP user IF EXISTS 'adrian'@'localhost';
CREATE user 'adrian'@'localhost' identified BY 'tN5LKSaK';
GRANT all privileges on bookdb.* to 'adrian'@'localhost';

INSERT INTO bookdb.book VALUES(1, 'SQL-mysteries', 'Matt Wilson', 'pocketbook', 1990);
INSERT INTO bookdb.book VALUES(2, 'The adventures of Mike the Millipede', 'Isla Shore', 'hardcover', 2012);