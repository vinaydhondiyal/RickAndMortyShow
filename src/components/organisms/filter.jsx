import React,{Component} from 'react';
import {Col,Form} from 'react-bootstrap';
import {connect} from 'react-redux';



  
class Filter extends Component {
    onCheck=(event)=>{
        this.props.checkboxClick(event)
    }
  
    
    getListItems = ()=>{
         return Object.keys(this.props.filter).map((type,index)=>{
                if(this.props.filter[type].length){
                    return(
                            <Col key={index} className="filter_box">
                                    <h3>{type}</h3>
                                    <ul>                         
                                    { this.props.filter[type].map((item,index)=>

                                        (  <li key={index}>
                                            <Form.Check  
                                                onChange={(e)=>this.onCheck(e)} 
                                                type="checkbox" data-type={type} 
                                                id={item} 
                                                value= {item.split(" ").join("").replace(/[(,),',.]/g,'')} 
                                                label={item}
                                            />
                                            </li>
                                        )                                  
                                    )}
                                        
                                    </ul>
                            </Col>
                    )

                }            
            })
        
    }
    
     
    render(){ 
            //console.log(this.props);
        return(
            <React.Fragment>
            {this.getListItems()}
            </React.Fragment>
            
        )
    }

}

var mapStateToProps = (state)=>({
    ...state
});


var mapDispatchToProps = (dispatch)=>{
    return {
      
        checkboxClick:event=>dispatch({
            type:'CHECKBOX_CLICK',
            payload:event
        }),
    }
        
};
 
export default connect(mapStateToProps,mapDispatchToProps)(Filter);