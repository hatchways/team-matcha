import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';

const UpcomingScheduleItemDropdown = ({ eventInviteeEmail, eventOriginallyScheduled, eventInviteeTimezone }) => (
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
);

export default UpcomingScheduleItemDropdown;