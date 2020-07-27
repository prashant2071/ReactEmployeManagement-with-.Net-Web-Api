import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

export class  Employee extends Component{
    constructor(props){
        super(props)
        this.state={emps:[],addModalshow:false,editModalShow:false}

    }

    componentDidMount(){
        this.refreshList();
    }
    refreshList(){
        fetch('https://localhost:44301/api/employee')
        .then(response=> response.json()) //convert response into json data
        .then(data =>{
            this.setState({emps:data});
        });
    }

        componentDidUpdate(){
            this.refreshList();
        }
        deleteEmp(empid)
        {
                if(window.confirm('Are you sure?'))
        {
                    fetch('https://localhost:44301/api/employee/'+empid,{
                        method:'DELETE',
                        headers:{
                          'Accept':'application/json',
                          'Content-Type':'application/json'
                        }
                })
            } //yaha commma , missing expected vanxa tara missing close bracket hunxa ")"
    
    
        }

    render(){ //this is basically whats need to be rendered when the component is called or initiated
        const {emps,empid,empname,empdep,empmail,empdoj}=this.state;//here we have to again declare (object) from the (state)
        let addModalClose =() =>this.setState({addModalShow:false})
        let editModalClose =() =>this.setState({editModalShow:false})
            return(
                <div>
                     <Table className="mt-4" striped bordered hover size="sm">
               <thead>
                   <tr>
                   <th>Employee Id</th>
                   <th>Employee Name</th>
                   <th>Department</th>
                   <th>Email Address</th>
                   <th>Date of Join</th>
                   <th>Action</th>
                   </tr>
               </thead>
               <tbody>
                {emps.map(emp=>
                    <tr key={emp.EmployeeId}>
                    <td>{emp.EmployeeId}</td>
                    <td>{emp.EmployeeName}</td>
                    <td>{emp.Department}</td>
                    <td>{emp.MailID}</td>
                    <td>{emp.DOJ}</td>


                    <td><ButtonToolbar>
                       <Button
                        className="mr-2" variant="success"
                        onClick={()=> this.setState({editModalShow:true, empid:emp.EmployeeId, empname:emp.EmployeeName,empdep:emp.Department,empmail:emp.MailID,empdoj:emp.DOJ})}
                        > Edit
                        </Button>
                        <Button
                        className="mr-2" variant="danger"
                        onClick={()=>  this.deleteEmp(emp.EmployeeId)}//expected ',' comma means ki curly or open bracket badhi ya kam xa
                        > Delete
                        </Button>
                        <EditEmpModal
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        empid={empid}
                        empname={empname}
                        empmail={empmail}
                        empdep={empdep}
                        empdoj={empdoj}
                        />
               
                    </ButtonToolbar></td>
                    
                    </tr>
                    )}
               </tbody>
               </Table>
               <ButtonToolbar>
                   <Button variant="primary"
                    onClick={()=>this.setState({addModalShow:true})}>
                            Employee Department
                   </Button>
                   <AddEmpModal 
                   show={this.state.addModalShow}
                   onHide={addModalClose}
                   />
               </ButtonToolbar>
                </div>
            )
    } 
}