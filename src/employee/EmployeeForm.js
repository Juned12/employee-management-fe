import React, { useState, useEffect } from 'react';


const EmployeeForm = (props ) => {
    const [formData, setFormData] = useState({});
    const [errors, setError] = useState({})
    
    useEffect(() => {
      setFormData(props.formData);
      setError(props.errors)
  }, [props])
  
    const { first_name, last_name, email, dob, address, company, password, mobile, city, emp_id, id } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    return(
        <form onSubmit={e => props.handleSubmit(e,formData)}>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        onChange={e => onChange(e)}
                        value={first_name}
                        required
                    />
                    <p className="text-danger">{ errors.first_name }</p>
                    </div>
            
                    <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        onChange={e => onChange(e)}
                        value={address}
                        required
                    />
                    <p className="text-danger">{ errors.address }</p>
                    </div>
                    <div className="form-group">
                    <label>Date Of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        name="dob"
                        onChange={e => onChange(e)}
                        value={dob}
                        required
                    />
                    <p className="text-danger">{ errors.dob }</p>
                    </div>
                    <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={e => onChange(e)}
                        value={email}
                        required
                    />
                    <p className="text-danger">{ errors.email }</p>
                    </div>
                    <div className="form-group">
                    <label>Company</label>
                    <input
                        type="text"
                        className="form-control"
                        name="company"
                        onChange={e => onChange(e)}
                        value={company}
                        required
                    />
                    <p className="text-danger">{ errors.company }</p>
                    </div> 
                </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        onChange={e => onChange(e)}
                        value={last_name}
                        required
                    />
                    <p className="text-danger">{ errors.last_name }</p>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={e => onChange(e)}
                        value={password}
                        required
                    />
                    <p className="text-danger">{ errors.password }</p>
                </div>
                <div className="form-group">
                    <label>Employee Id</label>
                    <input
                        type="text"
                        className="form-control"
                        name="emp_id"
                        onChange={e => onChange(e)}
                        value={emp_id}
                        required
                    />
                    <p className="text-danger">{ errors.emp_id }</p>
                </div>
                <div className="form-group">
                    <label>Mobile</label>
                    <input
                        type="number"
                        className="form-control"
                        name="mobile"
                        onChange={e => onChange(e)}
                        value={mobile}
                        required
                    />
                    <p className="text-danger">{ errors.mobile }</p>
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input
                        type="text"
                        className="form-control"
                        name="city"
                        onChange={e => onChange(e)}
                        value={city}
                        required
                    />
                    <p className="text-danger">{ errors.city }</p>
                </div>
            </div>
            </div>
            {id && 
                <button type="submit" className="btn btn-primary btn-block">
                Update
                </button> || 
                <button type="submit" className="btn btn-primary btn-block">
                Create
                </button>
            }
        </form>
    )
}

export default EmployeeForm;