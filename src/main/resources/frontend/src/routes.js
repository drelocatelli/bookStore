import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

import {Home} from './Pages/Home';
import Register from './Pages/Register';
import Main from './Pages/Main';

export default() => {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/register" element={<Register/>} />
                <Route exact path="/main" element={<Main />} />

            </Routes>
        </BrowserRouter>
    )
}