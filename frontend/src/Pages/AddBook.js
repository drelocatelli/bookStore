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

import {useAuth} from '../Authentication/AuthProvider';
import ApiService from '../Service/ApiService';
import {Alert} from "@mui/material";

export default() => {

    const auth = useAuth();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {

        // verify token
        ApiService().get("/users/me", {
            headers: {
                'Authorization': `Bearer ${Cookies.get("token")}`,
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => {
            setEmail(response.data.email);
            setName(response.data.name);
        }).catch(err => {
            console.log(err)
        })

    }, []);

    return(
        <>
            <NavbarMain />
            Add new book
        </>
    );


}