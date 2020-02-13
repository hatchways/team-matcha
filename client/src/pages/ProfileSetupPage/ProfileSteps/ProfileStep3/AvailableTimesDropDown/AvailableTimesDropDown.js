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
                <MenuItem value={1}>01:00</MenuItem>
                <MenuItem value={2}>02:00</MenuItem>
                <MenuItem value={3}>03:00</MenuItem>
                <MenuItem value={4}>04:00</MenuItem>
                <MenuItem value={5}>05:00</MenuItem>
                <MenuItem value={6}>06:00</MenuItem>
                <MenuItem value={7}>07:00</MenuItem>
                <MenuItem value={8}>08:00</MenuItem>
                <MenuItem value={9}>09:00</MenuItem>
                <MenuItem value={10}>10:00</MenuItem>
                <MenuItem value={11}>11:00</MenuItem>
                <MenuItem value={12}>12:00</MenuItem>
                <MenuItem value={13}>13:00</MenuItem>
                <MenuItem value={14}>14:00</MenuItem>
                <MenuItem value={15}>15:00</MenuItem>
                <MenuItem value={16}>16:00</MenuItem>
                <MenuItem value={17}>17:00</MenuItem>
                <MenuItem value={18}>18:00</MenuItem>
                <MenuItem value={19}>19:00</MenuItem>
                <MenuItem value={20}>20:00</MenuItem>
                <MenuItem value={21}>21:00</MenuItem>
                <MenuItem value={22}>22:00</MenuItem>
                <MenuItem value={23}>23:00</MenuItem>
                <MenuItem value={24}>24:00</MenuItem>
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
                <MenuItem value={1}>01:00</MenuItem>
                <MenuItem value={2}>02:00</MenuItem>
                <MenuItem value={3}>03:00</MenuItem>
                <MenuItem value={4}>04:00</MenuItem>
                <MenuItem value={5}>05:00</MenuItem>
                <MenuItem value={6}>06:00</MenuItem>
                <MenuItem value={7}>07:00</MenuItem>
                <MenuItem value={8}>08:00</MenuItem>
                <MenuItem value={9}>09:00</MenuItem>
                <MenuItem value={10}>10:00</MenuItem>
                <MenuItem value={11}>11:00</MenuItem>
                <MenuItem value={12}>12:00</MenuItem>
                <MenuItem value={13}>13:00</MenuItem>
                <MenuItem value={14}>14:00</MenuItem>
                <MenuItem value={15}>15:00</MenuItem>
                <MenuItem value={16}>16:00</MenuItem>
                <MenuItem value={17}>17:00</MenuItem>
                <MenuItem value={18}>18:00</MenuItem>
                <MenuItem value={19}>19:00</MenuItem>
                <MenuItem value={20}>20:00</MenuItem>
                <MenuItem value={21}>21:00</MenuItem>
                <MenuItem value={22}>22:00</MenuItem>
                <MenuItem value={23}>23:00</MenuItem>
                <MenuItem value={24}>24:00</MenuItem>
            </Select>
            </Box>
        </div>
    </Box>
);

export default AvailableTimesDropDown;
