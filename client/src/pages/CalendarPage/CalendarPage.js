import React, { Component } from 'react';
import moment from 'moment';
import { Box, Button, Typography } from '@material-ui/core';
import { disableDays } from '../../Utils/dates-func';
import { DatePicker } from "@material-ui/pickers";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// importing components
import ConfirmModal from './ConfirmModal/ConfirmModal';
import TimeSlotItem from './TimeSlotItem/TimeSlotItem';


class CalendarPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            availability: {},
            timeslots: [],
            showConfirmModal: false,
            timeSlotSelected: '',
            timeSlotSelected24hr: ''
        }
    }

    componentDidMount(){
        const availability = {
            "2020-02-26": [],
            "2020-02-27": [{"hour": 12, "minute": 0},
                           {"hour": 12, "minute": 30},
                           {"hour": 13, "minute": 0},
                           {"hour": 13, "minute": 30},
                           {"hour": 14, "minute": 0},
                           {"hour": 14, "minute": 30},
                           {"hour": 15, "minute": 0},
                           {"hour": 15, "minute": 30},
                           {"hour": 16, "minute": 0},
                           {"hour": 16, "minute": 30}],
            "2020-02-28": [],
            "2020-02-29": [{"hour": 0, "minute": 0},
            {"hour": 0, "minute": 30},
            {"hour": 1, "minute": 0},
            {"hour": 1, "minute": 30},
            {"hour": 3, "minute": 0}],
        }
        // fetch event availability days and timeslots from server
        this.setState({ availability });
        // console.log('this.props.location', this.props.location);
        // console.log('dynamic url params', this.props.match.params);
        console.log('parsed date', moment('2020-02-28T16:30').format('hh:mma dddd MMMM Do YYYY')); // parsed data for confirmation zz for time zone
    }

    handleFetch = () => {
        // /users/{public_id}/events/{event_url}
    }

    // method: handles date change and time-slots to render
    handleDateChange = (date) => {
        this.setState({   
            date: date, 
            timeslots: this.state.availability[date.format('YYYY-MM-DD')] 
            }, () => console.log(this.state)
        );
        const { public_id, eventLink } = this.props.match.params; // get params from url
        const monthQuery = date.format('YYYY-MM'); // set month query url-param
        const dateQuery = date.format('YYYY-MM-DD'); // set date query url-param
        this.props.history.push(`/${public_id}/${eventLink}?month=${monthQuery}&date=${dateQuery}`); // onChange set url
    };

    // method: disables days
    handleDisableDates = (date) => {
        const days = disableDays(this.state.availability);
        const dateFound = days.find((dayStr) => {
            return date.format('YYYY-MM-DD') === dayStr;
        });
        return dateFound;
    };

    handleConfirmModal = (time, time24hr) => {
        this.setState((prevState) => {
            return {
                timeSlotSelected: time,
                timeSlotSelected24hr: time24hr,
                showConfirmModal: !prevState.showConfirmModal
            }
        });
    };

    handleConfirmation = () => {
        const { public_id, eventLink } = this.props.match.params;
        const dateSelectedParam = `${this.state.date.format('YYYY-MM-DD')}T${this.state.timeSlotSelected24hr}`;
        const monthQuery = this.state.date.format('YYYY-MM'); // set month query url-param
        const dateQuery = this.state.date.format('YYYY-MM-DD'); // set date query url-param
        this.props.history.push(`/${public_id}/${eventLink}/${dateSelectedParam}?month=${monthQuery}&date=${dateQuery}`); // redirect to confirmation page
    };
    
    render(){
        return (
            <Box className="calendarPage">
                <Box boxShadow={3} className="calendarPage__container">
                <div className="ribbon ribbon-top-right"><span>Powered By<br/>CalendApp</span></div>
                    <Box className="calendarPage__event">
                        <Button className="calendarPage__event--btn"><ArrowBackIcon /></Button>
                        <Typography variant="body1" className="calendarPage__event--username">Gerardo P.</Typography>
                        <Typography variant="h5" className="calendarPage__event--eventname">15min Meeting</Typography>
                        <Typography variant="body2" className="calendarPage__event--duration"><ScheduleIcon />&nbsp;15min</Typography>
                        <Typography variant="body2" className="calendarPage__event--location"><LocationOnIcon />&nbsp;Los Angeles</Typography>
                    </Box>
                    <Box className="calendarPage__datepicker">
                        <Box className="calendarPage__datepicker--header">
                            <Typography className="calendarPage__datepicker--header--title" variant="h6">Select a Date & Time</Typography>
                        </Box>
                        <Box className="calendarPage__datepicker--calendar">
                        <DatePicker
                            autoOk
                            disableToolbar
                            variant="static"
                            openTo="date"
                            value={this.state.date}
                            onChange={this.handleDateChange}
                            orientation="landscape"
                            disablePast
                            shouldDisableDate={this.handleDisableDates}
                            
                        />
                            <Box className="calendarPage__timeslots">
                                <Typography variant="h6" className="calendarPage__timeslots--title">{moment(this.state.date).format('dddd, MMMM Do')}</Typography>
                                <Box className="calendarPage__timeslots--list">
                                    {
                                        this.state.timeslots.length > 0 
                                        ? this.state.timeslots.map((timeslot, index) => (<TimeSlotItem handleTimeSlotSelected={this.handleTimeSlotSelected} handleConfirmModal={this.handleConfirmModal} key={index} {...timeslot}/>))
                                        : <p className="calendarPage__timeslots--msg">Select a day to get started</p>
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                { this.state.showConfirmModal 
                    ? <ConfirmModal 
                        timeSlotSelected={this.state.timeSlotSelected} 
                        handleConfirmModal={this.handleConfirmModal}
                        handleConfirmation={this.handleConfirmation}
                        /> : null }
            </Box>
        )
    }
}

export default CalendarPage;

