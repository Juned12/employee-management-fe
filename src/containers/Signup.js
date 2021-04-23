import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';

const Signup = ({ signup, isAuthenticated, error })   => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        dob: '',
        address: '',
        company: '',
        password: '',
        password2: ''
    });
 
    const { first_name, last_name, email,dob, address, company, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        signup(formData)
    };

    if (isAuthenticated) {
        return <Redirect to='/home' />
    }
 
    return (
        <div className="col-md-6 m-auto">
          <div className="card mt-4 p-4">
            <form onSubmit={e => onSubmit(e)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="first_name"
                      placeholder="Enter First Name"
                      onChange={e => onChange(e)}
                      value={first_name}
                      required
                    />
                  <p className="text-danger" >{error?.first_name}</p> 
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      placeholder="Enter Last Name"
                      onChange={e => onChange(e)}
                      value={last_name}
                      required
                    />
                  <p className="text-danger" >{error?.last_name}</p> 
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>Date Of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    placeholder="Enter Date of Birth"
                    onChange={e => onChange(e)}
                    value={dob}
                    required
                  />
                  <p className="text-danger" >{error?.dob}</p> 
                </div>

                <div className="col-md-6 form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter Email"
                    onChange={e => onChange(e)}
                    value={email}
                    required
                  />
                  <p className="text-danger" >{error?.email}</p> 
                </div>
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  className="form-control"
                  name="company"
                  placeholder="Enter Company"
                  onChange={e => onChange(e)}
                  value={company}
                  required
                />
                <p className="text-danger" >{error?.company}</p> 
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Enter Address"
                  onChange={e => onChange(e)}
                  value={address}
                  required
                />
                <p className="text-danger" >{error?.address}</p> 
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
                  required
                />
                <p className="text-danger" >{error?.password}</p> 
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  placeholder="Password"
                  onChange={e => onChange(e)}
                  value={password2}
                  required
                />
                <p className="text-danger" >{error?.password2}</p> 
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </form>
            <div className="text-center">
              <small className="form-text text-muted">
                Already have an account. <Link to="/">Login Here</Link>
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

export default connect(mapStateToProps, { signup })(Signup);