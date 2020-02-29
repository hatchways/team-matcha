import moment from 'moment';

// disable dates based on day-integer
export const daysStrToNum = (daysAvailableArr) => {
    let daysToDisableList = [];
    for (let [dayName, value] of Object.entries(daysAvailableArr)) {
        if(value === false) {
            const day = moment().day(dayName); // get the day by weekday number
            daysToDisableList.push(day); // push the day into the disable list
        }
    }
    return daysToDisableList;
};

// disable dates based on day-integer
// export const disableDays = (daysAvailableArr) => {
//     let daysToDisableList = [];
//     for (let [dayOfMonth, value] of Object.entries(daysAvailableArr)) {
//         if(value.length === 0) {
//             const day = dayOfMonth; // get the day by weekday number
//             daysToDisableList.push(parseInt(day)); // push the day into the disable list
//         }
//     }
//     return daysToDisableList;
// };

// disabled dates based on YYYY-MM-DD format
export const disableDays = (daysAvailableArr) => {
    let daysToDisableList = [];
    for (let [dayOfMonth, value] of Object.entries(daysAvailableArr)) {
        if(value.length === 0) {
            var day = moment(dayOfMonth);
            daysToDisableList.push(day.format('YYYY-MM-DD')); // push the day into the disable list
        }
    }
    return daysToDisableList;
};