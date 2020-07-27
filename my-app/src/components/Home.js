import React,{Component} from 'react';
//Component can be anything it can be model pop_up check_box or the pages it has multiple application
export class Home extends Component{//Basically we are trying to Create class Home as components 

    render(){ //this is basically whats need to be rendered when the component is called or initiated
            return(
                <div className="mt-5 d-flex justify-content-left">
                    <h3>This is employee managemnet .
                        This is Home Page
                    </h3>
                </div>
            )
    } 
}   