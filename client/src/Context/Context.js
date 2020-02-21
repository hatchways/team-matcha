
import React from 'react';

// creates a global state
export default React.createContext({
    handleLogout: () => {}, // logout handler
    isAuth: null, // isAuth state
    userId: null,
    token: null
});