import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Main from './Pages/Main';

import {AuthProvider} from './Authentication/AuthProvider'
import {PrivateRoute} from './Authentication/PrivateRoute'


export default() => {
    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route exact path={"/"} element={<Login/>} />
                    <Route path={"/register"} element={<Register/>} />
                    <Route path={"/main"} element={<PrivateRoute><Main /></PrivateRoute>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}