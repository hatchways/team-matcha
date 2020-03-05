import React, { useEffect, useState } from 'react';
import momentTZ from "moment-timezone";
// import moment from 'moment';
import { Box, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
// import PublicIcon from '@material-ui/icons/Public';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const ApptConfirmedPage = (props) => {
    const [event, setEvent] = useState({});
    const [apptStart, setApptStart] = useState('');
    const [apptEnd, setApptEnd] = useState('');
    const [loading, setIsLoading] = useState(true);


    useEffect(() => {
        const { public_id, eventLink, appointmentId } = props.match.params; // get params from url
        fetch(`/users/${public_id}/events/${eventLink}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        })
        .then(data => data.json())
        .then((eventData) => {
            setEvent({...eventData});
            setApptStart(momentTZ(`${appointmentId}`).utcOffset(appointmentId).format('hh:mma'));
            setApptEnd(momentTZ(`${appointmentId}`).utcOffset(appointmentId).add(eventData.duration,'m').format('hh:mma'));
            setIsLoading(false);
        })
        .catch(err => (err));
    }, []);


        const { public_id, appointmentId } = props.match.params;
        const userEventScheduleFor = momentTZ(`${appointmentId}`).utcOffset(appointmentId).format('dddd, MMMM Do, YYYY Z'); // formats invitee meeting (local-time)

        return (
            <React.Fragment>
            { loading ? <LoadingPage /> : 
            <Box className="apptConfirmed">
                <Box boxShadow={3} className="apptConfirmed__container">
                    <div className="ribbon ribbon-top-right"><span>Powered By<br/>CalendApp</span></div>
                    <Box className="apptConfirmed__header">
                        <Typography variant="h5" className="apptConfirmed__header--title">Confirmed</Typography>
                        <Typography variant="body1" className="apptConfirmed__header--text">You are scheduled with {public_id}</Typography>
                    </Box>
                    <Box>
                        <Box className="apptConfirmed__content">
                            <FiberManualRecordIcon className="apptConfirmed__content--icon" style={{ color: `${event.color}` }} />
                            &nbsp;
                            <Typography className="apptConfirmed__content--duration" variant="body1">{event.duration}min</Typography>
                        </Box>
                        <Box className="apptConfirmed__content">
                            <ScheduleIcon className="apptConfirmed__content--icon" style={{ color: "#ef6c00" }}/>
                            &nbsp;
                            <Typography className="apptConfirmed__content--date" variant="body1">{apptStart} - {apptEnd}, {userEventScheduleFor}</Typography>
                        </Box>
                        {/*
                        <Box className="apptConfirmed__content">
                            <PublicIcon className="apptConfirmed__content--icon apptConfirmed__content--icon--light" />
                            &nbsp;
                            <Typography className="apptConfirmed__content--timezone" variant="body1">Pacific Time - US & Canada</Typography>
                        </Box>
                        */}
                        <Box className="apptConfirmed__content">
                            <LocationOnIcon className="apptConfirmed__content--icon apptConfirmed__content--icon--light" />
                            &nbsp;
                            <Typography className="apptConfirmed__content--location" variant="body1">{event.location}</Typography>
                        </Box>
                    </Box>
                    <Box className="apptConfirmed__footer">
                        <Typography className="apptConfirmed__footer--text" variant="body1">A calendar invitation has been sent to your email address.</Typography>
                    </Box>
                </Box>
            </Box>
            }
            </React.Fragment>
        )
    }

export default ApptConfirmedPage;