import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated, user }) => {

    const logout_user = () => {
        logout();
    };

    return (
      <nav className="navbar navbar-light bg-light">
        {user && <a className="navbar-brand">Welcome {user.first_name} {user.last_name}</a> }
          {isAuthenticated &&
            <Fragment>
                <button
                  type="submit"
                  className="nav-link btn btn-danger btn-sm"
                  onClick={logout_user}
                  style={{"color":"white"}}
                >
                  Logout
                </button>
            </Fragment>
          }
       </nav>

    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Navbar);