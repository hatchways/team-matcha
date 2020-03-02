// importing modules
import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
// importing components
import Header from '../../components/Header/Header';

const UpgradePage = (props) => {
    return (
        <Box className="upgrade">
            <Header />
            <Box className="upgrade__container">
                <Box className="upgrade__header">
                    <Typography className="upgrade__header--title" variant="h4">Upgrade your account</Typography>
                    <Typography className="upgrade__header--text" variant="body1">You are on the free basic plan</Typography>
                </Box>
                <Box className="upgrade__slots">
                    <Box boxShadow={3} className="upgrade__slots--slot">
                        <Box className="upgrade__slots--slot--col">
                            <Typography variant="h5" className="upgrade__slots--slot--title upgrade__slots--slot--title--prem">Premium</Typography>
                            <Typography className="upgrade__slots--slot--price">$8/month</Typography>
                            <Button className="upgrade__slots--slot--btn">Upgrade</Button>
                        </Box>
                        <Box className="upgrade__slots--slot--footer">
                            <Typography className="upgrade__slots--slot--text"><CheckIcon className="upgrade__slots--slot--icon"/>&nbsp;&nbsp;Unlimited event types</Typography>
                            <Typography className="upgrade__slots--slot--text"><CheckIcon className="upgrade__slots--slot--icon"/>&nbsp;&nbsp;Group meetings</Typography>
                        </Box>
                    </Box>
                    <Box boxShadow={3} className="upgrade__slots--slot">
                        <Box className="upgrade__slots--slot--col">
                            <Typography variant="h5" className="upgrade__slots--slot--title upgrade__slots--slot--title--pro">Professional</Typography>
                            <Typography className="upgrade__slots--slot--price">$12/month</Typography>
                            <Button className="upgrade__slots--slot--btn">Upgrade</Button>
                        </Box>
                        <Box className="upgrade__slots--slot--footer">
                            <Typography className="upgrade__slots--slot--text"><CheckIcon className="upgrade__slots--slot--icon"/>&nbsp;&nbsp;Unlimited event types</Typography>
                            <Typography className="upgrade__slots--slot--text"><CheckIcon className="upgrade__slots--slot--icon"/>&nbsp;&nbsp;Group meetings</Typography>
                            <Typography className="upgrade__slots--slot--text"><CheckIcon className="upgrade__slots--slot--icon"/>&nbsp;&nbsp;6 calendar connections</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
    
};

export default UpgradePage;