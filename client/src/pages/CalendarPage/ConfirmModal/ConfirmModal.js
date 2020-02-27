// importing modules
import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';

const confirmModal = ({ handleConfirmation, handleConfirmModal, timeSlotSelected }) => (
    <Box className="confirmModal">
        <Box boxShadow={3} className="confirmModal__window">
            <Box className="confirmModal__window--header">
                Confirm Meeting Time
            </Box>
            <Box className="confirmModal__window--col">
                <Typography variant="body1" className="confirmModal__window--col--text--username">Gerardo P.</Typography>
                <Typography variant="h5" className="confirmModal__window--col--text--eventname">15min Meeting</Typography>
                <Typography variant="body2" className="confirmModal__window--col--text--duration"><ScheduleIcon />&nbsp;15min</Typography>
                <Typography variant="body2" className="confirmModal__window--col--text--location"><LocationOnIcon />&nbsp;Los Angeles</Typography>
                <Typography variant="body2" className="confirmModal__window--col--text">&nbsp;@{timeSlotSelected}</Typography>
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