import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box } from '@material-ui/core';

const ScheduleNav = () => (
    <Box className="scheduleNav">
        <NavLink 
            className="scheduleNav__link" 
            activeClassName="scheduleNav__link--isActive"
            to="/schedule/upcoming"
        >Upcoming</NavLink>
        <NavLink 
            className="scheduleNav__link" 
            activeClassName="scheduleNav__link--isActive"
            to="/schedule/past"
        >Past</NavLink>
    </Box>
);

export default ScheduleNav;