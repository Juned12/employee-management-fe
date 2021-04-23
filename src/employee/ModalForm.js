import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import api from '../helper/api-service'


const ModalForm = (props ) => {
    const [formData, setFormData] = useState({});
    const [errors, setError] = useState({})
    
    useEffect(() => {
      setFormData(props.employeeDetail);
      setError({})
  }, [props])
  
    const { first_name, last_name, email, dob, address, company, password, mobile, city, emp_id, id } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    function updateEmployee(id) {
              
      api.updateEmployee(id, formData)
        .then(res => {
            props.handleSubmit('edit')
          })
          .catch(error => {
            setError(error.response.data)
            props.openModal(formData)
            return
          })
    }

    const onSubmit = e => {
      if (mobile.toString().length!=10) {
        setError({'mobile': "Invalid Mobile Number"})
      } else if (formData.password.length<6){
        setError({'password': "Minimum 6 character required"})
      } else {
          if (id) {
            props.closeModal();
            confirmAlert({
              title: 'Confirm the Update',
              message: 'Are you sure ?.',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => updateEmployee(id)
                },
                {
                  label: 'No',
                  onClick: () => props.openModal(formData)
                }
              ]
            });  
          } else {
              api.createEmployee(formData)
              .then(res => {
                  props.handleSubmit('create')
                })
              .catch(error => {
                setError(error.response.data)
                return
              })
          }
      }
    e.preventDefault();
    }

    return(
      <Modal 
        show={props.isOpen}
        onHide={props.closeModal}
      >
        <Modal.Header closeButton>
        { id &&
          <Modal.Title>Update Employee</Modal.Title> ||
          <Modal.Title>Create Employee</Modal.Title> 
        }
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={e => onSubmit(e)}>
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
              {id && <button type="submit" className="btn btn-primary btn-block">
                Update
              </button> || 
              <button type="submit" className="btn btn-primary btn-block">
                Create
              </button>
            }
          </form>
        </Modal.Body>    
      </Modal>
    )
  
}

export default ModalForm;