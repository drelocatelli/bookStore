import React, {useState} from 'react';
import Navbar from '../Components/Navbar';
import {Grid, Box, Container, Typography, TextField, Button, Link} from "@material-ui/core";

import ApiService from '../Service/ApiService';
import {Alert} from "@mui/material";

export default() => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    function Register(e) {
        e.preventDefault();

        ApiService().post('/users/register', {name, email, password})
            .then(response => {
                console.log(response);
                setMessageType('success');
                setMessage(`Now you can login`);
            }).catch(err => {
                console.log(err.response.data)
                setMessageType('error');
                setMessage(`An error occurred: ${err.response.data}`);
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
                                <Typography variant={"h3"}>Register</Typography>
                            </Grid>
                            {(message) &&
                            <Grid item xs={12}>
                                <Alert severity={messageType}>
                                    {message}
                                </Alert>
                            </Grid>
                            }
                            <form onSubmit={Register}>
                                <Grid item xs={12}>
                                    <TextField label={"Name"} type={"text"} value={name} onChange={e => {setName(e.target.value)}}></TextField>
                                </Grid>
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
                                        Confirm
                                    </Button>
                                </Grid>
                            
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}