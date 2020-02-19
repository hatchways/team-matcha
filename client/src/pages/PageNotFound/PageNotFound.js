import React from 'react';
import bolt from '../../assets/img/bolt.png';

const PageNotFound = () => (
    <div className="pageNotFound">
        <img className="pageNotFound__icon" src={bolt} alt="bolt img" />
        <h2 className="pageNotFound__title">The page you are looking for could not be found</h2>
        <p className="pageNotFound__text">Please make sure that you've typed in the URL correctly</p>
    </div>
);

export default PageNotFound;