// importing modules
import React from 'react';
import { Box, Typography } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';

const NoScheduledItems = ({ text }) => (
    <Box className="noScheduledItems">
        <Box className="noScheduledItems__content">
            <EventIcon className="noScheduledItems__icon"/>
            <Typography className="noScheduledItems__text" variant="h5">
                {text}
            </Typography>
        </Box>
    </Box>
);

export default NoScheduledItems;