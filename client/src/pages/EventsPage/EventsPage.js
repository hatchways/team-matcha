// importing modules
import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
// importing components
import EventPageHeader from "./EventPageHeader/EventPageHeader";
import EventCard from "./EventPageCard/EventsPageCard";
import EventPageMsg from "./EventPageMsg/EventPageMsg";
import SpinnerLarge from '../../components/Spinners/SpinnerLarge';

const EventsPage = ({setImageUrl, token, userId, profileImageUrl}) => {
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`/users/details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-access-token': token
            }
            })
            .then(data => data.json())
            .then((userData) => {
                setImageUrl(userData.img_url);
                setUser({...userData});
                fetchEvents(userData.public_id);
            })
            .catch(err => (err));
    }, []);

    const fetchEvents = (public_id) => {
      fetch(`/users/${public_id}/events`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'X-access-token': token
          }
      })
          .then(data => data.json())
          .then((eventsData) => {
              setEvents(eventsData);
              setIsLoading(false);
          })
          .catch(err => (err));
  }

    const handleRemoveEvent = (url) => {
        fetch(`/users/${userId}/events/${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-access-token': token
            }
        })
            .then(data => data.json())
            .then((data) => {
                fetchEvents(userId);
            })
            .catch(err => (err));
    };

    return (
      <Box className="eventPage">
        <EventPageHeader
          img={profileImageUrl}
          {...user}
        />
        {
          loading ? <SpinnerLarge /> :
          <Box className="eventPage__container">
          {events.length > 0 ? (
            events.map((event, index) => (
              <EventCard
                handleRemoveEvent={handleRemoveEvent}
                key={index}
                userName={user.public_id}
                {...event}
              />
            ))
          ) : <EventPageMsg public_id={user.public_id} />}
        </Box> 
        }
      </Box>
    );
  }

export default EventsPage;
