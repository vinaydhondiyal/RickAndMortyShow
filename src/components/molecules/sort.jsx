import React from 'react';
import {Form} from 'react-bootstrap'; 

const Sort = (props) => {
    //console.log(props);
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
 
export default Sort;