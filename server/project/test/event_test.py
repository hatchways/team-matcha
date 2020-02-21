import datetime as dt
from project import db
from project.models.event import Event, add_event
from project.models.availability import Availability, create_availability
from project.models.user import User, add_user
from project.test.test_base import TestBase
import json



class EventModelTest(TestBase):
    def test_event_model(self):
        """Tests whether the event model is working correctly."""
        name = '♪┏(・o･)┛♪┗ ( ･o･) ┓♪'
        url = 'myCoolParty'
        location = 'da street!'
        add_user()
        user_id = User.query.first().id
        availability = create_availability()
        add_event(url=url,
                  name=name,
                  location=location,
                  user_id=user_id,
                  availability=availability)
        event = Event.query.filter_by(url=url).first()

        self.assertEqual(event.name, name)
        self.assertEqual(event.location, location)

    def test_event_foreign_key(self):
        """Tests whether the foreign key relationship is working between
        Event and User."""
        name1 = 'timmy'
        name2 = 'johny'
        email1 = 'iam@clever.ca'
        email2 = 'iamnot@clever.ca'
        add_user(name=name1, email=email1)
        add_user(name=name2, email=email2)
        user1_id = User.query.filter_by(email=email1).first().id
        user2_id = User.query.filter_by(email=email2).first().id
        start1 = dt.time(6)
        start2 = dt.time(8)
        availability1 = create_availability(start=start1)
        availability2 = create_availability(start=start2)
        url1 = 'aCleverUrl'
        url2 = 'aNotSoCleverUrl'
        add_event(url=url1, user_id=user1_id, availability=availability1)
        add_event(url=url2, user_id=user2_id, availability=availability2)
        db.session.commit()
        query1 = User.query.\
            filter_by(email=email1).\
            join(Event, Availability).\
            first()
        query2 = User.query.\
            filter_by(email=email2).\
            join(Event, Availability).\
            first()

        self.assertEqual(query1.name, name1)
        self.assertEqual(query2.name, name2)
        self.assertEqual(query1.events[0].url, url1)
        self.assertEqual(query2.events[0].url, url2)
        self.assertEqual(query1.events[0].availability.start, start1)
        self.assertEqual(query2.events[0].availability.start, start2)

    def test_user_event_cardinality_1to1(self):
        """Tests whether the User-Event relationship is set up correctly."""
        email1 = 'iam@clever.ca'
        email2 = 'iamnot@clever.ca'
        add_user(email=email1)
        add_user(email=email2)
        user1_id = User.query.filter_by(email=email1).first().id
        user2_id = User.query.filter_by(email=email2).first().id
        availability1 = create_availability()
        availability2 = create_availability()
        add_event(user_id=user1_id, availability=availability1)
        add_event(url='anEvent', user_id=user2_id, availability=availability2)
        db.session.commit()
        query1 = User.query.\
            filter_by(email=email1).\
            join(Event, Availability).\
            all()
        query2 = User.query.\
            filter_by(email=email2).\
            join(Event, Availability).\
            all()

        self.assertEqual(len(query1), 1)
        self.assertEqual(len(query2), 1)
        self.assertEqual(len(query1[0].events), 1)
        self.assertEqual(len(query2[0].events), 1)


