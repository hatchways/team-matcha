// importing modules
import React, { Component } from "react";
import { Box } from "@material-ui/core";
// importing components
import EventPageHeader from "./EventPageHeader/EventPageHeader";
import EventCard from "./EventPageCard/EventsPageCard";
import EventPageMsg from "./EventPageMsg/EventPageMsg";

class EventsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userDetails: {}
    };
  }

  componentDidMount() {
    this.handleFetchUser();
  }

  handleFetchUser = () => {
    fetch(`/users/details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-access-token": this.props.token
      }
    })
      .then(data => data.json())
      .then(data => {
        console.log("user details", data);
        // this.setState({profileImage: data.img_url});
        this.props.setImageUrl(data.img_url);
        this.setState({ userDetails: { ...data } });

        fetch(`/users/${data.public_id}/events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-access-token": this.props.token
          }
        })
          .then(data => data.json())
          .then(data => {
            console.log("events data", data);
            this.setState({ events: data });
          })
          .catch(err => err);
      })
      .catch(err => err);
  };

  handleRemoveEvent = id => {
    this.setState(prevState => ({
      events: prevState.events.filter(event => event.eventId !== id)
    }));
  };

  render() {
    const { events } = this.state;

    return (
      <Box className="eventPage">
        <EventPageHeader
          img={this.props.profileImageUrl}
          {...this.state.userDetails}
        />
        <Box className="eventPage__container">
          {events.length > 0 ? (
            events.map((event, index) => (
              <EventCard
                handleRemoveEvent={this.handleRemoveEvent}
                handleLinkToClipBoard={this.handleLinkToClipBoard}
                key={index}
                userName={this.state.userDetails.public_id}
                {...event}
              />
            ))
          ) : (
            <EventPageMsg />
          )}
        </Box>
      </Box>
    );
  }
}

export default EventsPage;
