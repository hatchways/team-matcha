// importing modules
import React, { Component } from 'react';
import { Box } from '@material-ui/core';
// importing components
import EventPageHeader from './EventPageHeader/EventPageHeader';
import EventCard from './EventPageCard/EventsPageCard';
import EventPageMsg from './EventPageMsg/EventPageMsg';

class EventsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            events: [ // test events
                {
                    eventDuration: '15 min',
                    eventName: '15 minute meeting',
                    eventLink: 'calendapp/john-doe/15min',
                    eventType: 'One-on-One',
                    eventColor: '#7b1fa2'
                },
                {
                    eventDuration: '30 min',
                    eventName: '30 minute meeting',
                    eventLink: 'calendapp/john-doe/30min',
                    eventType: 'One-on-One',
                    eventColor: '#43a047'
                },
                {
                    eventDuration: '60 min',
                    eventName: '60 minute meeting',
                    eventLink: 'calendapp/john-doe/60min',
                    eventType: 'One-on-One',
                    eventColor: '#ef6c00'
                }
            ]
        };
    }

    componentDidMount(){
        console.log('fetch events from server');
    }

    render(){
        const { events } = this.state;

        return (
            <Box className="eventPage">
                <EventPageHeader />
                <Box className="eventPage__container">
                    {
                        events.length > 0 
                            ? events.map((event) => 
                            <EventCard 
                                handleLinkToClipBoard={this.handleLinkToClipBoard}
                                key={event.eventLink} 
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