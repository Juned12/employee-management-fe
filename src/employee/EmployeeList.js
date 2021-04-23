import React from 'react';
import ModalForm from './Modal'
import DeleteEmployee from './DeleteEmployee'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import api from '../helper/api-service'
import PaginateTable from "../components/PaginateTable";


class EmployeeList extends React.Component {
   
    constructor(props){
        super(props);
        this.retrieveEmployees = this.retrieveEmployees.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handlePagination = this.handlePagination.bind(this);

        this.state = {
            employees: [], 
            page: 1,
            count: 0,
            pageSize: 5,
            searchField: '',
            showModal:false,
            employeeDetail: {}
          };
        }   
      
      componentDidMount(){
          this.retrieveEmployees(this.state.page, this.state.pageSize)
      }
      
      retrieveEmployees(page, pageSize ) {
        api.getEmployees(page, pageSize)
        .then(res => {
          const { results, total_pages } = res.data;
          this.setState({
              employees: results,
              count: total_pages,
            });
        })
        .catch((err) => {
          return
        });
      }

      handlePagination(page,pageSize) {
        this.retrieveEmployees(page, pageSize)
      }
        
      editEmployee(row) {
        this.setState({
            employeeDetail:row,
            showModal: true
        });
      }
    openModal = () => this.setState({ 
        showModal: true,
        employeeDetail: {
            id:null,
            first_name: '',
            last_name: '',
            email: '',
            dob: '',
            address: '',
            company: '',
            emp_id: '',
            mobile: '',
            city: '',
            password: ''
        }
    });
    closeModal = () => this.setState({ showModal: false });
    showModal(employeeDetail) {
      this.setState({employeeDetail:employeeDetail})
      this.setState({ showModal: true })
    }
    handleSubmit(e){ 
      this.retrieveEmployees(this.state.page, this.state.pageSize);
      this.setState({ showModal: false })
      this.setState({employeeDetail:{}})
      if(e==='create') {
        NotificationManager.success('Employee Created successully', 'success', 3000);
      }
      if(e==='delete') {
        NotificationManager.success('Employee deleted successully', 'success', 3000);
      } 
      if(e==='edit') {
        NotificationManager.success('Employee Updated successully', 'success', 3000);
      }

    } 
      render(){
        const {   
            count,
          } = this.state;
        return (   
            <div className="card-list">
              <div style={{maxWidth: "80%", margin: "auto", marginTop: "1em", marginBottom: "1em",
                      padding: "1em"}} className="shadow">
                  <div>
                    <a className="btn btn-primary" style={{float: "right", color:"white"}} onClick={this.openModal}>Add Employee</a>
                        <ModalForm 
                            closeModal={this.closeModal}
                            isOpen={this.state.showModal}
                            openModal={this.showModal}
                            employeeDetail={this.state.employeeDetail} 
                            handleSubmit={this.handleSubmit}
                        />
                  </div>
                  <PaginateTable
                    count={count}
                    handlePagination={this.handlePagination}
                  />
                 
                <div className="table-responsive">
                  <table className="table table-hover caption-top">
                      <thead className="table-light">
                          <tr>
                              <th>Id</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Date of Birth</th>
                              <th>Email</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                      { this.state.employees.map((row)=>
                        <tr key={row.id}>
                            <td>{row.emp_id}</td>
                            <td>{row.first_name}</td>
                            <td>{row.last_name}</td>
                            <td>{row.dob}</td>
                            <td>{row.email}</td>
                            <td>
                                <a className="btn-sm btn-info" style={{marginLeft: "auto", color:"white"}} onClick={(e)=>{this.editEmployee(row)}}
                                >Edit</a>{" "}
                                <DeleteEmployee 
                                  id={row.id}
                                  handleSubmit={this.handleSubmit}
                                />
                            </td>
                        </tr>
                      )}
                      </tbody>
                  </table>
                </div>
              </div>
            <NotificationContainer/>
            </div>
        )
    }
}

export default EmployeeList;