// importing modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
// importing components
import Header from '../../../components/Header/Header';
import FormSubmitControls from './FormSubmitControls/FormSubmitControls';
import EventTypeHeader from '../EventTypeHeader/EventTypeHeader';
import RadioColorList from './RadioColorList/RadioColorList';

class SoloEventPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            eventColor: '',
            eventName: '',
            eventDescription: '',
            eventLink: ''
        }
    }

    // method: gets the users text-input & dropwDown selection values
    handleUserInput = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    };

    render(){
        return (
            <Box className="soloEvent">
                <Header />
                <EventTypeHeader text="Add One-on-One Event Type"/>
                <Box className="soloEvent__container">
                    <form className="soloEvent__form">
                        {/*form header*/}
                        <FormSubmitControls isFormHeader={true}/>

                        {/*form fields*/}
                        <Box className="soloEvent__form--input">
                            <Typography className="soloEvent__form--input--label" variant="h6">Event name *</Typography>
                            <input 
                                onChange={this.handleUserInput} name="eventName" 
                                className="soloEvent__form--input--name" 
                                autoComplete="off"
                                required/>
                        </Box>

                        <Box className="soloEvent__form--input">
                            <Typography className="soloEvent__form--input--label" variant="h6">Location</Typography>
                            <Box className="soloEvent__form--location">
                                <Typography className="soloEvent__form--location--title" variant="body1">Add a location</Typography>
                                {/*add location drop down here*/}
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
                            <Box className="soloEvent__form--input--link--wrap">
                                <Typography className="soloEvent__form--input--label--link" variant="h6">calendapp.com/gerardparedes23/</Typography>
                                <input onChange={this.handleUserInput} name="eventLink"
                                    className="soloEvent__form--input--link" 
                                    autoComplete="off"
                                    required/>
                            </Box>
                        </Box>

                        <Box className="soloEvent__form--input">
                            <RadioColorList 
                            eventColor={this.state.eventColor}
                            handleUserInput={this.handleUserInput}
                            />
                        </Box>

                        <FormSubmitControls isFormHeader={false}/>
                    </form>
                </Box>
            </Box>
        );
    };
};

export default withRouter(SoloEventPage);