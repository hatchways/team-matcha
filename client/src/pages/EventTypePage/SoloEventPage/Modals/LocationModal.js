// importing modules
import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const LocationModal = ({ handleLocationUpdate, handleLocationModal, handleUserInput }) => (
    <Box className="locationModal">
        <Box boxShadow={3} className="locationModal__window">
            <Box className="locationModal__window--header">
                Edit Location
            </Box>
            <Box className="locationModal__window--col">
                <Box className="locationModal__window--col--selected">
                    <LocationOnIcon className="soloEvent__form--location--settings--dropdown--icon"/>
                    <Typography variant="body2">
                        In-person meeting
                    </Typography>
                </Box>
                <input 
                    onChange={handleUserInput}
                    name="eventLocation" 
                    className="locationModal__window--col--input" 
                    autoComplete="off"/>
            </Box>
            <Box className="locationModal__window--footer">
                <Button 
                    onClick={handleLocationUpdate}
                    className="locationModal__window--btn locationModal__window--btn--update"
                >Update</Button>
                <Button 
                    onClick={handleLocationModal}
                    className="locationModal__window--btn locationModal__window--btn--cancel"
                >Cancel</Button>
            </Box>
        </Box>
    </Box>
);

export default LocationModal;