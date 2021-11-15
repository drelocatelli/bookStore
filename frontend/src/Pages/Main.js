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
import {Alert, Pagination} from "@mui/material";
import {Navigate, useNavigate} from "react-router-dom";

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

        findBooks();

    }, []);



    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // Books

    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [totalBooks, setTotalBooks] = useState();
    const [booksElements, setBooksElements] = useState();

    function findBooks(page) {
        let size = 10;
        let webservice = (page != undefined) ? `/books/search?size=${size}&page=${page}` : `/books/search?size=${size}&page=0`;

        ApiService().get(webservice, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                console.log(response.data)
                // sort title alphabetically

                let responseData = response.data.content.sort((a, b) => a.title.localeCompare(b.title));
                setData(responseData);
                setTotalBooks(response.data.totalElements);
                setSearchedBooks(responseData);
                setBooksElements(response.data.numberOfElements);
            }).catch(err => {
                console.log(err);
                setMessageType("error");
                setMessage(`An error occurred, see the console`);
        })
    }

    // search books
    function doSearch() {
        if(!search) {
            setMessageType("info");
            setMessage("Listing all books");

            setSearchedBooks(data);
            return;
        }else {
            setMessageType(null);
            setMessage(null);

            // search by query like
            let filtered = data.filter(f => f.title.toLowerCase().includes((search).toLowerCase().trim()));
            setSearchedBooks(filtered);
        }

    }

    if(!logged) {
        return <Typography>You don't have permission.</Typography>
    } else{
        return(
            <>
                <NavbarMain />
                <Box mt={18} mb={10}>
                    <Container>
                        <Grid container spacing={2} justify="space-between">
                            <Grid item md={12}>
                                <Typography>Welcome, {user.name}</Typography>
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
                                {(searchedBooks.length >= 1) &&
                                <>
                                    <Typography>Found {totalBooks} results!</Typography>
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
                                                {(searchedBooks).map(book => {
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
                            {(searchedBooks.length >= 1) &&
                                <>
                                    <Grid item md={10}>
                                        <Typography>Pagination: {booksElements} books</Typography>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Pagination count={searchedBooks.totalPages} />
                                    </Grid>
                                </>
                            }
                        </Grid>
                    </Container>
                </Box>
            </>
        )
    }


}