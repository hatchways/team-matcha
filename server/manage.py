from flask.cli import FlaskGroup
from project import create_app, db
from project.api.models import User
import unittest
import sys

cli = FlaskGroup(create_app=create_app)


@cli.command("create_db")
def create_db():
    print("Creating db")
    db.drop_all()
    db.create_all()
    db.session.commit()


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
