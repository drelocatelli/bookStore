import React, {useEffect, useState} from 'react';
import Navbar from "../Components/Navbar";
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

export default() => {

    useEffect(() => {
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
            <Navbar />
            <Box mt={18}>
                <Container>
                    <Grid container spacing={2} justify="space-between">
                        <Grid item md={10}>
                            <Typography variant={"h5"}>Listing all books</Typography>
                        </Grid>
                        <Grid item md={2}>
                            <TextField sx={{float: "right"}} id="outlined-basic" label="Search book" value={search} onChange={e => {setSearch(e.target.value)}} onKeyUp={e => {
                                if(e.code == 'Enter') {
                                    doSearch();
                                }
                            }} variant="outlined" />
                        </Grid>
                        <Grid item md={12}>
                            {(message) &&
                                <Alert severity={messageType}>
                                    {message}
                                </Alert>
                            }
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
                                                        <Typography variant={"h5"}>Title</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant={"h5"}>Description</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant={"h5"}>Author</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant={"h5"}>Year</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant={"h5"}>Price</Typography>
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
                                                                {book.author}
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