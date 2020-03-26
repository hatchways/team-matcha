import csv
from flask.cli import FlaskGroup
from project import create_app, db
from project.models.timezone import Timezone, create_timezone
from project.models.user import add_user
import unittest
import sys
from typing import List

cli = FlaskGroup(create_app=create_app)


@cli.command("recreate_db")
def create_db():
    print("Recreating db")
    db.drop_all()
    db.create_all()
    db.session.commit()


def seed_timezones(path: str):
    """
    Seeds the timezones table with the timezones from path returns the array of
    seeded timezones.
    :param path: str path to timezones.csv
    :return: array of Timezone objects
    """
    timezones: List[Timezone] = []
    with open(path) as csv_file:
        csv_reader = csv.reader(csv_file)
        next(csv_reader)  # skip the header row
        for row in csv_reader:
            timezones.append(create_timezone(*row))
    return timezones


def seed_db():
    user1 = add_user(name="Brian", email="Brian@email.com", public_id="Brianh")
    user2 = add_user(name="Gerardo", email="Gerardo@email.com", public_id="Gerardop")
    user3 = add_user(name="Kenneth", email="kenn@email.com", public_id="kennethc")
    db.commit()


@cli.command()
def test():
    """Runs the tests without code coverage"""
    tests = unittest.TestLoader().discover('project/test', pattern='*_test.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    sys.exit(result)


@cli.command()
def testfull():
    """Runs all the tests without code coverage"""
    tests = unittest.TestLoader().discover('project/test', pattern='*test.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    sys.exit(result)


if __name__ == "__main__":
    cli()
