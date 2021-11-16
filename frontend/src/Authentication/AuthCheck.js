import React from 'react';
import ApiService from "../Service/ApiService";
import Cookies from "js-cookie";

export default async () => {

    // --------------------------------------- verify token
    return await ApiService().get("/users/me", {
        headers: {
            'Authorization': `Bearer ${Cookies.get("token")}`,
            'Access-Control-Allow-Origin': '*'
        }
    })

}