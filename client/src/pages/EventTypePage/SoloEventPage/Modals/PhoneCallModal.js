// importing modules
import React from 'react';
import { Box, Button, Radio, Typography } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';

const PhoneCallModal = ({ handleLocationUpdate, handlePhoneCallModal, handleUserInput, eventLocation }) => (
    <Box className="phoneCallModal">
        <Box boxShadow={3} className="phoneCallModal__window">
            <Box className="phoneCallModal__window--header">
                Edit Location
            </Box>
            <Box className="phoneCallModal__window--col">
                <Box className="phoneCallModal__window--col--selected">
                    <CallIcon className="soloEvent__form--location--settings--dropdown--icon"/>
                    <Typography variant="body2">
                        Phone Call
                    </Typography>
                </Box>
                <Box className="phoneCallModal__window--radios">
                    <Box className="phoneCallModal__window--radio--wrap">
                        <Radio
                            onChange={handleUserInput}
                            checked={eventLocation === 'phone call: (I will call invitee)'}
                            name="eventLocation"
                            className="phoneCallModal__window--radio"
                            value="phone call: (I will call invitee)"
                        />
                        <Typography className="phoneCallModal__window--radio--label" variant="body2">
                            I will call my invitee<br/>
                            <span className="phoneCallModal__window--radio--label--span">Calendly will require your invitee’s phone number before scheduling.</span>
                        </Typography>
                    </Box>
                    <Box className="phoneCallModal__window--radio--wrap">
                        <Radio
                            onChange={handleUserInput}
                            checked={eventLocation === 'phone call: (Invitee should call me)'}
                            name="eventLocation"
                            className="phoneCallModal__window--radio"
                            value="phone call: (Invitee should call me)"
                        />
                        <Typography className="phoneCallModal__window--radio--label" variant="body2">
                            My invitee should call me<br/>
                            <span className="phoneCallModal__window--radio--label--span">Calendly will provide your number after the call has been scheduled.</span>
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box className="phoneCallModal__window--footer">
                <Button 
                    onClick={handleLocationUpdate}
                    className="phoneCallModal__window--btn phoneCallModal__window--btn--update"
                >Update</Button>
                <Button 
                    onClick={handlePhoneCallModal}
                    className="phoneCallModal__window--btn phoneCallModal__window--btn--cancel"
                >Cancel</Button>
            </Box>
        </Box>
    </Box>
);

export default PhoneCallModal;