import moment from 'moment';

export const tokenCreated = (date = Date.now()) => {
    const dateAdded = moment(date).format('MMMM Do YYYY, h:mm:ss a'); // token creation date
    localStorage.setItem('tokenCreated', dateAdded);
}

export const tokenExpires = (date = Date.now()) => {
    const dateAhead = moment(date).add(1, 'h'); // token life
    const dateToBeRemoved = moment(dateAhead._d).format('MMMM Do YYYY, h:mm:ss a'); // token remove date
    localStorage.setItem('tokenExpires', dateToBeRemoved);
}

export const setIsAuth = () => localStorage.setItem('isAuth', true);

export const setToken = (token) => localStorage.setItem('token', token);

export const setUserId = (userId) => localStorage.setItem('userId', userId);

export const removeToken = () => {
    localStorage.removeItem('tokenCreated');
    localStorage.removeItem('tokenExpires');
    localStorage.removeItem('isAuth');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
}