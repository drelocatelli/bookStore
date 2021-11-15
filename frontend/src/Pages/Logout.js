import React, {useEffect} from "react";

import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";

export default() => {

    const navigate = useNavigate();

    useEffect(() => {
        Cookies.remove("token");
        navigate("/");
    }, [])

    return null;

}
