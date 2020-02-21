// importing modules
import React, { Component } from 'react';
import { Box } from '@material-ui/core';
// importing components
import EventPageHeader from './EventPageHeader/EventPageHeader';
import EventCard from './EventPageCard/EventsPageCard';
import EventPageMsg from './EventPageMsg/EventPageMsg';
import Header from '../../components/Header/Header';
import SubNavigation from '../../components/SubNavigation/SubNavigation';

class EventsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            events: [ // test events
                {   
                    eventId: 1,
                    eventDuration: '15 min',
                    eventName: '15 minute meeting',
                    eventLink: 'calendapp/john-doe/15min',
                    eventType: 'One-on-One',
                    eventColor: '#651fff'
                },
                {
                    eventId: 2,
                    eventDuration: '30 min',
                    eventName: '30 minute meeting',
                    eventLink: 'calendapp/john-doe/30min',
                    eventType: 'One-on-One',
                    eventColor: '#43a047'
                },
                {
                    eventId: 3,
                    eventDuration: '60 min',
                    eventName: '60 minute meeting',
                    eventLink: 'calendapp/john-doe/60min',
                    eventType: 'One-on-One',
                    eventColor: '#ef6c00'
                }
            ],
            userDetails: {}
        };
    }

    componentDidMount(){
        console.log('fetch event types from the server')
        console.log(this.props.token);
        console.log(this.props.userId);
        this.handleFetchUser();
    }

    handleFetchUser = () => {
        fetch(`/users/details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-access-token': this.props.token
            }
            })
            .then(data => data.json())
            .then((data) => {
                console.log('user details', data);
                this.setState({ userDetails: {...data} });

                fetch(`/users/${data.public_id}/events`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-access-token': this.props.token
                    }
                    })
                    .then(data => data.json())
                    .then((data) => {
                        console.log('events data', data);
                        this.setState({ events: data });
                    })
                    .catch(err => (err));

            })
            .catch(err => (err));
    }

    handleRemoveEvent = (id) => {
        this.setState((prevState) => ({
            events: prevState.events.filter((event) => event.eventId !== id)
        }))
    };

    render(){
        const { events } = this.state;

        return (
            <Box className="eventPage">
                <EventPageHeader {...this.state.userDetails}/>
                <Box className="eventPage__container">
                    {
                        events.length > 0 
                            ? events.map((event, index) => 
                            <EventCard 
                                handleRemoveEvent={this.handleRemoveEvent}
                                handleLinkToClipBoard={this.handleLinkToClipBoard}
                                key={index} 
                                {...event} 
                            />)
                            : <EventPageMsg />
                    }
                </Box>
            </Box>
        )
    }
};

export default EventsPage;