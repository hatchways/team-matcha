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
import EventAvlTimeDropDown from './EventAvlTimeDropdown/EventAvlTimeDropdown';
import EventDaysAvlCheckBox from './EventDaysAvlCheckBox/EventDaysAvlCheckBox';
import PhoneCallModal from './Modals/PhoneCallModal';
import LocationModal from './Modals/LocationModal';
import { allFalse } from '../../../Utils/obj-func';


class SoloEventPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            eventColor: '#3d5afe',
            eventDescription: '',
            eventDuration: '60',
            eventDurationCustom: '',
            eventLink: '',
            eventLocation: '',
            eventName: '',
            eventStart: 10,
            eventEnd: 17,
            phone: '',
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
            userDetails: {},
            urlExists: false,
            eventNameError: '',
            eventLinkError: '',
            daysAvlError: '',
            eventTimeError: '',
            eventDurationCustomError: '',
            urlError: ''
        }
    }

    componentWillMount(){
        this.handleFetchUser();
    }

    handleFetchUser = () => {
        fetch(`/users/details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-access-token': this.props.token
            }
            })
            .then(data => data.json())
            .then((data) => {
                console.log('user details inside solo', data);
                this.setState({userDetails: {...data}}, console.log(this.state));
            })
            .catch(err => (err));
    }

    validate = () => {
        let isError = false;
        const errors = {
            eventNameError: "",
            eventLinkError: "",
            daysAvlError: "",
            eventTimeError: "",
            eventDurationCustomError: ""
        };

        if (this.state.eventName.length === 0) {
            isError = true;
            errors.eventNameError = "Event name cannot be empty.";
        }

        if(this.state.eventName.length > 0 && this.state.eventName.length < 5) {
            isError = true;
            errors.eventNameError = "Event name must be atleast 5 characters long.";
        }

        if (this.state.eventLink.length === 0) {
            isError = true;
            errors.eventLinkError = "Event link cannot be empty.";
        }

        if(this.state.eventLink.length > 0 && this.state.eventLink.length < 5) {
            isError = true;
            errors.eventLinkError = "Event link must be atleast 5 characters long.";
        }

        if (this.state.eventEnd < this.state.eventStart) {
            isError = true;
            errors.eventTimeError = "Event end time is before your start time";
        }

        if(allFalse(this.state.daysAvl)) {
            isError = true;
            errors.daysAvlError = "You must select atleast one day.";
        }

        if(this.state.urlExists) {
            isError = true;
            errors.eventLinkError = "Event url already exists, try another.";
        }

        if(this.state.eventDuration === 'custom' && (this.state.eventDurationCustom <= 15 ||  this.state.eventDurationCustom === '')) {
            isError = true;
            errors.eventDurationCustomError = "Event duration must be atleast 15.";
        }

        if(this.state.eventDuration === 'custom' && this.state.eventDurationCustom > 720) {
            isError = true;
            errors.eventDurationCustomError = "Must be less than 12 hours (720 minutes).";
        }

        this.setState({ ...this.state, ...errors});

        return isError;
    };

    // method: gets the users text-input & dropwDown selection values
    handleUserInput = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    };

    // method: validates if userUrl is unique
    handleEventUrlCheck = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value.replace(/\s+/g, '-').toLowerCase() }, () => console.log(this.state));

    fetch(`/users/${this.props.userId}/events`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "X-access-token": this.props.token
            }
        })
        .then(response => {
        return response.json();
        })
        .then(data => {
        const urlExists = data.find(
            event => event.url === this.state.eventLink
        );
        if (urlExists) {
            this.setState(prevState => {
            return {
                urlExists: !prevState.exists
            };
            });
        } else {
            this.setState({ urlExists: false });
        }
        });
    };

    //method: handles solo-event creation/submit
    handleFormSubmit = (e) => {
        e.preventDefault();
        let eventDesignatedLocation = '';
        let duration = 0;
        const err = this.validate(); // validate user input
        if(!err) {
            if(this.state.eventLocation === 'phone call: (Invitee should call me)') {
                eventDesignatedLocation = `${this.state.eventLocation} ${this.state.phone}`;
            }
            if(this.state.eventDuration === 'custom') {
                duration = this.state.eventDurationCustom;
            } else {
                duration = this.state.eventDuration;
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
                duration:  parseInt(duration),
                url: this.state.eventLink.replace(/\s+/g, '-').toLowerCase(),
                color: this.state.eventColor,
                availability: {
                start: this.state.eventStart,
                end: this.state.eventEnd,
                days: {
                    sunday: this.state.daysAvl.sunday,
                    monday: this.state.daysAvl.monday,
                    tuesday: this.state.daysAvl.tuesday,
                    wednesday: this.state.daysAvl.wednesday,
                    thursday: this.state.daysAvl.thursday,
                    friday: this.state.daysAvl.friday,
                    saturday: this.state.daysAvl.saturday
                }
            }
            })
            })
            .then(data => data.json())
            .then((data) => {
                this.setState({}, () => console.log('solo event created', this.state));
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
                        <FormSubmitControls btnText="Create" isFormHeader={true}/>
                        {/*form fields*/}
                        <EventNameInput
                            eventName={this.state.eventName}
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
                            eventDescription={this.state.eventDescription}
                            handleUserInput={this.handleUserInput}
                        />
                        <EventLinkInput 
                            eventLink={this.state.eventLink}
                            username={this.state.userDetails.public_id}
                            handleUserInput={this.handleEventUrlCheck}
                            eventLinkError={this.state.eventLinkError}
                        />
                        <RadioDurationList 
                            handleUserInput={this.handleUserInput}
                            eventDuration={this.state.eventDuration}
                            eventDurationCustom={this.state.eventDurationCustom}
                            eventDurationCustomError={this.state.eventDurationCustomError}
                        />
                        <EventAvlTimeDropDown 
                            eventTimeError={this.state.eventTimeError}
                            timeAvlStart={this.state.eventStart}
                            timeAvlEnd={this.state.eventEnd} 
                            handleUserInput={this.handleUserInput}
                        />
                        <EventDaysAvlCheckBox
                            handleCheckbox={this.handleCheckbox}
                            daysAvl={this.state.daysAvl}
                            daysAvlError={this.state.daysAvlError}
                        />
                        <Box className="soloEvent__form--input soloEvent__form--radio">
                            <RadioColorList 
                            eventColor={this.state.eventColor}
                            handleUserInput={this.handleUserInput}
                            />
                        </Box>
                        <FormSubmitControls btnText="Create" isFormHeader={false}/>
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
