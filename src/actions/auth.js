import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT,
    SET_TOKEN
} from './types';
import api from '../helper/api-service'

export const load_user = () => async dispatch => {
    if (localStorage.getItem('manager_access')) {
        try {
            const res = await api.me()
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};


export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('manager_access')) {
        
        try {
            const body = { token : localStorage.getItem('manager_access') };
            const res = await api.validateToken(body)
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } 
        
        } catch (err) { 
            try {
                const refreshBody = { refresh: localStorage.getItem('manger_refresh')};
                const res = await api.refreshToken(refreshBody)
                dispatch({
                    type: SET_TOKEN,
                    payload: res.data
                })
                // dispatch(load_user());
            } catch (err) {
                dispatch({
                    type: LOGOUT
                });
            }
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const body = { email, password };

    try {
        const res = await api.login(body)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data
        })
    }
};

export const signup = (first_name, last_name, email,dob, address, company, password, password2) => async dispatch => {
 
    const body = { first_name, last_name, email,dob, address, company, password, password2 };

    try {
        const res = await api.signup(body)
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: err.response.data
        })
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};
