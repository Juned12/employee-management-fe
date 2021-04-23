import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated, error }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    });
    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    if (isAuthenticated) {
        return <Redirect to='/home' />
    }

    return (
       
      <div
        className="col-md-4 m-auto"
        style={{ justifySelf: "center", alignSelf: "center" }}
        >
        <div className="card mt-4 p-4">
          { error &&
                Object.keys(error).map((key, index) => ( 
            <div className="alert alert-danger" role="alert">
                {error[key]}
            </div>

                ))
          }
          <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                onChange={e => onChange(e)}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={e => onChange(e)}
                value={password}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          <div className="text-center">
            <small className="form-text text-muted">
              Don't have an account. <Link to="/signup">Register Here</Link>
            </small>
          </div>
        </div>
      </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error
});

export default connect(mapStateToProps, { login })(Login);