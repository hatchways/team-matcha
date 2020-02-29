//importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, MenuItem, MenuList, Paper } from '@material-ui/core';
// import SettingsIcon from "@material-ui/icons/Settings";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import HomeIcon from '@material-ui/icons/Home';
import PowerIcon from '@material-ui/icons/Power';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// importing components
import Spinner from '../Spinners/SpinnerSmall';

const MobileNav = ({ toggle, active, user, isActive, handleLogout }) => {
    return (
        <Box className="header__mobile">
            <Box className="header__mobile--col--settings">
            {
                user.img_url !== undefined
                ?  ( 
                    <React.Fragment>
                        <img 
                            onClick={toggle}
                            className="header__nav--profile--img"
                            src={user.img_url.length > 0 ? user.img_url : 'https://i.ya-webdesign.com/images/default-avatar-png-18.png' } 
                            alt=""/> 
                    </React.Fragment>)
                    : <Spinner />
            }
            {active ? <ArrowDropUpIcon onClick={toggle}/> : <ArrowDropDownIcon onClick={toggle}/>}
            {active ? (
                <Paper className="header__mobile--col--settings--dropdown">
                <MenuList>
                    <MenuItem 
                    className="header__mobile--col--settings--dropdown--item">
                    <NavLink 
                        activeClassName="header__mobile--nav--link--isActive"
                        className="header__mobile--nav--link" 
                        to="/events"
                        style={isActive ? { fontWeight: 'bold' } : null}
                        >
                        <HomeIcon />
                        <p className="header__mobile--nav--link--text">Home</p>
                    </NavLink>
                    </MenuItem>
                    <MenuItem
                    className="header__mobile--col--settings--dropdown--item"
                    >
                    <NavLink 
                        activeClassName="header__mobile--nav--link--isActive"
                        className="header__mobile--nav--link" 
                        to="/integration"
                        style={isActive ? { fontWeight: 'bold' } : null}
                        >
                        <PowerIcon />
                        <p className="header__mobile--nav--link--text">Integration</p>
                    </NavLink>
                    </MenuItem>
                    <MenuItem
                    className="header__mobile--col--settings--dropdown--item"
                    >
                    <NavLink 
                        activeClassName="header__mobile--nav--link--isActive"
                        className="header__mobile--nav--link" 
                        to="/upgrade"
                        style={isActive ? { fontWeight: 'bold' } : null}
                        >
                        <CreditCardIcon />
                        <p className="header__mobile--nav--link--text">Upgrade Account</p>
                    </NavLink>
                    </MenuItem>
                    <MenuItem
                    className="header__mobile--col--settings--dropdown--item"
                    >
                    <button className="header__mobile--nav--link header__mobile--nav--link--logout"  onClick={handleLogout}>
                        <ExitToAppIcon />
                        <p className="header__mobile--nav--link--text">Logout</p>
                    </button>
                    </MenuItem>
                </MenuList>
                </Paper>
            ) : null}
            </Box>
        </Box>
    );
}

export default MobileNav;