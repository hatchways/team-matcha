// importing modules
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';

const FormSubmitControls = (props) => (
    <Box className="soloEvent__form--header">
        {
            props.isFormHeader 
            ? <Typography className="soloEvent__form--header--text"> 
                What event is this? 
            </Typography> 
            : <p>&nbsp;</p>
        }
        <Box className="soloEvent__btn">
            <Button  onClick={() => props.history.push('/events')} className="soloEvent__btn--cancel">Cancel</Button>
            <Button type="submit" className="soloEvent__btn--next">Create</Button>
        </Box>
    </Box>
);

export default withRouter(FormSubmitControls);