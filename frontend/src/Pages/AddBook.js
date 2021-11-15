import React, {useEffect, useState} from 'react';
import NavbarMain from "../Components/NavbarMain";
import {
    Box,
    Container,
    Grid,
    Table, TableBody,
    TableCell,
    TableContainer, TableHead,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import Cookies from 'js-cookie';

import ApiService from '../Service/ApiService';
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default() => {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    useEffect(() => {

        console.log("ok")

    }, []);

    function auth() {
        // verify token
        ApiService().get("/users/me", {
            headers: {
                'Authorization': `Bearer ${Cookies.get("token")}`,
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => {
            setUser(response.data);
        }).catch(err => {
            setUser(null);
        })

        if(user == null) {
            navigate("/");
        }
    }auth();

    return(
        <>
            <NavbarMain />
            <Box mt={18}>
                <Container>
                    <Grid item md={12}>
                        <Typography variant={"h5"}>Add new book</Typography>
                        <hr />
                    </Grid>
                    <Grid item>
                        <Typography>You can add new book behind the form...</Typography>
                    </Grid>
                </Container>
            </Box>
        </>
    );


}