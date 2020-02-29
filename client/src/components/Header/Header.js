//importing modules
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import RouteContext from '../../Context/Context';
// importing components
import Spinner from '../Spinners/SpinnerSmall';
import MobileNav from '../MobileNav/MobileNav';

const Header = ({ isActive }) => {
    const { token, isAuth, handleLogout } = useContext(RouteContext);
    const [user, setUser] = useState({ userDetails: { img_url: '' } });

    const [active, setToggle] = useState(false);
    const toggle = () => {
        setToggle(!active);
    };

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
                    className="header__nav--link header__nav--link--upgrade" 
                    to="/upgrade"
                >Upgrade Account
                </NavLink>
                <Box className="header__nav--profile">
                    {
                        user.img_url !== undefined
                        ?  ( 
                            <React.Fragment>
                                <img 
                                    className="header__nav--profile--img"
                                    src={user.img_url.length > 0 ? user.img_url : 'https://i.ya-webdesign.com/images/default-avatar-png-18.png' } 
                                    alt=""/> 
                                <Typography 
                                    className="header__nav--profile--name"
                                    variant="body1">
                                    {user.name}
                                </Typography>
                            </React.Fragment>)
                            : <Spinner />
                    }
                    
                </Box>
                {
                    isAuth ? <button className="header__nav--logout" onClick={handleLogout}>Logout</button> : null
                }
            </nav>
            <MobileNav 
                isActive={isActive}
                user={user}
                toggle={toggle}
                active={active}
                handleLogout={handleLogout}
            />
        </Box>
    </Box>
    )
};

export default Header;

