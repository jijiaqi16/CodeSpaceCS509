import axios from '../../axios/axios-local'
import { userGet } from './user'
import * as actionTypes from './actionTypes';


export const auth = (userName, password) => {

    const param = {
        username: userName,
        password: password
    }
    //send params instead of payload
    const querystring = require('querystring');

    return (dispatch) => {
        dispatch(authStart());
        axios.post('/login', querystring.stringify(param))
            .then(response => {
                
                let token = response.headers["token"];
                
                if (token !== undefined) {
                    localStorage.setItem('token',token);
                    dispatch(authSuccess());
                    dispatch(userGet(param.username,token));
                }else{
                    dispatch(authFail(response.data));
                }
            });
        return Promise.resolve();

    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS,
    }
}

export const authFail = (loginError)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        loginError:loginError
    }
}


export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('useremail');
    localStorage.removeItem('iconName');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}