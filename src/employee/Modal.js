import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import api from '../helper/api-service'
import EmployeeForm from './EmployeeForm'


const ModalForm = (props ) => {
    const [formData, setFormData] = useState({});
    const [errors, setError] = useState({})
    
    useEffect(() => {
      setFormData(props.employeeDetail);
  }, [props])
  
    const { id } = formData;

    function updateEmployee(id,data) {
      api.updateEmployee(id, data)
        .then(res => {
            props.handleSubmit('edit')
            setError({})
          })
          .catch(error => {
            setError(error.response.data)
            props.openModal(data)
            return
          })
    }
    function onSubmit (e,data) {
      setFormData(data)
      if (data.mobile.toString().length!==10) {
        setError({'mobile': "Invalid Mobile Number"})
      } else if (data.password.length<6){
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
                  onClick: () => updateEmployee(id,data)
                },
                {
                  label: 'No',
                  onClick: () => props.openModal(data)
                }
              ]
            });  
          } else {
              api.createEmployee(data)
              .then(res => {
                  props.handleSubmit('create')
                  setError({})
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
          <EmployeeForm
            handleSubmit={onSubmit}
            errors={errors}
            formData={formData}
          />
        </Modal.Body>    
      </Modal>
    ) 
}

export default ModalForm;