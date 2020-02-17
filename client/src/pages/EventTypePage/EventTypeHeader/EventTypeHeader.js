// importing modules
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const EventTypeHeader = (props) => (
    <Box className="eventType__header--container">
        <Box className="eventType__header">
            <Button className="eventType__header--btn" onClick={() => props.history.goBack()}>
            <ArrowBackIosIcon className="eventType__header--icon"/>
            Back
            </Button>
            <Typography variant="h5" className="eventType__header--text">{props.text}</Typography>
        </Box>
    </Box>
);

export default withRouter(EventTypeHeader);