import React, { Component } from 'react';
import { DatePicker } from "@material-ui/pickers";
import { disableDays } from '../../Utils/dates-func';
// import moment from 'moment';

class CalendarPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            availability: {},
            timeslots: []
        }
    }

    componentDidMount(){
        const availability = {
            "2020-02-25": [{"hour": 0, "minute": 0},
                           {"hour": 0, "minute": 30},
                           {"hour": 1, "minute": 0},
                           {"hour": 1, "minute": 30},
                           {"hour": 3, "minute": 0}],
            "2020-02-26": [],
            "2020-02-27": [{"hour": 0, "minute": 0},
                           {"hour": 0, "minute": 30},
                           {"hour": 2, "minute": 0},
                           {"hour": 2, "minute": 30},
                           {"hour": 3, "minute": 0}],
            "2020-02-28": [],
            "2020-02-29": []
        }
        // fetch event availability from server
        this.setState({ availability });
    }

    // ! handles date change and time-slots to render
    handleDateChange = (date) => {
        this.setState({   
            date: date, 
            timeslots: this.state.availability[date.format('YYYY-MM-DD')] 
            }, () => console.log(this.state)
        );
    };

    // ! disables days
    handleDisableDates = (date) => {
        const days = disableDays(this.state.availability);
        const dateFound = days.find((dayStr) => {
            return date.format('YYYY-MM-DD') === dayStr;
        });
        return dateFound;
    };
    
    render(){
        return (
            <div>
                <DatePicker
                    autoOk
                    orientation="landscape"
                    variant="static"
                    openTo="date"
                    value={this.state.date}
                    onChange={this.handleDateChange}
                    disablePast
                    shouldDisableDate={this.handleDisableDates}
                />
                {
                    // testing timeslots render
                    this.state.timeslots.map((timeslot, index) => (<p key={index}>{timeslot.hour}:{timeslot.minute}</p>))
                }
            </div>
        )
    }
}

export default CalendarPage;