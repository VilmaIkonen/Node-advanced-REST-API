DROP DATABASE IF EXISTS employeedb;
CREATE DATABASE employeedb;
USE employeedb;

CREATE TABLE employee(
  employeeId INTEGER NOT NULL PRIMARY KEY,
  firstname VARCHAR(20) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  department VARCHAR(15),
  salary DECIMAL(6,2)
);
-- primary key 'not null' by default. DECIMAL(6,2): field length 6, out of where 2 places is reserved for decimals --> max 9999,99€
-- dropping db will drop also the table. So no need to drop it separately

CREATE user IF NOT EXISTS 'zeke'@'localhost' identified with mysql_native_password by 'secret';
-- change here the username and connected pswd that will be used.
GRANT all privileges ON employeedb.* to 'zeke'@'localhost';
-- GRANT all privileges ON employeedb.employee --> can use only table "employee" in employeedb

INSERT INTO employee VALUES(1, 'Matt', 'River', 'ICT', 3000);
INSERT INTO employee VALUES(2, 'Mary', 'Smith', 'ADMIN', 7000);

-- This all can be copied into terminal while in mysql -u -root -p (w/o comments of course!)