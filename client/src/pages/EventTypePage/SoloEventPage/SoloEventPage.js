// importing modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Box, MenuList, MenuItem, Paper, Radio, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
// importing components
import Header from '../../../components/Header/Header';
import FormSubmitControls from './FormSubmitControls/FormSubmitControls';
import EventTypeHeader from '../EventTypeHeader/EventTypeHeader';
import RadioColorList from './RadioColorList/RadioColorList';
import PhoneCallModal from './Modals/PhoneCallModal';
import LocationModal from './Modals/LocationModal';

class SoloEventPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            eventColor: '#3d5afe',
            eventDescription: '',
            eventDuration: "60",
            eventLink: '',
            eventLinkError: '',
            eventLocation: '',
            eventName: '',
            phone: '',
            eventNameError: '',
            locationDropDownField: 'Add a location',
            active: false,
            showLocationModal: false,
            showPhoneCallModal: false
        }
    }

    validate = () => {
        let isError = false;
        const errors = {
            eventNameError: "",
            eventLinkError: "",
        };

        if (this.state.eventName.length === 0) {
            isError = true;
            errors.eventNameError = "Event name cannot be empty";
        }

        if(this.state.eventName.length > 0 && this.state.eventName.length < 5) {
            isError = true;
            errors.eventNameError = "Event name must be atleast 5 characters long";
        }

        if (this.state.eventLink.length === 0) {
            isError = true;
            errors.eventLinkError = "Event link cannot be empty ";
        }

        if(this.state.eventLink.length > 0 && this.state.eventLink.length < 5) {
            isError = true;
            errors.eventLinkError = "Event link must be atleast 5 characters long";
        }

        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    };

    // method: gets the users text-input & dropwDown selection values
    handleUserInput = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };

    //method: handles solo-event creation/submit
    handleFormSubmit = (e) => {
        e.preventDefault();
        let eventDesignatedLocation = '';
        // validate user input
        const err = this.validate();
        if(!err) {
            // send event to the server
            if(this.state.eventLocation === 'phone call: (Invitee should call me)') {
                eventDesignatedLocation = `${this.state.eventLocation} ${this.state.phone}`;
            }
            const event = {
                eventColor: this.state.eventColor,
                eventDescription: this.state.eventDescription,
                eventDuration: parseInt(this.state.eventDuration),
                eventLink: this.state.eventLink.replace(/\s+/g, '-').toLowerCase(),
                eventLocation: (eventDesignatedLocation.length > 0 ? eventDesignatedLocation : this.state.eventLocation),
                eventName: this.state.eventName,
            }
            console.log('event created!', event);
            this.props.history.push('/events');
        }
    }

    handleDropdown = () => {
        this.setState((prevState) => {
            return {
                active: !prevState.active
            }
        })
    }

    handleLocationModal = () => {
        this.setState((prevState) => {
            return {
                showLocationModal: !prevState.showLocationModal
            }
        });
    };
    handleLocationUpdate = () => (
        this.setState({ locationDropDownField: this.state.eventLocation, showLocationModal: false, showPhoneCallModal: false })
    );

    handlePhoneCallModal = () => {
        this.setState((prevState) => {
            return {
                showPhoneCallModal: !prevState.showPhoneCallModal
            }
        });
    };

    handlePhoneNumber = (e) => {
        this.setState({ phone: e });
    } 

    render(){
        return (
            <Box className="soloEvent">
                <Header />
                <EventTypeHeader text="Add One-on-One Event Type"/>
                <Box className="soloEvent__container">
                    <form onSubmit={this.handleFormSubmit} className="soloEvent__form">
                        {/*form header*/}
                        <FormSubmitControls isFormHeader={true}/>

                        {/*form fields*/}
                        <Box className="soloEvent__form--input">
                            <Typography className="soloEvent__form--input--label" variant="h6">Event name *</Typography>
                            <input 
                                onChange={this.handleUserInput} name="eventName" 
                                className="soloEvent__form--input--name" 
                                autoComplete="off"
                                />
                            <p className="soloEvent__error">{this.state.eventNameError}</p>
                        </Box>

                        <Box className="soloEvent__form--input">
                            <Typography className="soloEvent__form--input--label" variant="h6">Location</Typography>
                            <Box onClick={this.handleDropdown} className="soloEvent__form--location">
                                <Typography className="soloEvent__form--location--title" variant="body1">
                                    {this.state.locationDropDownField}
                                </Typography>
                                { this.state.active ? <ExpandLessIcon /> : <ExpandMoreIcon/> }
                                {/*add location drop down here*/}
                                {this.state.active 
                                ? <Paper className="soloEvent__form--location--settings--dropdown">
                                    <MenuList>
                                        <MenuItem onClick={this.handleLocationModal} className="soloEvent__form--location--settings--dropdown--item">
                                            <LocationOnIcon className="soloEvent__form--location--settings--dropdown--icon"/>
                                            <Box>
                                                <Typography variant="body2">In-person meeting</Typography>
                                                <span className="soloEvent__form--location--settings--dropdown--span">set an address or place</span>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem onClick={this.handlePhoneCallModal} className="soloEvent__form--location--settings--dropdown--item">
                                            <CallIcon className="soloEvent__form--location--settings--dropdown--icon"/>
                                            <Box>
                                                <Typography variant="body2">Phone-call</Typography>
                                                <span className="soloEvent__form--location--settings--dropdown--span">Inbound or outbound calls</span>
                                            </Box>
                                        </MenuItem>
                                    </MenuList>
                                </Paper> : null }
                            </Box>
                        </Box>

                        <Box className="soloEvent__form--input">
                            <Typography className="soloEvent__form--input--label" variant="h6">Description/Instructions</Typography>
                            <textarea 
                                onChange={this.handleUserInput}
                                name="eventDescription"
                                rows="10" cols="50"
                                placeholder="Write a summary and any details your invitee should know about the event" 
                                className="soloEvent__form--input--textarea">
                            </textarea>
                        </Box>

                        <Box className="soloEvent__form--input">
                            <Typography className="soloEvent__form--input--label" variant="h6">Event Link *</Typography>
                            <Typography className="soloEvent__form--input--label--link" variant="h6">calendapp.com/john-doe/</Typography>
                            <Box className="soloEvent__form--input--link--wrap">
                                <input onChange={this.handleUserInput} name="eventLink"
                                    className="soloEvent__form--input--link" 
                                    autoComplete="off"
                                    />
                                <p className="soloEvent__error">{this.state.eventLinkError}</p>
                            </Box>
                        </Box>

                        <Box className="soloEvent__form--input">
                            <Typography className="soloEvent__form--input--label" variant="h6">Event Duration</Typography>
                            <Box className="soloEvent__form--duration">
                                <Box className="soloEvent__form--duration--time">
                                    <Typography variant="body2" className="soloEvent__form--duration--text">
                                        15<br/>
                                        <span className="soloEvent__form--duration--text--span">min</span>
                                    </Typography>
                                    <Radio
                                        onChange={this.handleUserInput}
                                        checked={this.state.eventDuration === "15"}
                                        name="eventDuration"
                                        className="soloEvent__form--duration--radio"
                                        value="15"
                                    />
                                </Box>
                                <Box className="soloEvent__form--duration--time">
                                    <Typography variant="body2" className="soloEvent__form--duration--text">
                                        30<br/>
                                        <span className="soloEvent__form--duration--text--span">min</span>
                                    </Typography>
                                    <Radio
                                        onChange={this.handleUserInput}
                                        checked={this.state.eventDuration === "30"}
                                        name="eventDuration"
                                        className="soloEvent__form--duration--radio"
                                        value="30"
                                    />
                                </Box>
                                <Box className="soloEvent__form--duration--time">
                                    <Typography variant="body2" className="soloEvent__form--duration--text">
                                        45<br/>
                                        <span className="soloEvent__form--duration--text--span">min</span>
                                    </Typography>
                                    <Radio
                                        onChange={this.handleUserInput}
                                        checked={this.state.eventDuration === "45"}
                                        name="eventDuration"
                                        className="soloEvent__form--duration--radio"
                                        value="45"
                                    />
                                </Box>
                                <Box className="soloEvent__form--duration--time">
                                    <Typography variant="body2" className="soloEvent__form--duration--text">
                                        60<br/>
                                        <span className="soloEvent__form--duration--text--span">min</span>
                                    </Typography>
                                    <Radio
                                        onChange={this.handleUserInput}
                                        checked={this.state.eventDuration === "60"}
                                        name="eventDuration"
                                        className="soloEvent__form--duration--radio"
                                        value="60"
                                    />
                                </Box>
                            </Box>
                        </Box>

                        <Box className="soloEvent__form--input soloEvent__form--radio">
                            <RadioColorList 
                            eventColor={this.state.eventColor}
                            handleUserInput={this.handleUserInput}
                            />
                        </Box>

                        <FormSubmitControls isFormHeader={false}/>
                    </form>
                </Box>
                {this.state.showLocationModal 
                    ? <LocationModal 
                    handleLocationUpdate={this.handleLocationUpdate}
                    handleLocationModal={this.handleLocationModal}
                    handleUserInput={this.handleUserInput}
                    /> : null}
                {this.state.showPhoneCallModal 
                    ? <PhoneCallModal 
                    eventPhone={this.state.phone}
                    eventLocation={this.state.eventLocation}
                    handleLocationUpdate={this.handleLocationUpdate}
                    handlePhoneCallModal={this.handlePhoneCallModal}
                    handleUserInput={this.handleUserInput}
                    handlePhoneNumber={this.handlePhoneNumber}
                    /> : null}
            </Box>
        );
    };
};

export default withRouter(SoloEventPage);
