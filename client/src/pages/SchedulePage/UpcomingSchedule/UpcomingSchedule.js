import React, { Component } from 'react';
import { Box, Typography } from '@material-ui/core';
import moment from 'moment';
// importing components
import ScheduleNav from '../ScheduleNav/ScheduleNav';
import NoScheduledItems from '../NoScheduledItems/NoScheduledItems';
import UpcomingScheduleItem from '../UpcomingSchedule/UpcomingScheduleItem/UpcomingScheduleItem';

class UpcomingSchedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            upcomingSchedule: [ // upcoming events test data
                {
                    eventDate: moment().format('dddd MMMM Do'),
                    eventName: '15 minute meeting',
                    eventType: 'One-on-One',
                    eventInvitee: 'John-doe',
                    eventInviteeEmail: 'john-doe@gmail.com',
                    eventOriginallyScheduled: 'February 14, 2020',
                    eventInviteeTimezone: 'Pacific Time - US & Canada',
                    eventColor: '#651fff',
                    eventScheduledTime: '10:00am - 10:15am'
                },
                {
                    eventDate: moment().format('dddd MMMM Do'),
                    eventName: '30 minute meeting',
                    eventType: 'One-on-One',
                    eventInvitee: 'Jane-doe',
                    eventInviteeEmail: 'jane-doe@gmail.com',
                    eventOriginallyScheduled: 'February 16, 2020',
                    eventInviteeTimezone: 'Pacific Time - US & Canada',
                    eventColor: '#43a047',
                    eventScheduledTime: '11:00am - 11:30am'
                }
            ]
        };
    }

    componentDidMount(){
        console.log('fetch upcoming schedule from the server!');
        console.log(this.props)
        this.handleFetchAppts()
    }

    handleFetchAppts = () => {// should render all events for the user
        fetch(`/users/${this.props.userId}/appointments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-access-token': this.props.token
            }
        })
        .then(data => data.json())
        .then((apptData) => {
            this.setState({upcomingSchedule: apptData})
            console.log('appointment data', apptData);
        })
        .catch(err => (err));
    }

    render(){

        const { upcomingSchedule } = this.state;
        const upcomingScheduleCount = upcomingSchedule.length > 0 ? upcomingSchedule.length : 0;

        return (
            <Box className="upcomingSchedule">
                <Box className="upcomingSchedule__header">
                    <Typography variant="body1" className="upcomingSchedule__header--text">
                        Displaying {upcomingScheduleCount} of {upcomingScheduleCount} Events
                    </Typography>
                </Box>
                <Box>
                    <ScheduleNav />
                    <Box className="upcomingSchedule__list">
                        {
                            upcomingSchedule.length > 0 
                                ? upcomingSchedule.map((upcomingEvent, index) => <UpcomingScheduleItem key={index} {...upcomingEvent} />)
                                : <NoScheduledItems text="No Upcoming Events"/>
                        }
                    </Box>
                </Box>
            </Box>
        );
    }
};

export default UpcomingSchedule;
