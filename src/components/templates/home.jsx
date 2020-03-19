import React,{Component} from 'react';
import {Container,Row,Col,Accordion,Card,Button} from 'react-bootstrap';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import { IoIosAddCircleOutline,IoIosAddCircle } from "react-icons/io";


import List from '../organisms/list';
import Search from '../molecules/search';
import Sort from '../molecules/sort';
import Filter from '../organisms/filter';
import Badge from '../atom/badge';

//Apollo Client setup
const client = new ApolloClient({
    uri:'https://rickandmortyapi.com/graphql/',
});


class home extends Component {
   
    
    state = { 
        data:[],
        info:[],
        filter:{gender:[],species:[],origin:[]},
        loading:'',
        error:'',
        sortValue:'',
        searchValue:'',
        page:1,
        selectArray:[],
     }

     UNSAFE_componentWillMount(){
        let gqlQuery =gql`{characters(
            page: 1
            filter: {}
            ){
              info{count}
              results{
                id
                status
                name
                species
                type
                gender
                origin{name}
                location{name}
                image
                created
              }
                }
            }`
        this.filterQuery(gqlQuery)

    };

    //Search Query Event
    searchQuery = (event)=>{
        event.preventDefault();
        console.log(this.state.searchValue);
        let gqlQuery =gql`{characters(
            page:${this.state.page}
            filter: {name:"${this.state.searchValue}"}
            ){
              info{count}
              results{
                id
                status
                name
                species
                type
                gender
                origin{name}
                location{name}
                image
                created
              }
                }
            }`
            this.filterQuery(gqlQuery)
    }
    searchQueryUpdate = (event)=>{
        this.setState({searchValue:event.target.value})
    }

    //filter GraphQL Query 
    filterQuery = (gqlQuery)=>{
        
        client.query({ query: gqlQuery
        }).then(result =>{ 
           //console.log(result);
           result.loading && this.setState({loading:result.loading});
           result.error && this.setState({error:result.error});
           let data= result.data.characters;
           this.setState({
                data:data.results,
                info:data.info, 
                filter:{
                    gender:this.getFilterVal(data.results,'gender',''),
                    species:this.getFilterVal(data.results,'species',''),
                   // origin:this.getFilterVal(data.results,'origin','name'),
                    location:this.getFilterVal(data.results,'location','name'),
                
                },
                loading:this.state.loading,
                error:this.state.error,
                sortValue:this.state.sortValue,
                searchValue:this.state.searchValue,
                page:this.state.page,
                selectArray:this.state.selectArray,
            })
        });
    };

    //Get Filter function data
    getFilterVal = (data,target,name)=>{
        let key = target;
        let val=[];
       // let comp;
       try{
        data.forEach((curr)=> {
           
           if(name.length>0){
                if(val.indexOf(curr[key][name]) === -1){  
                     val.push(curr[key][name]);                    
                } 
            }else{
                if(val.indexOf(curr[key])===-1){
                    val.push(curr[key]);                    
                }
            }
        });
        }catch(e){
            console.log(e)
           
        }
        return val;
    }

    // Sorting function to ascending & Descending 
    changeSortValue=(event)=>{
        console.log(event.target.value);
        let oldData= this.state.data;        
        if(event.target.value ==='asc'){
            oldData = oldData.sort(function(a, b){
               return a.id-b.id
            });
           
        }
        if(event.target.value==='desc'){
            oldData = oldData.sort(function(a, b){
                return b.id -a.id
            });
            
        }
        this.setState({
            data:oldData,
            sortValue: event.target.value
        })

    }

    //Render List items
    renderListItems = ()=>{
        if(this.state.data !== null){
       let items =  this.state.data.map((char)=>{
            //console.log(char);
           return    <List char={char} key={char.id} filterName={this.state.filter}/> 
        });
        
        return items;
        }else{
            return <p className='noresults'> No Results Found</p>;
        }
    }

    // Remove Badge
    removeBadge = (event) =>{
        console.log(event.target.attributes.value.value)
        let st = this.state.selectArray;
        st = st.filter(item=> item !==event.target.attributes.value.value);
        document.querySelector(`input[value="${event.target.attributes.value.value}"]`).checked=false;
        this.setState({selectArray:st});
    }

    //on Checkbox click
    checkboxClick = (event) =>{
        console.log(event.target.checked)
        let st = this.state.selectArray;
        if(event.target.checked){            
             st.push(event.target.value);
            
        }else{
            st = st.filter(item=> item !==event.target.value);
        }
        this.setState({selectArray:st});
        
        
    }

    // post component update
    componentDidUpdate(){
        let targ = this.state.selectArray;
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
        return (
                <ApolloProvider client={client}>
                    <Container fluid>
                        <Row>
                            <Col md ="3" >
                            <Accordion defaultActiveKey="0">
                            <Card>
                               <Col className="filterHead">
                                    <h2> Filters</h2>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="d-md-none">
                                        <IoIosAddCircle  color="black" size="2em" className="plusIcon"/>
                                    </Accordion.Toggle>
                                </Col>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                {Object.keys(this.state.filter).map((type,index)=>{
                                    if(this.state.filter[type].length){
                                        return <Filter key={index} type={type} data={this.state.filter[type]} checkboxClick={this.checkboxClick}/> 
                                    }
                                })}
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            </Accordion>                           
                                
                                            
                            </Col>
                            <Col md="9">
                                <h2>Selected Filters</h2>
                                <Col className="filterTabsWrapper">
                                    <ul className="filteredTabs">
                                        <Badge selected={this.state.selectArray} removeBadge={this.removeBadge}/>
                                    </ul>
                                </Col>
                                <Col>
                                    <Row >
                                        <Col sm='7' className="searchWrapper">                           
                                            <Search  searchQuery={this.searchQuery} searchValue={this.state.searchValue} searchQueryUpdate={this.searchQueryUpdate}/>                        
                                        </Col>                        
                                        <Col sm={{ span: 3, offset: 2 }} className="sortingWrapper pull-right">
                                            <Sort changeSortValue={this.changeSortValue} sortValue={this.state.sortValue}/>
                                        </Col>
                                    </Row>
                                </Col>                
                                <Row className="filteredItemsWrapper" noGutters={true}>
                                
                                    {                               
                                      this.renderListItems()                                       
                                    }                                                    
                                        
                                </Row>
                            </Col>
                            
                        </Row>
                    </Container> 
                </ApolloProvider>
            );
          
    }
}
 
 
export default home;
