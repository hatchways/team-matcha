import React from 'react';
import { Box, MenuItem, Select, Typography } from '@material-ui/core';

const AvailableTimesDropDown = ({timeAvlFrom, timeAvlUntil, handleUserInput}) => (
    <Box className="step3__content--hours">
        <Typography variant="h6" className="step3__content--hours--title">Available Hours:</Typography>
        <div className="step3__content--hours--values">
            <Box className="step3__content--hours--select">
            <Select
            onChange={handleUserInput}
            disableUnderline
            name="timeAvlFrom"
            value={timeAvlFrom}
            >
            {[...Array(24).keys()].map(t => <MenuItem key={t} value={t}> {("00" + t).slice (-2) + ":00"}</MenuItem>) }
            </Select>
            </Box>
            <div className="step3__content--hours--span">&mdash;</div>
            <Box className="step3__content--hours--select">
            <Select
            onChange={handleUserInput}
            disableUnderline
            name="timeAvlUntil"
            value={timeAvlUntil}
            >
            {[...Array(24).keys()].map(t => <MenuItem key={t} value={t}> {("00" + t).slice (-2) + ":00"}</MenuItem>) }
            </Select>
            </Box>
        </div>
    </Box>
);

export default AvailableTimesDropDown;
