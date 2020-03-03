// importing modules
import React, {useState} from 'react';
import {Route} from 'react-router-dom';
// importing components
import Header from '../../components/Header/Header';
import SubNavigation from '../../components/SubNavigation/SubNavigation';
import EventsPage from '../EventsPage/EventsPage';
import SchedulePage from '../SchedulePage/SchedulePage';

const Dashboard = ({token, userId}) => {

    const [imageUrl, setImageUrl] = useState("https://www.jetphotos.com/assets/img/user.png")

    console.log(token)
    console.log(userId)
    return (
        <div
        className="dashboard"
    >
        <Header profileImageUrl={imageUrl} />
        <SubNavigation />
        {/* nested routes */}
        <Route
            path="/events"
            exact
            render={props => (
                <EventsPage
                    setImageUrl={setImageUrl}
                    profileImageUrl={imageUrl}
                    token={token}
                    userId={userId}
                    {...props}
            />
        )}
        />
        <Route
            path="/schedule/upcoming"
            exact
            render={props => (
                <SchedulePage
                    token={token}
                    userId={userId}
              />
            )}
        />
    </div>
    )
};

export default Dashboard;
