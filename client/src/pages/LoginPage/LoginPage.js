// importing modules
import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import { tokenCreated, tokenExpires, setIsAuth, setToken, setUserId } from '../../Auth/Auth';
// importing compnents
import GoogleLogin from 'react-google-login';

class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    handleGoogleAuth = async (res) => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: res.code
                })
            })
            const creds = await response.json()
            this.props.handleLogin(creds.auth_token, creds.public_id);
            tokenCreated();
            tokenExpires();
            setIsAuth();
            setToken(creds.auth_token);
            setUserId(creds.public_id);
            const resp = await fetch(`/users/${creds.public_id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const user = await resp.json()
            console.log(user)
            if (user.role === "Role.MEMBER"){
                this.props.history.push('/events');
            } else {
                this.props.history.push(`/intro/${creds.auth_token}`);
            }

            // redirect if users logs in successfully
        } catch(e){
            console.log(e)
            return e
        }
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
                            Log into <br/>your account
                        </Typography>
                    </Box>
                    <GoogleLogin 
                    clientId="798726661513-p69g4p5hn1cmura8mgm0sth9kqlnjoke.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={this.handleGoogleAuth}
                    onFailure={this.handleGoogleAuth}
                    prompt='consent'
                    accessType='offline'
                    responseType='code'
                    scope='https://www.googleapis.com/auth/calendar openid profile email'
                    className="login__btn"
                    />
                    <Box className="login__container--footer">
                    </Box>
                </Box>
            </Container>
        );
    };
};

export default LoginPage;
