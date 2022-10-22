# Haukka

## Development

This application uses a Oracle database and Node.js runtime.

### Running a local Oracle database

On ARM64 Mac you may need to use, for example, [Colima](https://github.com/abiosoft/colima) to be able to start the container.

To connect to the database instance you need to install [Oracle Instant Client](https://www.oracle.com/database/technologies/instant-client.html), which also includes SQL\*Plus CLI tool to interact with the database.

You may also want to install [Oracle SQL Developer](https://www.oracle.com/database/sqldeveloper/), a GUI application for inspecting the database.

To obtain database persistence create a docker volume first:

```
docker volume create haukka
```

Then run a local Oracle database in a docker container:

```
docker run -d --name haukka \
    -p 1521:1521 -p 5500:5500 \
    -e ORACLE_PWD=Sup3rsecret \
    -v haukka:/opt/oracle/oradata
    container-registry.oracle.com/database/express:21.3.0-xe
```

More detailed instructions can be found [here](https://container-registry.oracle.com/).

### Creating a database user for the application

To connect to the database with SQL\*Plus run:

```
sqlplus -l system/Sup3rsecret@localhost/xepdb1
```

Let's create a new user in the database for the application:

```
CREATE USER app IDENTIFIED by H4ukka;
```

Then let's grant needed privileges:

```
GRANT UNLIMITED TABLESPACE TO app;
```

```
GRANT
    CREATE SESSION,
   	CREATE TABLE,
   	CREATE SEQUENCE
TO
    app;
```

### Install dependencies

```
npm run install
```
