import React, { Component } from 'react';
import momentTZ from "moment-timezone";
import { Box, Button, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EventIcon from '@material-ui/icons/Event';
import { emailIsValid } from '../../Utils/validate';

class ConfirmationPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            emailError: '',
            name: '',
            nameError: '',
            comment: '',
            event: {
                owner: '',
                name: '',
                duration: '',
                location: ''
            },
            apptStart: '',
            apptEnd: ''
        }
    }

    componentDidMount(){
        this.handleFetchEvent();
    }

    handleFetchEvent = () => {
        const { public_id, eventLink, date } = this.props.match.params; // get params from url
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
                    },
                    apptStart: momentTZ(`${date}`).utcOffset(date).format('hh:mma'),
                    apptEnd: momentTZ(`${date}`).utcOffset(date).add(eventData.duration,'m').format('hh:mma'),
                })
            })
            .catch(err => (err));
    }

    handleConfirmedApt = () => {
        const { public_id, eventLink, date } = this.props.match.params; // get params from url
        fetch(`/users/${public_id}/events/${eventLink}/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
            ,body: JSON.stringify({
                    start: date,
                    comments: this.state.comment,
                    participants: {
                        name: this.state.name,
                        email: this.state.email
                    }
            })
            })
            .then(data => data.json())
            .then((calendarData) => {
                this.setState({ availability: calendarData });
            })
            .catch(err => (err));
    }

    validate = () => {
        let isError = false;
        const errors = {
            emailError: "",
            nameError: ""
        };

        if (this.state.name.length === 0) {
            isError = true;
            errors.nameError = "Name cannot be empty.";
        }

        if(this.state.name.length > 0 && this.state.name.length < 5) {
            isError = true;
            errors.nameError = "Name must be atleast 5 characters long.";
        }

        if (this.state.email.length === 0) {
            isError = true;
            errors.emailError = "Email cannot be empty.";
        }
        
        if (!(emailIsValid(this.state.email) && this.state.email.length > 0)) {
            isError = true;
            errors.emailError = "Email is not valid"
        }

        this.setState({ ...this.state, ...errors});

        return isError;
    };

    //method: handles solo-event creation/submit
    handleFormSubmit = (e) => {
        e.preventDefault();
        const { public_id, eventLink, date } = this.props.match.params; // get params from url
        const err = this.validate(); // validate user input
        if(!err) {
        fetch(`/users/${public_id}/events/${eventLink}/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
            ,body: JSON.stringify({
                    start: date,
                    comments: this.state.comment,
                    participant: {
                        name: this.state.name,
                        email: this.state.email
                    }
            })
            })
            .then(data => data.json())
            .then((calendarData) => {
                this.setState({ availability: calendarData });
                this.props.history.push(`/${public_id}/${eventLink}/invitees/${date}`);
            })
            .catch(err => (err));
            
        }
    }

    // method: gets the users text-input & dropwDown selection values
    handleUserInput = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };

    render(){
        const userEventScheduleFor = momentTZ(`${this.props.match.params.date}`).utcOffset(this.props.match.params.date).format('dddd, MMMM Do, YYYY Z'); // formats invitee meeting (local-time)
        // const eventScheduledFor = momentTZ(this.props.match.params.date).format('hh:mma dddd MMMM Do YYYY Z'); // formats owner-original meeting (local-time)
        // console.log(eventScheduledFor);
        // console.log(userEventScheduleFor);
        return (
            <Box className="confirmationPage">
                <Box boxShadow={3} className="confirmationPage__container">
                    <div className="ribbon ribbon-top-right"><span>Powered By<br/>CalendApp</span></div>
                    <Box className="confirmationPage__event">
                        <Button onClick={() => this.props.history.goBack()} className="confirmationPage__event--btn"><ArrowBackIcon /></Button>
                        <Typography variant="body1" className="confirmationPage__event--username">{this.state.event.owner}</Typography>
                        <Typography variant="h5" className="confirmationPage__event--eventname">{this.state.event.name}</Typography>
                        <Typography variant="body2" className="confirmationPage__event--duration"><ScheduleIcon />&nbsp;{this.state.event.duration}min</Typography>
                        <Typography variant="body2" className="confirmationPage__event--location"><LocationOnIcon />&nbsp;{this.state.event.location}</Typography>
                        <Typography variant="body2" className="confirmationPage__event--date"><EventIcon/>&nbsp;{this.state.apptStart} - {this.state.apptEnd}, {userEventScheduleFor}</Typography>
                    </Box>
                    <form onSubmit={this.handleFormSubmit} className="confirmationPage__form">
                        <Box className="confirmationPage__form--header">Enter Details</Box>
                        <Box className="confirmationPage__form--input">
                            <Typography className="confirmationPage__form--input--label" variant="h6">Name *</Typography>
                            <input 
                                onChange={this.handleUserInput} name="name" 
                                className="confirmationPage__form--input--name" 
                                autoComplete="off"
                                />
                            <p className="confirmationPage__error">{this.state.nameError}</p>
                        </Box>
                        <Box className="confirmationPage__form--input">
                            <Typography className="confirmationPage__form--input--label" variant="h6">Email *</Typography>
                            <input 
                                onChange={this.handleUserInput} name="email" 
                                className="confirmationPage__form--input--name" 
                                autoComplete="off"
                                />
                            <p className="confirmationPage__error">{this.state.emailError}</p>
                        </Box>
                        <Box className="confirmationPage__form--input">
                            <Typography className="confirmationPage__form--input--label" variant="h6">Please share anything that will help prepare for our meeting.</Typography>
                            <textarea 
                                onChange={this.handleUserInput}
                                name="comment"
                                rows="10" cols="50"
                                placeholder="" 
                                className="confirmationPage__form--input--textarea">
                            </textarea>
                        </Box>
                        <Button type="submit" className="confirmationPage__form--submit">Schedule Event</Button>
                    </form>
                </Box>
            </Box>
        )
    }
}

export default ConfirmationPage;