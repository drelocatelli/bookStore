import React from 'react';
import {CircularProgress} from "@material-ui/core";

export default() => {

    return(
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"100vh"}}>
            <CircularProgress color="secondary" />
        </div>
    )

}