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
    
        findBooks();
    }, []);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // list all books

    function findBooks(search) {
        let webservice = (search == undefined) ? '/books'  : `/books/search?title=${search}`;

        ApiService().get(webservice, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                // sort title alphabetically
                let responseData = response.data.sort((a, b) => a.title.localeCompare(b.title) );
                setData(responseData)
            }).catch(err => {
                console.log(err.response)
                setMessageType("error");
                setMessage(`An error occurred: ${err.response.data.message}`);
        })
    }

    // search books

    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    function doSearch() {
        if(!search) {
            setMessageType("info");
            setMessage("Listing all books");

            findBooks();
            return;
        }else {
            setMessageType(null);
            setMessage(null);

            findBooks(search);
        }


    }

    return(
        <>
            <NavbarMain />
            <Box mt={18}>
                <Container>
                    <Grid container spacing={2} justify="space-between">
                        <Grid item md={12}>
                            <Typography>Welcome, {name}</Typography>
                            <br />
                        </Grid>
                        <Grid item md={10}>
                            <Typography variant={"h5"}>Book List</Typography>
                        </Grid>
                        <Grid item md={2}>
                            <TextField sx={{float: "right"}} id="outlined-basic" label="Search book" value={search} onChange={e => {setSearch(e.target.value)}} onKeyUp={e => {
                                if(e.code == 'Enter') {
                                    doSearch();
                                }
                            }} variant="outlined" />
                        </Grid>

                        <Grid item md={12}>
                            {(data.length >= 1) &&
                                <>
                                  <Typography>Found {data.length} results!</Typography>
                                    <hr/>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        <Typography variant={"h6"}>Title</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant={"h6"}>Description</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant={"h6"}>Author</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant={"h6"}>Year</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant={"h6"}>Price</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {(data).map(book => {
                                                    return(
                                                        <TableRow>
                                                            <TableCell>
                                                                {book.title}
                                                            </TableCell>
                                                            <TableCell>
                                                                {book.description}
                                                            </TableCell>
                                                            <TableCell>
                                                                {(book.author) ? <>{book.author}</> : <i>Unknown</i> }
                                                            </TableCell>
                                                            <TableCell>
                                                                {book.releaseYear}
                                                            </TableCell>
                                                            <TableCell>
                                                                $ {book.price}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                                }
                                            </TableBody>

                                        </Table>
                                    </TableContainer>
                                </>
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}