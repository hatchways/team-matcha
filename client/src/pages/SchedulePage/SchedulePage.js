// importing modules
import React from 'react';
import { Route } from 'react-router-dom';
import { Box } from '@material-ui/core';
// importing components
import Header from '../../components/Header/Header';
import SubNavigation from '../../components/SubNavigation/SubNavigation';
import UpcomingSchedule from './UpcomingSchedule/UpcomingSchedule';
import PastSchedule from './PastSchedule/PastSchedule';

const SchedulePage = ({token, userId}) => (
    <Box className="schedulePage">
        <Header isActive={true} />
        <SubNavigation isActive={true} />
        <Box className="schedulePage__container">
            {/*nested routes within dashboard-page within schedule-page */}
            <Route
                path="/schedule/upcoming"
                exact
                render={props => (
                    <UpcomingSchedule
                        userId={userId}
                        token={token}
                    />
                )}
            />
            <Route path="/schedule/past" exact component={PastSchedule} />
        </Box>
    </Box>
);

export default SchedulePage;

