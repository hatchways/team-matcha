// importing modules
// import React, { useState } from 'react';
import React from 'react';
import { Box, Typography } from '@material-ui/core';
// import moment from 'moment';
// importing components
import ScheduleNav from '../ScheduleNav/ScheduleNav';
import NoScheduledItems from '../NoScheduledItems/NoScheduledItems';
import PastScheduleItem from '../PastSchedule/PastScheduleItem/PastScheduleItem';

const PastSchedule = () => {
    // const [pastSchedule, setSchedule] = useState([]);
    const pastSchedule = [];
    const pastScheduleCount = pastSchedule.length > 0 ? pastSchedule.length : 0;

    // should fetch appointments
    // should filter appointments based
    // on past dates

    return (
        <Box className="pastSchedule">
            <Box className="pastSchedule__header">
                <Typography variant="body1" className="pastSchedule__header--text">
                    Displaying {pastScheduleCount} of {pastScheduleCount} Events
                </Typography>
            </Box>
            <Box className="pastSchedule__content">
                <ScheduleNav />
                <Box className="pastSchedule__list">
                    {
                        pastSchedule.length > 0 
                            ? pastSchedule.map((pastEvent, index) => <PastScheduleItem key={index} {...pastEvent} />)
                            : <NoScheduledItems text="No Past Events"/>
                    }
                </Box>
            </Box>
        </Box>
    )
};

export default PastSchedule;