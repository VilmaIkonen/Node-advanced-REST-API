DROP DATABASE IF EXISTS gamedb;
CREATE DATABASE gamedb;

CREATE TABLE gamedb.game(
  number INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  genre VARCHAR(20) NOT NULL,
  rating VARCHAR(5) NOT NULL
);

DROP user IF EXISTS 'wilma'@'localhost';
CREATE user 'wilma'@'localhost' identified BY 'verysecretpassword';
GRANT all privileges ON gamedb.* TO 'wilma'@'localhost';

INSERT INTO gamedb.game VALUES(1, 'Jigsaw puzzle', 13, 'FPS', '**');
INSERT INTO gamedb.game VALUES(2, 'Amnesia2030', 30, 'adventure', '*');