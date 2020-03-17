import React, { Component } from 'react';
import {Col,Form,Button} from 'react-bootstrap'; 

class Search extends Component {
    state = {  }
    render(props) { 
        return ( 
            <Form className="justify-content-md-left">
                <Form.Label>Search By Name</Form.Label>
                <Form.Row>                
                    <Col sm="auto" xs="12">
                    <Form.Control placeholder="Enter Name" onChange={this.props.searchQueryUpdate} value={this.props.searchValue}  />
                    </Col>
                    <Col sm="auto" className="d-none d-sm-block">
                    <Button variant="light" type="submit" onClick={this.props.searchQuery}> Submit</Button>
                    </Col>
                </Form.Row>
            </Form> 
        );
    }
}
 
export default Search;