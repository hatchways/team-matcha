// importing modules
import React, { Component } from 'react';
import { Box, Typography } from '@material-ui/core';
import moment from 'moment';
// importing components
import ScheduleNav from '../ScheduleNav/ScheduleNav';
import NoScheduledItems from '../NoScheduledItems/NoScheduledItems';
import PastScheduleItem from '../PastSchedule/PastScheduleItem/PastScheduleItem';

class PastSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            pastSchedule: [ // upcoming events test data
                // {
                //     eventDate: moment().format('dddd MMMM Do'),
                //     eventName: '15 minute meeting',
                //     eventType: 'One-on-One',
                //     eventInvitee: 'John-doe',
                //     eventInviteeEmail: 'john-doe@gmail.com',
                //     eventOriginallyScheduled: 'February 14, 2020',
                //     eventInviteeTimezone: 'Pacific Time - US & Canada',
                //     eventColor: '#651fff',
                //     eventScheduledTime: '10:00am - 10:15am'
                // },
                // {
                //     eventDate: moment().format('dddd MMMM Do'),
                //     eventName: '30 minute meeting',
                //     eventType: 'One-on-One',
                //     eventInvitee: 'Jane-doe',
                //     eventInviteeEmail: 'jane-doe@gmail.com',
                //     eventOriginallyScheduled: 'February 16, 2020',
                //     eventInviteeTimezone: 'Pacific Time - US & Canada',
                //     eventColor: '#43a047',
                //     eventScheduledTime: '11:00am - 11:30am'
                // }
            ]
        };
    }

    componentDidMount(){
        console.log('fetch past schedule from the server!');
    }

    render(){
        const { pastSchedule } = this.state;
        const pastScheduleCount = pastSchedule.length > 0 ? pastSchedule.length : 0;
        return (
            <Box className="pastSchedule">
                <Box className="pastSchedule__header">
                    <Typography variant="body1" className="pastSchedule__header--text">
                        Displaying {pastScheduleCount} of {pastScheduleCount} Events
                    </Typography>
                </Box>
                <Box className="pastSchedule__content">
                    <ScheduleNav />
                    <Box className="pastSchedule__list">
                        {
                            pastSchedule.length > 0 
                                ? pastSchedule.map((pastEvent, index) => <PastScheduleItem key={index} {...pastEvent} />)
                                : <NoScheduledItems text="No Past Events"/>
                        }
                    </Box>
                </Box>
            </Box>
        )
    }
};

export default PastSchedule;