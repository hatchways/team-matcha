// importing modules
import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import Header from '../../components/Header/Header';
import googleCalendarImg from '../../assets/img/google-calendar.png';
import stripeImg from '../../assets/img/stripe.png';
import sendgridImg from '../../assets/img/sendgrid.png';

const IntegrationsPage = () => (
    <Box className="integration">
        <Header />
        <Box boxShadow={3} className="integration__container">
            <Box className="integration__col">
                <Box className="integration__col--img"><img className="integration__col--img--i" src={googleCalendarImg} /></Box>
                <Box className="integration__col--title">
                    <Typography variant="h6" className="integration__col--title--t">
                        Google Calendar
                    </Typography>
                </Box>
                <Box className="integration__col--text">
                    <Typography variant="body2" className="integration__col--text--t">
                        Access your event Type links,<br/>
                        create Adhoc Meetings and<br/>
                        more.
                    </Typography>
                </Box>
            </Box>
            <Box className="integration__col">
                <Box className="integration__col--img"><img className="integration__col--img--i" src={sendgridImg} /></Box>
                <Box className="integration__col--title">
                    <Typography variant="h6" className="integration__col--title--t">
                        SendGrid
                    </Typography>
                </Box>
                <Box className="integration__col--text">
                    <Typography variant="body2" className="integration__col--text--t">
                        Transactional emails,<br/>
                        and notifications.
                    </Typography>
                </Box>
            </Box>
            <Box className="integration__col">
                <Box className="integration__col--img"><img className="integration__col--img--i" src={stripeImg} /></Box>
                <Box className="integration__col--title">
                    <Typography variant="h6" className="integration__col--title--t">
                        Stripe
                    </Typography>
                </Box>
                <Box className="integration__col--text">
                    <Typography variant="body2" className="integration__col--text--t">
                        Use Stripe to accept<br/>
                        secure payments.
                    </Typography>
                </Box>
            </Box>
        </Box>
    </Box>
);

export default IntegrationsPage;