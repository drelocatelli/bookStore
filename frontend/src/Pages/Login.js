import React, {useState, useEffect} from 'react';
import Navbar from '../Components/Navbar';
import {Grid, Box, Container, Typography, TextField, Button, Link} from "@material-ui/core";

import ApiService from '../Service/ApiService';
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

export default() => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const navigate = useNavigate();
    // check if already logged
    useEffect(() => {

        ApiService().get('/users/me', {
            headers: {
                'Authorization': `Bearer ${Cookies.get("token")}`,
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => {
            navigate("/main");
        }).catch(() => {

        })

    }, [])


    // do login
    function Login(e) {
        e.preventDefault();

        if(!email || !password) {
            setMessageType("info");
            setMessage("Fields cannot be null");

            return;
        }

        ApiService().post('/users/login', {email, password})
            .then(response => {
                Cookies.set('token', response.data.token);
                setMessageType(null);
                setMessage(null);
                navigate("/main");

            }).catch(err => {
                Cookies.set('token', null);
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