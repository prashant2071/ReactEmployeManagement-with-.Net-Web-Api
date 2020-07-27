import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AppDepModel} from './AppDepModel';
import {EditDepModal} from './EditDepModal';
//import {DelDepModal} from './DelDepModal'
//Component can be anything it can be model pop_up[] check_box() or the pages it has multiple application
export class Department extends Component{//Basically we are trying to Create class Department as components 

    constructor(props){
        super(props);
        this.state={deps:[],addModalShow :false,editModalShow :false}//deps object is created !! //to initialize (this) keyword we have to Write super
    }
    componentDidMount(){ //here the componentDidMount vanyo vane yo compoonet load vayapaxi  component yo function feri load
        this.refreshList();
    }

    refreshList(){
        fetch('https://localhost:44301/api/department')
        .then(response=> response.json()) //convert response into json data
        .then(data =>{
            this.setState({deps:data});
        });
       /* this.setState({
            deps:[{"DepartmentId":1,"DepartmentName":"IT"},
            {"DepartmentId":2,"DepartmentName":"management"}// this is Dummy Data for test
        ]

        })*/
    }
    componentDidUpdate(){
        this.refreshList();
    }
    deleteDep(depid)
    {
            if(window.confirm('Are you sure?'))
    {
                fetch('https://localhost:44301/api/department/'+depid,{
                    method:'DELETE',
                    headers:{
                      'Accept':'application/json',
                      'Content-Type':'application/json'
                    }
            })
        } //yaha commma , missing expected vanxa tara missing close bracket hunxa ")"


    }
    render(){                                             //this is basically whats need to be rendered when the component is called or initiated
           const {deps,depid,depname}=this.state;//here we have to again declare (object) from the (state)
           let addModalClose =() =>this.setState({addModalShow:false})
           let editModalClose =() =>this.setState({editModalShow:false})


        return(
            <div>
               <Table className="mt-4" striped bordered hover size="sm">
               <thead>
                   <tr>
                   <th>DepartmentId</th>
                   <th>DepartmentName</th>
                   <th>Action</th>
                   </tr>
               </thead>
               <tbody>
                {deps.map(dep=>
                    <tr key={dep.DepartmentId}>
                    <td>{dep.DepartmentId}</td>
                    <td>{dep.DepartmentName}</td>
                    <td><ButtonToolbar>
                       <Button
                        className="mr-2" variant="success"
                        onClick={()=> this.setState({editModalShow:true, depid:dep.DepartmentId, depname:dep.DepartmentName})}
                        > Edit
                        </Button>
                        <Button
                        className="mr-2" variant="danger"
                        onClick={()=>  this.deleteDep(dep.DepartmentId)}//expected ',' comma means ki curly or open bracket badhi ya kam xa
                        > Delete
                        </Button>
                        <EditDepModal
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        depid={depid}
                        depname={depname}
                        />
               
                    </ButtonToolbar></td>
                    
                    </tr>
                    )}
               </tbody>
               </Table>
               <ButtonToolbar>
                   <Button variant="primary"
                    onClick={()=>this.setState({addModalShow:true})}>
                            Add Department
                   </Button>
                   <AppDepModel 
                   show={this.state.addModalShow}
                   onHide={addModalClose}
                   />
               </ButtonToolbar>
               </div>
            )
    } 
}   