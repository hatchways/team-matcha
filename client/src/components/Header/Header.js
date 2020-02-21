//importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';

const Header = ({ isActive, profileImageUrl }) => (
    <Box boxShadow={3} className="header">
        <Box className="header__container">
            <Typography 
                className="header__logo"
                variant="h4">
                calend
                <span className="header__logo--span">app</span>
            </Typography>
            <nav className="header__nav">
                <NavLink 
                    activeClassName="header__nav--link--isActive"
                    className="header__nav--link" 
                    to="/events"
                    style={isActive ? { fontWeight: 'bold' } : null}
                >Home
                </NavLink>
                <NavLink 
                    activeClassName="header__nav--link--isActive"
                    className="header__nav--link" 
                    to="/integration"
                >Integration
                </NavLink>
                <NavLink 
                    activeClassName="header__nav--link--isActive"
                    className="header__nav--link " 
                    to="/upgrade"
                >Upgrade Account
                </NavLink>
                <Box className="header__nav--profile">
                    <img 
                        className="header__nav--profile--img"
                        src={profileImageUrl} 
                        alt="user img" 
                    />
                    <Typography 
                        className="header__nav--profile--name"
                        variant="body1">
                        John Doe
                    </Typography>
                </Box>
            </nav>
        </Box>
    </Box>
);

export default Header;
