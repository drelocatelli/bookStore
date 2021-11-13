import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Main from './Pages/Main';

export default() => {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/register" element={<Register/>} />
                <Route exact path="/main" element={<Main />} />

            </Routes>
        </BrowserRouter>
    )
}