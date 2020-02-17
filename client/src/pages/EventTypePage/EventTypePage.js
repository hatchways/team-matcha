// importing modules
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import Header from '../../components/Header/Header';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import GroupIcon from '@material-ui/icons/Group';

const EventTypePage = (props) => (
    <Box className="eventType">
        <Header />
        <Box className="eventType__header--container">
            <Box className="eventType__header">
                <Button className="eventType__header--btn" onClick={() => props.history.goBack()}>
                <ArrowBackIosIcon className="eventType__header--icon"/>
                Back
                </Button>
                <Typography variant="h5" className="eventType__header--text">Create New Event Type</Typography>
            </Box>
        </Box>
        <Box className="eventType__types">
            <Box className="eventType__types--col">
                <AccountCircleIcon className="eventType__types--icon"/>
                <Typography variant="body1" className="eventType__types--text">
                    One-on-One<br />
                    <span className="eventType__types--text--span">Allow invitees to schedule individual slots with you.</span>
                </Typography>
            </Box>
            <Box className="eventType__types--col">
                <Button onClick={() => props.history.push('/events/one-on-one')} className="eventType__types--btn">
                    Create
                    <NavigateNextIcon  className="eventType__types--btn--icon"/>
                </Button>
            </Box>
        </Box>
        <Box className="eventType__types">
            <Box className="eventType__types--col">
                <GroupIcon className="eventType__types--icon"/>
                <Typography variant="body1" className="eventType__types--text">
                    Group<br />
                    <span className="eventType__types--text--span">Allow multiple invitees to schedule the same slot. Useful for tours, webinars, classes, workshops, etc.</span>
                </Typography>
            </Box>
            <Box className="eventType__types--col">
                <Button onClick={() => props.history.push('/events/group')} className="eventType__types--btn">
                    Create
                    <NavigateNextIcon className="eventType__types--btn--icon"/>
                </Button>
            </Box>
        </Box>
    </Box>
)

export default withRouter(EventTypePage);