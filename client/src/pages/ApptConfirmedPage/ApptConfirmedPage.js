import React from 'react';
// import moment from 'moment';
import { Box, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PublicIcon from '@material-ui/icons/Public';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

class ApptConfirmedPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){
        this.handleFetchApptDetails();
    }

    handleFetchApptDetails = () => {
        const { public_id, eventLink, appointmentId } = this.props.match.params; // get params from url
        // get events api
        // get appt api
        fetch(`/users/${public_id}/events/${eventLink}/appointments/${appointmentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            })
            .then(data => data.json())
            .then((apptData) => {
                console.log('appointment data', apptData);
            })
            .catch(err => (err));
    }

    render() {
        return (
            <Box className="apptConfirmed">
                <Box boxShadow={3} className="apptConfirmed__container">
                    <div className="ribbon ribbon-top-right"><span>Powered By<br/>CalendApp</span></div>
                    <Box className="apptConfirmed__header">
                        <Typography variant="h5" className="apptConfirmed__header--title">Confirmed</Typography>
                        <Typography variant="body1" className="apptConfirmed__header--text">You are scheduled with john-doe</Typography>
                    </Box>
                    <Box>
                        <Box className="apptConfirmed__content">
                            <FiberManualRecordIcon className="apptConfirmed__content--icon" style={{ color: "purple" }} />
                            &nbsp;
                            <Typography className="apptConfirmed__content--duration" variant="body1">15min</Typography>
                        </Box>
                        <Box className="apptConfirmed__content">
                            <ScheduleIcon className="apptConfirmed__content--icon" style={{ color: "#ef6c00" }}/>
                            &nbsp;
                            <Typography className="apptConfirmed__content--date" variant="body1">2:00pm - 2:15pm, Thursday, February 27, 2020</Typography>
                        </Box>
                        <Box className="apptConfirmed__content">
                            <PublicIcon className="apptConfirmed__content--icon apptConfirmed__content--icon--light" />
                            &nbsp;
                            <Typography className="apptConfirmed__content--timezone" variant="body1">Pacific Time - US & Canada</Typography>
                        </Box>
                        <Box className="apptConfirmed__content">
                            <LocationOnIcon className="apptConfirmed__content--icon apptConfirmed__content--icon--light" />
                            &nbsp;
                            <Typography className="apptConfirmed__content--location" variant="body1">Los Angeles</Typography>
                        </Box>
                    </Box>
                    <Box className="apptConfirmed__footer">
                        <Typography className="apptConfirmed__footer--text" variant="body1">A calendar invitation has been sent to your email address.</Typography>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default ApptConfirmedPage;