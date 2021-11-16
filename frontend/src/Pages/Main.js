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

import AuthCheck from '../Authentication/AuthCheck';

export default() => {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);
    const [logged, setLogged] = useState();

    useEffect(async () => {

        const authentication = await AuthCheck();
        if(authentication.status == 200) {
            setUser(authentication.data);
            setLogged(true);
        }else {
            setUser(null);
            setLogged(false);
        }

        findBooks();

    }, []);

    // Books

    const [search, setSearch] = useState("");
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [totalBooks, setTotalBooks] = useState();
    const [booksElements, setBooksElements] = useState();

    const [page, setPage] = useState(1);

    function paginate(event, value) {
        let page = parseInt(value) - 1;

        findBooks(page);
    }

    async function findBooks(page, perpage, findTitle) {
        let title = (findTitle != undefined) ? findTitle : "";
        let size = (perpage != undefined) ? perpage : 5;
        let webservice = (page != undefined) ? `/books/search?title=${title}&page=${page}&size=${size}` : `/books/search?title=${title}&page=0&size=${size}`;

        const response =  await ApiService().get(webservice, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Access-Control-Allow-Origin': '*'
            }
        })

        // let responseData = response.data.content.sort((a, b) => a.title.localeCompare(b.title));
        setTotalBooks(response.data.totalElements);
        setSearchedBooks(response.data.content);
        setBooksElements(response.data.numberOfElements);
        setPage(response.data.totalPages);

        return response.data;

    }

    // search books
    async function doSearch() {

        const books = await findBooks(0, search ? 2000 : undefined, search);
        setSearchedBooks(books.content);

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
                                        <Typography>Books per page: {booksElements}</Typography>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Pagination count={page} color="primary" onChange={paginate} />
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