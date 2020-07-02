import React from 'react';
import {Form} from 'react-bootstrap';
import {connect} from 'react-redux';
//import client from '../../api';

const Sort = (props) => {
    console.log(props);
    return ( 
        <React.Fragment>
            <Form.Label></Form.Label>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" onChange={props.changeSortValue} value={props.sortValue}>
                <option value=''>Sort by id</option>
                <option value='asc' >Ascending</option>
                <option value='desc' >Descending</option>
                </Form.Control>
            </Form.Group>
        </React.Fragment>
     );
}
var mapStateToProps=(state)=>({
    ...state
});
var mapDispatchToProps=(dispatch)=>{
    return {
        changeSortValue:event=>dispatch({ 
            type:'CHANGE_SORT_VALUE',
            payload:event
        })
    }
};
 
export default connect(mapStateToProps,mapDispatchToProps)(Sort);