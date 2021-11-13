import axios from 'axios';
import ApiService from "./ApiService";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export const LoginService = () => {

    const navigate = useNavigate();

    ApiService().get("/users/me", {
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(response => {
            console.log(response);
            return true;
        }).catch(err => {
            navigate("/");
            return false;
    })

}