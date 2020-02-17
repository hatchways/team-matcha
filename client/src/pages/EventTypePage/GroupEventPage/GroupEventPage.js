// importing modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Box } from '@material-ui/core';
// importing components
import Header from '../../../components/Header/Header';
import EventTypeHeader from '../EventTypeHeader/EventTypeHeader';

class GroupEventPage extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return (
            <Box>
                <Header />
                <EventTypeHeader text="Add Group Event Type"/>
            </Box>
        );
    };
};

export default withRouter(GroupEventPage);