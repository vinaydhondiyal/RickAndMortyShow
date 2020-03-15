import React from 'react';
import {Form} from 'react-bootstrap'; 

const Sort = () => {
    return ( 
        <React.Fragment>
            <Form.Label></Form.Label>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select">
                <option>Sort by id</option>
                <option>Ascending</option>
                <option>Desending</option>
                </Form.Control>
            </Form.Group>
        </React.Fragment>
     );
}
 
export default Sort;