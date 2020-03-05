import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
// importing components
import ScheduleNav from '../ScheduleNav/ScheduleNav';
import NoScheduledItems from '../NoScheduledItems/NoScheduledItems';
import UpcomingScheduleItem from '../UpcomingSchedule/UpcomingScheduleItem/UpcomingScheduleItem';
import SpinnerLarge from '../../../components/Spinners/SpinnerLarge';

const UpcomingSchedule = (props) => {
    const [upcomingSchedule, setSchedule] = useState([]);
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`/users/${props.userId}/appointments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-access-token': props.token
            }
        })
        .then(data => data.json())
        .then((apptData) => {
            setSchedule(apptData);
            setIsLoading(false);
        })
        .catch(err => (err));
    }, []);

        const upcomingScheduleCount = upcomingSchedule.length > 0 ? upcomingSchedule.length : 0;
        return (
            <Box className="upcomingSchedule">
                <Box className="upcomingSchedule__header">
                    <Typography variant="body1" className="upcomingSchedule__header--text">
                        Displaying {upcomingScheduleCount} of {upcomingScheduleCount} Events
                    </Typography>
                </Box>
                <Box>
                    <ScheduleNav />
                    { loading ? <SpinnerLarge /> :
                        <Box className="upcomingSchedule__list">
                            {
                                upcomingSchedule.length > 0 
                                    ? upcomingSchedule.map((upcomingEvent, index) => <UpcomingScheduleItem key={index} {...upcomingEvent} />)
                                    : <NoScheduledItems text="No Upcoming Events"/>
                            }
                        </Box>
                    }
                </Box>
            </Box>
        );
}

export default UpcomingSchedule;
