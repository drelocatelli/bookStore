import React, {useEffect, useState} from 'react';
import NavbarMain from "../Components/NavbarMain";
import {
    Box, Button,
    Container, FormControl,
    Grid, Table, TableContainer, TableHead, TableRow, TextareaAutosize,
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
    const [logged, setLogged] = useState();

    useEffect(() => {
        // --------------------------------------- verify token
        ApiService().get("/users/me", {
            headers: {
                'Authorization': `Bearer ${Cookies.get("token")}`,
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => {
            setUser(response.data);
            setLogged(true);
        }).catch(err => {
            setUser(null);
            setLogged(false);
        })

    }, []);



    // add new book
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [description, setDescription] = useState();
    const [year, setYear] = useState();
    const [price, setPrice] = useState();

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    function addBook(e) {
        e.preventDefault();

        let data = {
            author,
            description,
            price,
            title,
            releaseYear: year
        }

        ApiService().post("/books/new", data , {
            headers: {
                'Authorization': `Bearer ${Cookies.get("token")}`,
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => {
            console.log(response);
            setMessageType("success");
            setMessage("Success! Your book is added");
        }).catch(err => {
            console.log(err);
            setMessageType("error");
            setMessage("An error occurred, see the console");
        })

    }

    if(!logged) {
        return <Typography>You don't have permission.</Typography>
    }else{
        return(
            <>
                <NavbarMain />
                <Box mt={18}>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item md={12}>
                                <Typography variant={"h5"}>Add new book</Typography>
                                <hr />
                            </Grid>
                            <Grid item md={12}>
                                <Typography>You can add new book below in the form.</Typography>
                            </Grid>
                            {(message) &&
                                <Grid item xs={12}>
                                    <Alert severity={messageType}>
                                        {message}
                                    </Alert>
                                </Grid>
                            }
                            <Grid item md={12}>
                                <form onSubmit={addBook}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TextField label={"Title"} value={title} onChange={e => setTitle(e.target.value)} style={{width: '100%'}}></TextField>
                                                </TableRow>
                                                <TableRow>
                                                    <TextField label={"Author"} value={author} onChange={e => setAuthor(e.target.value)} style ={{width: '100%'}}></TextField>
                                                </TableRow>
                                                <TableRow>
                                                    <br/>
                                                    <Typography>Description:</Typography>
                                                    <TextareaAutosize
                                                        value={description} onChange={e => setDescription(e.target.value)}
                                                        placeholder="max 200 characters"
                                                        maxLength={200}
                                                        style={{width: "-webkit-fill-available", minHeight:"100px", marginTop:"10px", padding:"10px"}}
                                                    />
                                                </TableRow>
                                                <TableRow>
                                                    <TextField label={"Year"} value={year} onChange={e => setYear(e.target.value)} style={{width: '100%'}}></TextField>
                                                </TableRow>
                                                <TableRow>
                                                    <TextField label={"Price"} value={price} onChange={e => setPrice(e.target.value)} style={{width: '100%'}}></TextField>
                                                </TableRow>
                                                <TableRow>
                                                    <Button variant="contained" style={{background:"#8BC34A", color:"#fff", marginTop:"25px"}} type={"submit"}>Insert book</Button>
                                                </TableRow>
                                            </TableHead>
                                        </Table>
                                    </TableContainer>
                                </form>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </>
        );

    }
}