// importing modules
import React, { Component } from 'react';
import { Box, Typography } from '@material-ui/core';
import moment from 'moment';
// importing components
import ScheduleNav from '../ScheduleNav/ScheduleNav';
import NoScheduledItems from '../NoScheduledItems/NoScheduledItems';

class PastSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            pastSchedule: [
                // {
                //     eventDate: moment(),
                //     eventName: '15 minute meeting',
                //     eventType: 'One-on-One',
                //     eventInvitee: 'John-doe',
                //     eventInviteeEmail: 'john-doe@gmail.com',
                //     eventOriginallyScheduled: 'February 14, 2020'
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
                                ? null 
                                : <NoScheduledItems text="No Past Events"/>
                        }
                    </Box>
                </Box>
            </Box>
        )
    }
};

export default PastSchedule;