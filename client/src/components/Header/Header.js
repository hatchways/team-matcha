//importing modules
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import RouteContext from '../../Context/Context';

const Header = ({ isActive }) => {
    const { userId, token, isAuth, handleLogout } = useContext(RouteContext);
    const [user, setUser] = useState({ userDetails: {} });

    useEffect(() => {
        fetch(`/users/details`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-access-token': token
            }
            })
            .then(data => data.json())
            .then((userData) => {
                setUser({...userData})
            })
            .catch(err => (err));
    }, []);

    return (
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
                        src={user.img_url} 
                    />
                    <Typography 
                        className="header__nav--profile--name"
                        variant="body1">
                        {user.name}
                    </Typography>
                </Box>
                {
                    isAuth ? <button className="header__nav--logout" onClick={handleLogout}>Logout</button> : null
                }
            </nav>
        </Box>
    </Box>
    )
};

export default Header;
