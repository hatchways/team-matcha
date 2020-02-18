// importing modules
import React, { Component } from 'react';
import { Box, Button, Typography } from '@material-ui/core';

const FormSubmitControls = ({ isFormHeader }) => (
    <Box className="soloEvent__form--header">
        {
            isFormHeader 
            ? <Typography className="soloEvent__form--header--text"> 
                What event is this? 
            </Typography> 
            : <p>&nbsp;</p>
        }
        <Box className="soloEvent__btn">
            <Button className="soloEvent__btn--cancel">Cancel</Button>
            <Button className="soloEvent__btn--next">Next</Button>
        </Box>
    </Box>
);

export default FormSubmitControls;