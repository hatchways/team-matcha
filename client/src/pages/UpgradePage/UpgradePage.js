// importing modules
import React from 'react';
// importing components
import Header from '../../components/Header/Header';

const UpgradePage = (props) => {
    console.log(props.token);
    console.log(props.userId);
    return (
        <div className="upgrade">
            <Header />
        </div>
    )
    
};

export default UpgradePage;