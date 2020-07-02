import React from 'react';
import { Row,Col,Card,ListGroup } from 'react-bootstrap';
import {connect} from 'react-redux';
import * as Dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


const filterTarget = (props,char) => {
  let target = Object.keys(props.filter);
  let names='';
   for(let i=0 ; i<target.length; i++){
       if(typeof char[target[i]] !=='undefined'){
            if(typeof char[target[i]] !=="object"){
                names +=' '+ char[target[i]].split(" ").join("").replace(/[(,),',.]/g,'')
            }else{
                names +=' '+ char[target[i]]['name'].split(" ").join("").replace(/[(,),',.]/g,'');
            }
        }
   }
   return names;
};

const List = (props) => {
    
   
    if(props.data === null){
        return <p className='noresults'> No Results Found</p>;
    }else{
      
        return  props.data.map((char)=>{
            Dayjs.extend(relativeTime);
            const information ={
                'status':char.status,
                'species':char.species,
                'gender':char.gender,
                'origin':char.origin.name,
                'last location':char.location.name,
            };
            const targetvalue = filterTarget(props,char);

            return ( 
                <Col key={char.id} lg="3" md="6" className={"items " + targetvalue} data-target={targetvalue}>
                    <Card>
                        <div className="imgWrapper">
                        <Card.Img variant="top" src={char.image} />
                        <Card.Body>
                            <Card.Title>{char.name}</Card.Title>
                            <Card.Text>id:{char.id} - created {Dayjs(char.created).fromNow()} </Card.Text>
                        </Card.Body>
                        </div>
                        <Col sm="12" className="contentWrapper">
                            <ListGroup variant="flush">
                                
                            {Object.keys(information).map((key,index)=>{
                            // console.log(key);
                                return ( <ListGroup.Item key={index}><Row><Col sm="5" className="heading">{key}</Col><Col sm="7" className="info">{information[key]}</Col></Row></ListGroup.Item>)
                            })}
                            
                            </ListGroup>
                        </Col>
                    </Card>
                </Col> 

            )
    
        })
    
    }
}
const mapStateToProps=(state)=>(
    {...state}
);

 
export default connect(mapStateToProps,null)(List);