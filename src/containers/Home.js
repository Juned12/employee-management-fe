import React from 'react';
import { Redirect } from 'react-router-dom';
import EmployeeList from '../employee/ListEmployee'
import { connect } from 'react-redux';
import { logout } from '../actions/auth';


export const Home  = ({ isAuthenticated }) => {
    if (isAuthenticated==false) {
        return <Redirect to='/' />
    }
    return (   
        <EmployeeList></EmployeeList>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Home);

