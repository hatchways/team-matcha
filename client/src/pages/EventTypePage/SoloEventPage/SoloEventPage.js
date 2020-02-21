// importing modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Box } from '@material-ui/core';
// importing components
import Header from '../../../components/Header/Header';
import FormSubmitControls from './FormSubmitControls/FormSubmitControls';
import EventTypeHeader from '../EventTypeHeader/EventTypeHeader';
import EventNameInput from './EventNameInput/EventNameInput';
import EventLinkInput from './EventLinkInput/EventLinkInput';
import EventLocationDropdown from './EventLocationDropdown/EventLocationDropdown';
import EventTextArea from './EventTextArea/EventTextArea';
import RadioColorList from './RadioColorList/RadioColorList';
import RadioDurationList from './RadioDurationList/RadioDurationList';
import EventDaysAvlCheckBox from './EventDaysAvlCheckBox/EventDaysAvlCheckBox';
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
            showLocationModal: false,
            showPhoneCallModal: false,
            daysAvl: {
                sunday: false,
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: false
            },
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

        this.setState({ ...this.state, ...errors});

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
        const err = this.validate(); // validate user input
        if(!err) {
            if(this.state.eventLocation === 'phone call: (Invitee should call me)') {
                eventDesignatedLocation = `${this.state.eventLocation} ${this.state.phone}`;
            }
            fetch(`/users/${this.props.userId}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-access-token': this.props.token
                },
                body: JSON.stringify({
                name: this.state.eventName,
                location: (eventDesignatedLocation.length > 0 ? eventDesignatedLocation : this.state.eventLocation),
                description: this.state.eventDescription.trim(),
                duration: parseInt(this.state.eventDuration),
                url: this.state.eventLink.replace(/\s+/g, '-').toLowerCase(),
                color: this.state.eventColor,
                availability: {
                start: 0,
                end: 0,
                days: {
                    ...this.state.daysAvl
                }
            }
            })
            })
            .then(data => data.json())
            .then((data) => {
                this.props.history.push('/events');
            })
            .catch(err => (err));
        }
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

    // method: gets the users checkbox values
    handleCheckbox = (e) => {
        const { name } = e.target;
        
        this.setState((prevState) => {
            return {
                daysAvl: {
                    ...this.state.daysAvl,
                    [name]: !prevState.daysAvl[name]
                } 
            }
        });
    };

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
                        <EventNameInput
                            handleUserInput={this.handleUserInput}
                            eventNameError={this.state.eventNameError}
                        />
                        <EventLocationDropdown 
                            handleDropdown={this.handleDropdown}
                            handleLocationModal={this.handleLocationModal}
                            handlePhoneCallModal={this.handlePhoneCallModal}
                            locationDropDownField={this.state.locationDropDownField}
                        />
                        <EventTextArea 
                            handleUserInput={this.handleUserInput}
                        />
                        <EventLinkInput 
                            handleUserInput={this.handleUserInput}
                            eventLinkError={this.state.eventLinkError}
                        />
                        <RadioDurationList 
                            handleUserInput={this.handleUserInput}
                            eventDuration={this.state.eventDuration}
                        />
                        <EventDaysAvlCheckBox
                            handleCheckbox={this.handleCheckbox}
                            daysAvl={this.state.daysAvl}
                        />
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
