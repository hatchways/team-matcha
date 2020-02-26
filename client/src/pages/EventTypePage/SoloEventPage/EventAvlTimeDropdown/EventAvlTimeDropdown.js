import React from 'react';
import { Box, MenuItem, Select, Typography } from '@material-ui/core';

const EventAvlTimeDropDown = ({timeAvlStart, timeAvlEnd, handleUserInput, eventTimeError}) => (
    <Box className="soloEvent__content--hours">
        <Typography variant="h6" className="soloEvent__content--hours--title">Available Hours *</Typography>
        <div className="soloEvent__content--hours--values">
            <Box className="soloEvent__content--hours--select">
            <Select
            onChange={handleUserInput}
            disableUnderline
            name="eventStart"
            value={timeAvlStart}
            >
            {[...Array(24).keys()].map(t => <MenuItem key={t} value={t}> {("00" + t).slice (-2) + ":00"}</MenuItem>) }
            </Select>
            </Box>
            <div className="soloEvent__content--hours--span">&mdash;</div>
            <Box className="soloEvent__content--hours--select">
            <Select
            onChange={handleUserInput}
            disableUnderline
            name="eventEnd"
            value={timeAvlEnd}
            >
            {[...Array(24).keys()].map(t => <MenuItem key={t} value={t}> {("00" + t).slice (-2) + ":00"}</MenuItem>) }
            </Select>
            </Box>
        </div>
        <p className="soloEvent__content--hours--error">{eventTimeError}</p>
    </Box>
);

export default EventAvlTimeDropDown;