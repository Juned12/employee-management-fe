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
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('manager_access'),
    refresh: localStorage.getItem('manager_refresh'),
    isAuthenticated: true,
    user: null
};

export default function(state = initialState, action = {}) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('manager_access', payload.access);
            localStorage.setItem('manager_refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case SIGNUP_SUCCESS:
            localStorage.setItem('manager_access', payload.token.access);
            localStorage.setItem('manager_refresh', payload.token.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.token.access,
                refresh: payload.token.refresh,
                user: payload
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            return {
                ...state,
                isAuthenticated:false,
                error: payload
            }
        case LOGOUT:
            localStorage.removeItem('manager_access');
            localStorage.removeItem('manager_refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case SET_TOKEN:
            localStorage.setItem('manager_access', payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh:null
            }
        default:
            return state
    }
};