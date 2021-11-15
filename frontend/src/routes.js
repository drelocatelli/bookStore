import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Main from './Pages/Main';
import AddBook from './Pages/AddBook';
import Logout from './Pages/Logout';

export default() => {
    return(
        <BrowserRouter>
                <Routes>
                    <Route exact path={"/"} element={<Login/>} />
                    <Route path={"/register"} element={<Register/>} />

                    <Route path={"/main"} element={<Main />} />
                    <Route path={"/addBook"} element={<AddBook />} />
                    <Route exact path={"/logout"} element={< Logout />} />
                </Routes>
        </BrowserRouter>
    )
}