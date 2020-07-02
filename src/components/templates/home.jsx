import React,{Component} from 'react';
import {Container,Row,Col,Accordion,Card,Button,Spinner} from 'react-bootstrap';
import {connect} from 'react-redux';
import gqlQuery from '../../api/graphQL';

import client from '../../api';
import {ApolloProvider} from '@apollo/react-hooks';
import {IoIosAddCircle} from "react-icons/io";



import List from '../organisms/list';
import Search from '../molecules/search';
import Sort from '../molecules/sort';
import Filter from '../organisms/filter';
import Badge from '../atom/badge';



class Home extends Component {
    //Inital state hydration 
    componentDidMount=()=>{
        console.log(gqlQuery());
        this.props.searchQuery(gqlQuery())
    }

    // Checks for State Update
    componentDidUpdate(prevProps, prevState){
        let targ = this.props.selectArray;
        if(targ.length>0){
            document.querySelectorAll('.items').forEach((el)=> el.classList.remove('filtered'));
            targ = targ.map((item)=> '.'+item);        
            document.querySelectorAll(targ.join(',')).forEach((el)=> {
               return el.classList.add('filtered');
            })
            
        }else{
            document.querySelectorAll('.items').forEach((el)=> {
                return el.classList.add('filtered');
            });
        }

    }

   
    render() { 
  
        if(this.props.data.length===0){
            return (  <div className="overlay">
               <div className="spinnerWrapper">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <p>LOADING...</p>
                </div>
           </div>)
          }else{
             return (
                        
          
                <ApolloProvider client={client}>
                   
                    <Container fluid>
                        <Row>
                            <Col md ="3" >
                            <Accordion  >
                            <Card>
                               <Col className="filterHead">
                                    <h2> Filters</h2>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="d-md-none">
                                        <IoIosAddCircle  color="black" size="2em" className="plusIcon"/>
                                    </Accordion.Toggle>
                                </Col>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Filter/>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            </Accordion>
                            </Col>


                            <Col md="9">
                                <h2>Selected Filters</h2>
                                <Col className="filterTabsWrapper">
                                    <ul className="filteredTabs">
                                        <Badge />
                                    </ul>
                                </Col>
                                <Col>
                                    <Row >
                                        <Col sm='7' className="searchWrapper">                           
                                            <Search />                        
                                        </Col>                        
                                        <Col sm={{ span: 3, offset: 2 }} className="sortingWrapper pull-right">
                                            <Sort/>
                                        </Col>
                                    </Row>
                                </Col>                
                                <Row className="filteredItemsWrapper" noGutters={true}>
                                     <List/>  
                                </Row>
                            </Col>
                            
                        </Row>
                    </Container> 
                </ApolloProvider>
            );
        } 
    }
}
 
var mapStateToProps=(state)=>({
    ...state
});
var mapDispatchToProps=(dispatch)=>{
    return {
    changeSortValue:event=>dispatch({ 
        type:'CHANGE_SORT_VALUE'
    }),
    searchQuery:data=>dispatch({ 
        type:'SEARCH_QUERY',
        payload:  client.query({ query:data})
    }),
    searchQueryUpdate:event=>dispatch({
        type:'SEARCH_QUERY_UPDATE'
    }),
    removeBadge:event=>dispatch({ 
        type:'REMOVE_BADGE'
    }),
    checkboxClick:event=>dispatch({
        type:'CHECKBOX_CLICK'
    }),
    renderListItems:event=>dispatch({type:'RENDER_LIST_ITEMS'})

    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);