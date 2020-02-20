// importing modules
import React, {useState} from 'react';
import { Box, MenuList, MenuItem, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';

const EventLocationDropdown = ({locationDropDownField, handleLocationModal, handlePhoneCallModal }) => {
    const [active, setToggle] = useState(false);
    const toggle = () => {
        setToggle(!active);
    };
    return (
    <Box className="soloEvent__form--input">
        <Typography className="soloEvent__form--input--label" variant="h6">Location</Typography>
        <Box onClick={toggle} className="soloEvent__form--location">
            <Typography className="soloEvent__form--location--title" variant="body1">
                {locationDropDownField}
            </Typography>
            { active ? <ExpandLessIcon /> : <ExpandMoreIcon/> }
            {/*add location drop down here*/}
            {active 
            ? <Paper className="soloEvent__form--location--settings--dropdown">
                <MenuList>
                    <MenuItem onClick={handleLocationModal} className="soloEvent__form--location--settings--dropdown--item">
                        <LocationOnIcon className="soloEvent__form--location--settings--dropdown--icon"/>
                        <Box>
                            <Typography variant="body2">In-person meeting</Typography>
                            <span className="soloEvent__form--location--settings--dropdown--span">set an address or place</span>
                        </Box>
                    </MenuItem>
                    <MenuItem onClick={handlePhoneCallModal} className="soloEvent__form--location--settings--dropdown--item">
                        <CallIcon className="soloEvent__form--location--settings--dropdown--icon"/>
                        <Box>
                            <Typography variant="body2">Phone-call</Typography>
                            <span className="soloEvent__form--location--settings--dropdown--span">Inbound or outbound calls</span>
                        </Box>
                    </MenuItem>
                </MenuList>
            </Paper> : null }
        </Box>
    </Box>
    )
};

export default EventLocationDropdown;