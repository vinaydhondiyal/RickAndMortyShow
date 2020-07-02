
import client from '../api/index';
import {getFilterVal} from '../api/getFilterVal';


export const filter =  (gqlQuery,state) =>{
  
    
    client.query({ query:gqlQuery
    }).then(result =>{ 
       //console.log(result);
       
       let data= result.data.characters;
       return ({
          //  ...state,
            data:data.results,
            info:data.info, 
            filter:{
                gender:getFilterVal(data.results,'gender',''),
                species:getFilterVal(data.results,'species',''),
                location:getFilterVal(data.results,'location','name'),
            
            },
        })
    }).catch(error=>{
        console.error(error);
        return {}
    })
   
  

}