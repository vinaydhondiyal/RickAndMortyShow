import React, { Component } from 'react';
import {Col,Form,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import client from '../../api';
import gqlQuery from '../../api/graphQL';

class Search extends Component {
    
    onSubmit(event){
        event.preventDefault();
        this.props.searchQuery(gqlQuery(this.props.page ,`{name:"${this.props.searchValue}"}`));
    }

    render() { 
        //console.log(this.props);
        return ( 
            <Form className="justify-content-md-left">
                <Form.Label>Search By Name</Form.Label>
                <Form.Row>                
                    <Col sm="auto" xs="12">
                    <Form.Control placeholder="Enter Name" onChange={this.props.searchQueryUpdate} value={this.props.searchValue}  />
                    </Col>
                    <Col sm="auto" className="d-none d-sm-block">
                    <Button variant="light" type="submit" onClick={(e)=>this.onSubmit(e)}> Submit</Button>
                    </Col>
                </Form.Row>
            </Form> 
        );
    }
}
var mapStateToProps=(state)=>({
    ...state
});
var mapDispatchToProps=(dispatch)=>{
    return {
    searchQuery:data=>dispatch({ 
        type:'SEARCH_QUERY',
        payload: client.query({ query:data})
    }),
    searchQueryUpdate:event=>dispatch({
        type:'SEARCH_QUERY_UPDATE',
        payload: event
    })

    }
};
 
export default connect(mapStateToProps,mapDispatchToProps)(Search);