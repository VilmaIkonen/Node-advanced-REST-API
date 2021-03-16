# Databases

1. Create project folder --> open
2. Create package.json
```shell
 npm init -y
 ```
3. Install dependencies
```shell
npm install mariadb
```
4.   Create database with with create statements
5. Run the create statements (will run all commands from the text file)
```shell
mysql -u root -p <"path-to-the-create-statement-file">
```

## Database 'backup' as create statements
```shell
mysqldump -u root --databases employeedb >empdb.sql
```
Restoring from backup
```shell
mysql -u root -p <"path-to-the-file/emp.sql">
```