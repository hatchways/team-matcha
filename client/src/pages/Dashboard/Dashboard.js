// importing modules
import React from 'react';
import { Route } from 'react-router-dom';
// importing components
import Header from '../../components/Header/Header';
import SubNavigation from '../../components/SubNavigation/SubNavigation';
import EventsPage from '../EventsPage/EventsPage';
import SchedulePage from '../SchedulePage/SchedulePage';

const Dashboard = () => (
    <div
        className="dashboard"
    >
        <Header />
        <SubNavigation /> 
        {/* nested routes */}
        <Route path="/events" exact component={EventsPage} />
        <Route path="/schedule/upcoming" exact component={SchedulePage} />
    </div>
);

export default Dashboard;