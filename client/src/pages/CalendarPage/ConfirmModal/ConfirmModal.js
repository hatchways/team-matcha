// importing modules
import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';

const confirmModal = ({ username, name, duration, location, handleConfirmation, handleConfirmModal, timeSlotSelected }) => (
    <Box className="confirmModal">
        <Box boxShadow={3} className="confirmModal__window">
            <Box className="confirmModal__window--header">
                Confirm Meeting Time
            </Box>
            <Box className="confirmModal__window--col">
                <Typography variant="body1" className="confirmModal__window--col--text--username">{username}</Typography>
                <Typography variant="h5" className="confirmModal__window--col--text--eventname">{name}</Typography>
                <Typography variant="body2" className="confirmModal__window--col--text--duration"><ScheduleIcon />&nbsp;{duration}min</Typography>
                <Typography variant="body2" className="confirmModal__window--col--text--location"><LocationOnIcon />&nbsp;{location}</Typography>
                <Typography variant="body2" className="confirmModal__window--col--text--time">&nbsp;@{timeSlotSelected}</Typography>
            </Box>
            <Box className="confirmModal__window--footer">
                <Button 
                    onClick={handleConfirmation}
                    className="confirmModal__window--btn confirmModal__window--btn--update"
                >Confirm</Button>
                <Button 
                    onClick={() => { 
                        handleConfirmModal();
                    }}
                    className="confirmModal__window--btn confirmModal__window--btn--cancel"
                >Cancel</Button>
            </Box>
        </Box>
    </Box>
);

export default confirmModal;