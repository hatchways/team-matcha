import momentTZ from 'moment-timezone';

export const convertIntToISO = (timeToConvert, timezoneName) => {
    const hourFormatted = momentTZ((timeToConvert).toString(),'HH').format('HH'); // formatting integer to 24hr time
    const formattedTimeSlot24hr = momentTZ(`${hourFormatted}:00`, 'HH:mm').format('HH:mm:ss'); // formatting time to reflect hour&minutes in 24hr format
    const timezoneOffset = momentTZ.tz(timezoneName).format('Z'); // gets the utc timezone offset based on timezone selected
    return `${formattedTimeSlot24hr}${timezoneOffset}`;
}