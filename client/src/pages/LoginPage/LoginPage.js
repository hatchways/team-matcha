// importing modules
import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { tokenCreated, tokenExpires, setIsAuth, setToken, removeToken } from '../../Auth/Auth';
// importing compnents
import GoogleLogin from 'react-google-login';

class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    handleGoogleAuth = (res) => {
        fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access_token: res.accessToken,
            tokenId: res.tokenId
        })
        })
        .then(data => data.json())
        .then((data) => {
            this.props.handleLogin(data.auth_token);
            tokenCreated();
            tokenExpires();
            setIsAuth();
            setToken(data.auth_token);
            this.props.history.push(`/intro/${data.auth_token}`);
        })
        .catch(err => (err));
    }


    render(){
        return(
            <Container maxWidth="xl" className="login">
                <Typography className="login__logo" variant="h4">
                    calend<span className="login__logo--span">app</span>
                </Typography>
                <Box boxShadow={3} className="login__container">
                    <Box className="login__container--header">
                        <Typography className="login__title" variant="h4">
                            Log into your account
                        </Typography>
                    </Box>
                    <GoogleLogin 
                    clientId="798726661513-p69g4p5hn1cmura8mgm0sth9kqlnjoke.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={this.handleGoogleAuth}
                    onFailure={this.handleGoogleAuth}
                    className="login__btn"
                    />
                    <Box className="login__container--footer">
                        <Typography variant="body1" className="login__container--footer--text">
                            Don't have an account?&nbsp;
                            <Link 
                                to="/signup" 
                                className="login__container--col--link"
                            >Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        );
    };
};

export default LoginPage;
