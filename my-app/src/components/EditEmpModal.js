import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form, FormGroup} from'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditEmpModal extends Component{
  constructor(props){
    super(props);
    this.state={emps:[],snackbaropen:false,snackbarmsg:''};
    this.handleSubmit=this.handleSubmit.bind(this);
}
componentDidMount(){
  fetch('https://localhost:44301/api/employee')
  .then(response=> response.json()) //convert response into json data
  .then(data =>{
      this.setState({emps:data});
  });
}


snackbarClose = (event) =>{
    this.setState({snackbaropen:false});
  };
  handleSubmit(event){
    event.preventDefault();
 
    fetch('https://localhost:44301/api/employee',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        EmpoyeeId:event.target.EmployeeId.value,
        EmployeeName:event.target.EmployeeName.value,
        Department:event.target.Department.value,
        MailID:event.target.MailID.value,
        DOJ:event.target.DOJ.value
 
      })
    })
    .then(res=> res.json()) //converting response to json
    .then((result)=>{
     this.setState({snackbaropen:true, snackbarmsg:result});
    },
    (error)=>{
     // alert('failed') //if result doesnt appear then failed message appears
     this.setState({snackbaropen:true, snackbarmsg:'failed'});
 
    }
    )
  }
 
  render()
  {
      return(

        //(' yesto open bracket same line ma hunu purxa natra error(Expected an assignment or function call instead saw an Exception aauxa)
        <div className="container">
          <Snackbar
          anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
          }}           
          open = {this.state.snackbaropen} //it will open based on the value inside curly braces
          autoHideDuration={3000}
          onClose={this.snackbarClose}

      message={<span id='message-id'>{this.state.snackbarmsg}</span>}  //mesage thiyo message banako ani setState lai state banako
      action={[
        <IconButton
        key="Close"
        arial-Label="Close"  //ariel thiyo arial banako
        color="inherit"
        onClick={this.snackbarClose}
        >x</IconButton>
      ]}
          />
 <Modal
        {...this.props}//kaha ko props define vako xoina vane props lai this.props garnu purxa
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <Row>
        <Col sm={6}>
          <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="EmployeeId">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
               type="text" 
               name="EmployeeName"
                required
                disabled
                defaultValue={this.props.empid}

                 placeholder="Employee Name"/>
              

            </Form.Group>
            <Form.Group controlId="EmployeeName">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
               type="text" 
               name="EmployeeName"
                required
                defaultValue={this.props.empname}

                 placeholder="Employee Name"/>
              

            </Form.Group>
            <Form.Group controlId="Department">
              <Form.Label>Department</Form.Label>
              <Form.Control as="select"  defaultValue={this.props.Department}>  {
                  this.state.emps.map(emp=>
                  <option key={emp.DepartmentId}>{emp.Department}</option>

                  )}
                </Form.Control>
              

            </Form.Group> <Form.Group controlId="MailID">
              <Form.Label>MailID</Form.Label>
              <Form.Control
               type="text" 
               name="MailID"
                required
                defaultValue={this.props.empmail}
                 placeholder="Email Address"/>
              

            </Form.Group> <Form.Group controlId="DOJ">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
               type="date" 
               name="DOJ"
                required
                defaultValue={this.props.empdoj}
                 placeholder="Date of Join"/>
              

            </Form.Group>
            <FormGroup>
              <Button variant="primary" type="submit">Add </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
        </div>

      );
  }
}  