import React from 'react';
import { Redirect } from 'react-router-dom';
import EmployeeList from '../employee/EmployeeList'
import { connect } from 'react-redux';
import { logout } from '../actions/auth';


export const Home  = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Redirect to='/' />
    }
    return (   
        <EmployeeList />
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Home);