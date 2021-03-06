// importing modules
import React from 'react';
import { Box, Radio, Typography } from '@material-ui/core';

const RadioDurationList = ({ handleUserInput, eventDuration, eventDurationCustom, eventDurationCustomError }) => (
    <Box className="soloEvent__form--input">
        <Typography className="soloEvent__form--input--label" variant="h6">Event Duration</Typography>
        <Box className="soloEvent__form--duration">
            <Box className="soloEvent__form--duration--time">
                <Typography variant="body2" className="soloEvent__form--duration--text">
                    15<br/>
                    <span className="soloEvent__form--duration--text--span">min</span>
                </Typography>
                <Radio
                    onChange={handleUserInput}
                    checked={eventDuration === "15"}
                    name="eventDuration"
                    className="soloEvent__form--duration--radio"
                    value="15"
                />
            </Box>
            <Box className="soloEvent__form--duration--time">
                <Typography variant="body2" className="soloEvent__form--duration--text">
                    30<br/>
                    <span className="soloEvent__form--duration--text--span">min</span>
                </Typography>
                <Radio
                    onChange={handleUserInput}
                    checked={eventDuration === "30"}
                    name="eventDuration"
                    className="soloEvent__form--duration--radio"
                    value="30"
                />
            </Box>
            <Box className="soloEvent__form--duration--time">
                <Typography variant="body2" className="soloEvent__form--duration--text">
                    45<br/>
                    <span className="soloEvent__form--duration--text--span">min</span>
                </Typography>
                <Radio
                    onChange={handleUserInput}
                    checked={eventDuration === "45"}
                    name="eventDuration"
                    className="soloEvent__form--duration--radio"
                    value="45"
                />
            </Box>
            <Box className="soloEvent__form--duration--time">
                <Typography variant="body2" className="soloEvent__form--duration--text">
                    60<br/>
                    <span className="soloEvent__form--duration--text--span">min</span>
                </Typography>
                <Radio
                    onChange={handleUserInput}
                    checked={eventDuration === "60"}
                    name="eventDuration"
                    className="soloEvent__form--duration--radio"
                    value="60"
                />
            </Box>
            <Box className="soloEvent__form--duration--time soloEvent__form--duration--time--custom--wrap">
                <Typography variant="body2" className="soloEvent__form--duration--text">
                        <input
                        onChange={handleUserInput}
                        placeholder="-"
                        className="soloEvent__form--duration--time--custom"
                        disabled={!(eventDuration === "custom")}
                        name="eventDurationCustom"
                        value={eventDurationCustom}
                        type="number" 
                        />
                    <br/>
                    <span className="soloEvent__form--duration--text--span soloEvent__form--duration--time--custom--span">custom min</span>
                </Typography>
                <Radio
                    onChange={handleUserInput}
                    checked={eventDuration === "custom"}
                    name="eventDuration"
                    className="soloEvent__form--duration--radio"
                    value="custom"
                />
            </Box>
        </Box>
        <p className="soloEvent__error">{eventDurationCustomError}</p>
    </Box>
);

export default RadioDurationList;