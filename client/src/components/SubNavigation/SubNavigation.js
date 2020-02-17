// importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';

const SubNavigation = ({ isActive }) => (
    <Box
        className="subNavigation"
    >
        <Box className="subNavigation__container">
            <Typography variant="h4" className="subNavigation__title">
                My CalendApp
            </Typography>
            <nav className="subNavigation__nav">
                <NavLink 
                    className="subNavigation__nav--link" 
                    activeClassName="subNavigation__nav--link--isActive"
                    to="/events"
                >EVENT TYPES
                </NavLink>
                <NavLink 
                    className="subNavigation__nav--link subNavigation__nav--link--right" 
                    activeClassName="subNavigation__nav--link--isActive"
                    style={isActive ? { color: '#ef6c00', borderBottom: 'solid 5px #ef6c00' } : null}
                    to="/schedule/upcoming"
                >SCHEDULED EVENTS
                </NavLink>
            </nav>
        </Box>
    </Box>
);

export default SubNavigation;