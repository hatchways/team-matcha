// importing modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import Header from '../../components/Header/Header';

class EventCreationPage extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <Box className="eventCreation">
                <Header />
                <Box className="eventCreation__header">
                    <Box className="eventCreation__header--container">
                        <Button className="eventCreation__header--btn" onClick={() => this.props.history.goBack()}>Back</Button>
                        <Typography className="eventCreation__header--btn">Create New Event Type</Typography>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default withRouter(EventCreationPage);