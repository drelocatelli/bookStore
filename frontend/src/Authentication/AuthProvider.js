import React from 'react'
import Cookies from 'js-cookie';

let AuthContext = React.createContext();

export const AuthProvider = ({children}) => {

    let [isAuth, setAuth] = React.useState(false);

    const changeToAuth = (callback) => {
        setAuth(true)

        callback()
    }

    const logout = () => {
        setAuth(false)
        Cookies.remove("token");
    }

    let value = { isAuth, changeToAuth, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    
}

export const useAuth = () => {
    return React.useContext(AuthContext);
}