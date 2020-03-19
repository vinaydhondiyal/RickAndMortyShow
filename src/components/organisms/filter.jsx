import React from 'react';
import {Col,Form} from 'react-bootstrap'; 



const Filter = (props) => {
        
        return ( 
           
            <Col className="filter_box">
                <h3>{props.type}</h3>
                <ul>
                
               { props.data.map((item,index)=>{
                    return (<li key={index}><Form.Check  onChange={props.checkboxClick} type="checkbox" data-type={props.type} id={item} value= {item.split(" ").join("").replace(/[(,),',.]/g,'')} label={item}/></li>)
                })}
                    
                </ul>
            </Col>
         );
    
}
 
export default Filter;