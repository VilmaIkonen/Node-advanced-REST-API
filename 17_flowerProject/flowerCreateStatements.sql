DROP DATABASE IF EXISTS flowerdb; 
CREATE DATABASE flowerdb;
USE flowerdb;

CREATE TABLE flower(
  flowerId INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(26) NOT NULL,
  unitPrice INTEGER NOT NULL,
  site VARCHAR(15) NOT NULL,
  stock INTEGER NOT NULL
);

DROP user IF EXISTS 'leo'@'localhost';
CREATE user 'leo'@'localhost' identified WITH 'g0SfVD7s';
GRANT all privileges ON flowerdb.* TO 'leo'@'localhost';

INSERT INTO flower VALUES(1, 'tulip', 10, 'shade', 200);
INSERT INTO flower VALUES(2, 'violet', 7, 'half shade', 100);

-- INSERT INTO flower VALUES(1, 'tulip', 10, 'shade', 200),(1, 'violet', 7, 'half shade', 100);

