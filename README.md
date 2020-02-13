# flask-starter

## Starting the server:


1. Open a terminal and go to the server folder. Make sure you have **pipenv** installed (`pip install pipenv`)
2. Install the dependencies with `pipenv install`. This also createa a virtual environment, if there isn't one already
3. Activate the virtual environment and start the app with `pipenv run flask run`

## Docker

### Some Useful Commands

#### To build and Run:
```
make docker-build
make docker-up
```
#### To run tests
###### container should be up before testing
```
make docker-test
```

#### To Create Table:
```
docker-compose exec server python manage.py create_db
```

#### To enter postgres terminal:
###### docker exec [service name] psql --username=[postgres username] --dbname=[database name]

```
docker-compose exec postgres-db psql --username=postgres --dbname=db_dev
```

