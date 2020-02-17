import React, { useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';

const UpcomingScheduleItem = ({ 
    eventDate, eventScheduledTime, eventColor,
    eventInvitee, eventInviteeEmail, eventName,
    eventInviteeTimezone, eventOriginallyScheduled }) => {
    const [active, setToggle] = useState(false);

    const toggle = () => {
        setToggle(!active);
    };

    return (
    <Box className="upcomingSchedule__item">
        <Box className="upcomingSchedule__item--date">
            <Typography variant="body1">
                {eventDate}
            </Typography>
        </Box>
        <Box className="upcomingSchedule__content">
            <Box className="upcomingSchedule__content--col1">
                <Box className="upcomingSchedule__content--color" style={{ backgroundColor: eventColor }}></Box>
                <Box className="upcomingSchedule__content--time">{ eventScheduledTime }</Box>
            </Box>
            <Box className="upcomingSchedule__content--col2">
                <Typography className="upcomingSchedule__content--text">
                    {eventInvitee}<br/>
                    <span className="upcomingSchedule__content--text--span">
                    Event type:&nbsp;
                    </span>
                    {eventName}
                </Typography>
            </Box>
            <button onClick={toggle} className="upcomingSchedule__content--btn">
                {active ? <span>&#9662;</span> : <span>&#9656;</span> } Details 
            </button>
        </Box>
        {
            active ? (
                <Box className="upcomingSchedule__dropdown">
                    <Box className="upcomingSchedule__dropdown--col1">
                        <Button className="upcomingSchedule__dropdown--btn">Reschedule</Button>
                        <br />
                        <Button className="upcomingSchedule__dropdown--btn">Cancel</Button>
                    </Box>
                    <Box className="upcomingSchedule__dropdown--col2">
                        <Box className="upcomingSchedule__dropdown--text--wrap">
                            <Typography className="upcomingSchedule__dropdown--text">
                                EMAIL<br />
                                <span className="upcomingSchedule__dropdown--text--span">{eventInviteeEmail}</span>
                            </Typography>
                        </Box>
                        <Box className="upcomingSchedule__dropdown--text--wrap">
                            <Typography className="upcomingSchedule__dropdown--text">
                                INVITEE TIME ZONE<br />
                                <span className="upcomingSchedule__dropdown--text--span">{eventInviteeTimezone}</span>
                            </Typography>
                        </Box>
                        <Box className="upcomingSchedule__dropdown--text--wrap">
                            <Typography className="upcomingSchedule__dropdown--text--italic">
                                created {eventOriginallyScheduled}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ) : null
        }
        
    </Box>
    );
};

export default UpcomingScheduleItem;