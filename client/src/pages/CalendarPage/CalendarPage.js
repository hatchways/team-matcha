import React, { Component } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { DatePicker } from "@material-ui/pickers";
import { disableDays } from '../../Utils/dates-func';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import moment from 'moment';

class CalendarPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            availability: {},
            timeslots: []
        }
    }

    componentDidMount(){
        const availability = {
            "2020-02-25": [{"hour": 0, "minute": 0},
                           {"hour": 0, "minute": 30},
                           {"hour": 1, "minute": 0},
                           {"hour": 1, "minute": 30},
                           {"hour": 3, "minute": 0}],
            "2020-02-26": [],
            "2020-02-27": [{"hour": 0, "minute": 0},
                           {"hour": 0, "minute": 30},
                           {"hour": 2, "minute": 0},
                           {"hour": 2, "minute": 30},
                           {"hour": 3, "minute": 0}],
            "2020-02-28": [],
            "2020-02-29": []
        }
        // fetch event availability from server
        this.setState({ availability });
        console.log('dynamic url params', this.props.match.params);
    }

    // ! handles date change and time-slots to render
    handleDateChange = (date) => {
        this.setState({   
            date: date, 
            timeslots: this.state.availability[date.format('YYYY-MM-DD')] 
            }, () => console.log(this.state)
        );
    };

    // ! disables days
    handleDisableDates = (date) => {
        const days = disableDays(this.state.availability);
        const dateFound = days.find((dayStr) => {
            return date.format('YYYY-MM-DD') === dayStr;
        });
        return dateFound;
    };
    
    render(){
        return (
            <Box className="calendarPage">
                <Box boxShadow={3} className="calendarPage__container">
                    {/*event information*/}
                    <Box className="calendarPage__event">
                        <Button className="calendarPage__event--btn"><ArrowBackIcon /></Button>
                        <Typography variant="body1" className="calendarPage__event--username">Gerardo P.</Typography>
                        <Typography variant="h5" className="calendarPage__event--eventname">15min Meeting</Typography>
                        <Typography variant="body2" className="calendarPage__event--duration"><ScheduleIcon />&nbsp;15min</Typography>
                        <Typography variant="body2" className="calendarPage__event--location"><LocationOnIcon />&nbsp;Los Angeles</Typography>
                    </Box>
                    {/*calendar section with s*/}
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
                            disablePast
                            shouldDisableDate={this.handleDisableDates}
                            className=""
                        />
                            <Box className="calendarPage__timeslots">
                                <Typography variant="h6" className="calendarPage__timeslots--title">{moment().format('dddd, MMMM do')}</Typography>
                                <Box className="calendarPage__timeslots--list">
                                    {
                                        // testing timeslots render
                                        this.state.timeslots.length > 0 
                                        ? this.state.timeslots.map((timeslot, index) => (<TimeSlotsItem key={index} {...timeslot}/>))
                                        : <p className="calendarPage__timeslots--btn">No days selected</p>
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default CalendarPage;

const TimeSlotsItem = ({ hour, minute }) => {
    const hourFormatted = moment((hour).toString(),'HH').format('HH');
    const formattedTimeSlot = moment(`${hourFormatted}:${minute}`, 'HH:mm').format('h:mm a');
    console.log('formatted time slot', formattedTimeSlot);
    return (
        <React.Fragment>
            <Button className="calendarPage__timeslots--btn">{formattedTimeSlot}</Button>
        </React.Fragment>
    )
}