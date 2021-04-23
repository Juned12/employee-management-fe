import React from 'react';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import api from '../helper/api-service'


const DeleteEmployee = (props ) => {
 
    function deleteEmpRecord() {     
      api.deleteEmployee(props.id)
        .then(res => {
            props.handleSubmit('delete')
          })
          .catch(err => {
            return
          })
    }
    function confirmDeleteEmployee() {
        confirmAlert({
          title: 'Confirm to Delete',
          message: 'Are you sure ?.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => deleteEmpRecord()
            },
            {
              label: 'No',
            }
          ]
        });
      }
    return(
        <a 
          className="btn-sm btn-danger" 
          style={{marginLeft: "auto", color:"white"}} 
          onClick={confirmDeleteEmployee}
          >
          Delete
        </a>
    )
}

export default DeleteEmployee;