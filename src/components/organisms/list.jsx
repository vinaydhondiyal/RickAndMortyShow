import React from 'react';
import { Row,Col,Card,ListGroup } from 'react-bootstrap';
import * as Dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


const filterTarget = (props) => {
  let target = Object.keys(props.filterName);
  let names='';
   for(let i=0 ; i<target.length; i++){
       if(typeof props.char[target[i]] !=='undefined'){
            if(typeof props.char[target[i]] !=="object"){
                names +=' '+ props.char[target[i]].split(" ").join("").replace(/[(,),',.]/g,'')
            }else{
                names +=' '+ props.char[target[i]]['name'].split(" ").join("").replace(/[(,),',.]/g,'');
            }
        }
   }
   return names;
};

const List = (props) => {
    Dayjs.extend(relativeTime);
    const information ={
        'status':props.char.status,
        'species':props.char.species,
        'gender':props.char.gender,
        'origin':props.char.origin.name,
        'last location':props.char.location.name,
    };
    const targetvalue = filterTarget(props);
   


    return ( 
        <Col lg="3" md="6" className={"items " + targetvalue} data-target={targetvalue}>
            <Card>
                <div className="imgWrapper">
                <Card.Img variant="top" src={props.char.image} />
                <Card.Body>
                    <Card.Title>{props.char.name}</Card.Title>
                    <Card.Text>id:{props.char.id} - created {Dayjs(props.char.created).fromNow()} </Card.Text>
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

     );
}
 
export default List;