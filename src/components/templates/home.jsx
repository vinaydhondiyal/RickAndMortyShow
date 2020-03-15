import React,{Component} from 'react';
import {Container,Row,Col} from 'react-bootstrap'; 

import List from '../organisms/list';
import Search from '../molecules/search';
import Sort from '../molecules/sort';
import Filter from '../organisms/filter';
import Badge from '../atom/badge';


class home extends Component {
   
    constructor(){
       super();
    }
    state = { 
        data:[],
        info:[],
        filter:{gender:[],species:[],origin:[]},
     }

    componentWillMount(){
        
        fetch('https://rickandmortyapi.com/api/character/?page=2')
        .then(res => res.json())
        .then((data) => {
            
          this.setState({
               data:data.results,
               info:data.info, 
               filter:{
                   gender:this.getFilterVal(data.results,'gender',''),
                   species:this.getFilterVal(data.results,'species',''),
                   origin:this.getFilterVal(data.results,'origin','name'),
                   location:this.getFilterVal(data.results,'location','name'),
                
                },
                querys:[],
                page:'',
                order:'',
            })
        })
        .catch(console.log)
    };
    filterQuery(){

    };
    getFilterVal(data,target,name){
        let key = target;
        let val=[];
        let comp;
        data.filter((curr)=> {
           if(name.length>0){
                if(val.indexOf(curr[key][name]) === -1){  
                     val.push(curr[key][name]);
                } 
            }else{
                if(val.indexOf(curr[key])===-1){

                    val.push(curr[key])
                }
            }
        });
        return val;
    }

    render() { 
        return (
                <Container fluid>
                    <Row>
                        <Col md ="3" >
                            <h2> Filters</h2>
                            {Object.keys(this.state.filter).map((type,index)=>{
                                return <Filter key={index} type={type} data={this.state.filter[type]}/> 
                            })}
                                          
                        </Col>
                        <Col md="9">
                            <h2>Selected Filters</h2>
                            <Col className="filterTabsWrapper">
                                <ul className="filteredTabs">
                                    <Badge/>
                                </ul>
                            </Col>
                            <Col>
                                <Row >
                                    <Col sm='7' className="searchWrapper">                           
                                        <Search />                        
                                    </Col>                        
                                    <Col sm={{ span: 3, offset: 2 }} className="sortingWrapper pull-right">
                                        <Sort />
                                    </Col>
                                </Row>
                            </Col>                
                            <Row className="filteredItemsWrapper" noGutters={true}>
                                {this.state.data.map((char)=>{
                                    //console.log(char);
                                       return  <List char={char} key={char.id}/> 
                                })}
                                                 
                                     
                            </Row>
                        </Col>
                        
                    </Row>
                </Container> 
            );
          
    }
}
 
 
export default home;
