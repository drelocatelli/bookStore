import React, {useState} from 'react';
import Navbar from '../Components/Navbar';
import {Grid, Box, Container, Typography, TextField, Button, Link} from "@material-ui/core";

import ApiService from '../Service/ApiService';
import {Alert} from "@mui/material";

export const Home = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    function Login(e) {
        e.preventDefault();

        ApiService().post('/users/login', {email, password})
            .then(response => {
                console.log(response);
                setMessageType('success')
                setMessage(`You're logged in`)
            }).catch(err => {
                console.log(err.response.data)
                setMessageType('error')
                setMessage(`An error occurred: ${err.response.data.error}`)
        });

    }

    return(
        <>
            <Navbar />
            <Box mt={18}>
                <Container>
                    <Grid container direction={"column"} alignItems={"center"} justifyContent={"center"}>
                        <Grid container item direction={"column"} alignItems={"center"} justifyContent={"center"}>
                            <Grid item xs={12}>
                                <Typography variant={"h3"}>Login</Typography>
                            </Grid>
                            {(message) &&
                            <Grid item xs={12}>
                                <Alert severity={messageType}>
                                    {message}
                                </Alert>
                            </Grid>
                            }
                            <form onSubmit={Login}>
                                <Grid item xs={12}>
                                    <TextField label={"Email"} type={"text"} value={email} onChange={e => {setEmail(e.target.value)}}></TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField type={"password"} label={"Password"} value={password} onChange={e => setPassword(e.target.value)}></TextField>
                                </Grid>
                                <Grid>
                                    &nbsp;
                                </Grid>
                                <Grid item spacing={5}>
                                    <Button variant={"contained"} color={"primary"} type={"submit"}>
                                        Login
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    &nbsp;
                                    <br />
                                    <Link href={"/register"} underline={"hover"}>
                                        <Typography>Need an account</Typography>
                                    </Link>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}