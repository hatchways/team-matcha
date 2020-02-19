import csv
from flask.cli import FlaskGroup
from project import create_app, db
from project.models.timezone import Timezone
import unittest
import sys

cli = FlaskGroup(create_app=create_app)


@cli.command("recreate_db")
def create_db():
    print("Recreating db")
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command('seed_db')
def seed_timezones():
    """Creates the timezone table and populates it."""
    with open('project/db/timezones.csv') as csv_file:
        csv_reader = csv.reader(csv_file)
        next(csv_reader)
        for row in csv_reader:
            timezone = Timezone(*row)
            db.session.add(timezone)
    db.session.commit()
    return


@cli.command()
def test():
    """Runs the tests without code coverage"""
    tests = unittest.TestLoader().discover('project/test', pattern='*_test.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    sys.exit(result)


if __name__ == "__main__":
    cli()
