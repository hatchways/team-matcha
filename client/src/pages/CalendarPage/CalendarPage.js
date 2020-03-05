import React, { Component } from 'react';
import momentTZ from "moment-timezone";
import { Box } from '@material-ui/core';
import { disableDays } from '../../Utils/dates-func';
// importing components
import CalendarEventMobile from './CalendarEvent/CalendarEventMobile';
import CalendarEvent from './CalendarEvent/CalendarEvent';
import Calendar from './Calendar/Calendar';
import ConfirmModal from './ConfirmModal/ConfirmModal';
import TimeSlotMobileList from './TimeSlotMobileList/TimeSlotMobileList';
import LoadingPage from '../../components/LoadingPage/LoadingPage';

class CalendarPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: momentTZ().add(1, 'd'),
            dateSelectedFormatted: '',
            maxdate: momentTZ().add(90, 'd'),
            mindate: momentTZ().add(1, 'd'),
            availability: {},
            timezoneName: momentTZ.tz.guess(true),
            timezonesArr: momentTZ.tz.names(),
            timeslots: [],
            timeSlotSelected: '',
            timeSlotSelected24hr: '',
            showConfirmModal: false,
            showTimeSlotSlider: false,
            event: {
                owner: '',
                name: '',
                duration: '',
                location: ''
            },
            isLoading: true
        }
    }

    componentWillMount(){
        this.handleFetchCalendar(this.state.timezoneName);
        this.handleFetchEvent();
    }

    

    handleFetchEvent = () => {
        const { public_id, eventLink } = this.props.match.params; // get params from url
        fetch(`/users/${public_id}/events/${eventLink}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            })
            .then(data => data.json())
            .then((eventData) => {
                this.setState({
                    event: {
                        ...this.state.event, 
                            owner: public_id,
                            name: eventData.name,
                            duration: eventData.duration,
                            location: eventData.location.length > 0 ? eventData.location : 'N/A'
                    }
                })
            })
            .catch(err => (err));
    }

    handleFetchCalendar = (timezone) => {
        const { public_id, eventLink } = this.props.match.params; // get params from url
        fetch(`/users/${public_id}/events/${eventLink}/calendar?timezone=${timezone}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            })
            .then(data => data.json())
            .then((calendarData) => {
                const firstDate = Object.keys(calendarData).find(a => calendarData[a].length > 0);
                this.setState({ 
                    availability: calendarData, 
                    isLoading: false, timeslots: 
                    calendarData[momentTZ(firstDate).format('YYYY-MM-DD')] 
                });
            })
            .catch(err => (err));
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

    // method: handles date change and time-slots to render
    handleMobileDateChange = (date) => {
        this.setState((prevState) => {
            return {
                date: date, 
                timeslots: this.state.availability[date.format('YYYY-MM-DD')],
                showTimeSlotSlider: !prevState.showTimeSlotSlider
            }
        }, () => console.log(this.state));
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

    handleConfirmModal = (time, time24hr, dateFormatted) => {
        this.setState((prevState) => {
            return {
                timeSlotSelected: time,
                timeSlotSelected24hr: time24hr,
                showConfirmModal: !prevState.showConfirmModal,
                dateSelectedFormatted: dateFormatted
            }
        });
    };

    handleConfirmation = () => {
        const { public_id, eventLink } = this.props.match.params;
        const monthQuery = momentTZ(this.state.dateSelectedFormatted).format('YYYY-MM'); // set month query url-param
        const dateQuery = momentTZ(this.state.dateSelectedFormatted).format('YYYY-MM-DD'); // set date query url-param
        this.props.history.push(`/${public_id}/${eventLink}/${this.state.dateSelectedFormatted}?month=${monthQuery}&date=${dateQuery}`); // redirect to confirmation page
    };

    // method: gets the users text-input & dropwDown selection values
    handleUserInput = e => {
        const { value, name } = e.target;
        this.setState((prevState) => {
            return {
                isLoading: !prevState.isLoading,
                [name]: value
            }
        });
        this.handleFetchCalendar(value); // fetches calendar on timeZone change
    };

    handleCloseSlider = () => (this.setState({ showTimeSlotSlider: false }));
    
    render(){
        return (
            <React.Fragment>
            { this.state.isLoading === true ? <LoadingPage /> :
            <Box className="calendarPage">
                <Box boxShadow={3} className="calendarPage__container">
                {/*slider start*/}
                { this.state.showTimeSlotSlider ?
                    <Box className="calendarPage__slider">
                        <CalendarEventMobile 
                            timezoneName={this.state.timezoneName}
                            timezonesArr={this.state.timezonesArr}
                            handleUserInput={this.handleUserInput}
                            handleCloseSlider={this.handleCloseSlider}
                            username={this.state.event.owner}
                            name={this.state.event.name}
                            duration={this.state.event.duration}
                            location={this.state.event.location}
                        />
                        <TimeSlotMobileList 
                            date={this.state.date} 
                            timeslots={this.state.timeslots} 
                            timezoneName={this.state.timezoneName} 
                            handleTimeSlotSelected={this.handleTimeSlotSelected} 
                            handleConfirmModal={this.handleConfirmModal}
                        />
                </Box> : null
                }
                {/*slider end*/}
                <div className="ribbon ribbon-top-right"><span>Powered By<br/>CalendApp</span></div>
                    <CalendarEvent
                        timezoneName={this.state.timezoneName}
                        timezonesArr={this.state.timezonesArr}
                        handleUserInput={this.handleUserInput}
                        username={this.state.event.owner}
                        name={this.state.event.name}
                        duration={this.state.event.duration}
                        location={this.state.event.location}
                    />
                    <Calendar 
                        date={this.state.date}
                        maxDate={this.state.maxdate}
                        minDate={this.state.mindate}
                        timeslots={this.state.timeslots}
                        timezoneName={this.state.timezoneName}
                        handleDisableDates={this.handleDisableDates}
                        handleDateChange={this.handleDateChange}
                        handleMobileDateChange={this.handleMobileDateChange}
                        handleConfirmModal={this.handleConfirmModal}
                        handleTimeSlotSelected={this.handleTimeSlotSelected}
                    />
                </Box>
                { this.state.showConfirmModal 
                    ? <ConfirmModal 
                        timeSlotSelected={this.state.timeSlotSelected} 
                        handleConfirmModal={this.handleConfirmModal}
                        handleConfirmation={this.handleConfirmation}
                        username={this.state.event.owner}
                        name={this.state.event.name}
                        duration={this.state.event.duration}
                        location={this.state.event.location}
                        /> : null }
            </Box>
            }
            </React.Fragment>
        )
    }
}

export default CalendarPage;

