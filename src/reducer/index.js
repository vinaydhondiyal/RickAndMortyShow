import {FILTER_QUERY,SEARCH_QUERY_UPDATE,CHECKBOX_CLICK,REMOVE_BADGE,CHANGE_SORT_VALUE} from '../action/types';
import {getFilterVal} from '../api/getFilterVal';



const initialstate={ 
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

const reducer = function (state = initialstate,{type,payload={}}){
    let st;
    switch(type){
        
        //Search Query Event
        case FILTER_QUERY: 
            return ({
                ...state,
                
            })            
        break; 
        case 'SEARCH_QUERY_FULFILLED' : 
           console.log(payload); 
           let data= payload.data.characters;         
            return ({
                ...state,
                data:data.results,
                info:data.info, 
                filter:{
                    gender:getFilterVal(data.results,'gender',''),
                    species:getFilterVal(data.results,'species',''),
                    location:getFilterVal(data.results,'location','name'),
                
                },
            })   
          
        break; 

        case SEARCH_QUERY_UPDATE:
            return ({
                ...state, 
                searchValue:payload.target.value
            });
        break; 
                
        //Remove Badge
        case REMOVE_BADGE:
            console.log(payload.target.attributes.value.value)
            st = state.selectArray;
            st = st.filter(item=> item !==payload.target.attributes.value.value);
            document.querySelector(`input[value="${payload.target.attributes.value.value}"]`).checked=false;
            return({
                ...state,
                selectArray:st
            });
         break; 

        //Sorting function to ascending & Descending 
        case CHANGE_SORT_VALUE:
            console.log(payload.target.value);
            let oldData= state.data;        
            if(payload.target.value ==='asc'){
                oldData = oldData.sort(function(a, b){
                    return a.id-b.id
                });           
            }
            if(payload.target.value==='desc'){
                oldData = oldData.sort(function(a, b){
                    return b.id -a.id
                });            
            }
            return({
                ...state,
                data:oldData,
                sortValue: payload.target.value
            });

        break; 
        
        //On Checkbox Click
        case CHECKBOX_CLICK:
            console.log(payload.target.checked)
            st = [...state.selectArray];
            if(payload.target.checked){            
                st.push(payload.target.value);                
            }else{
                st = st.filter(item=> item !==payload.target.value);
            }
            return({
                ...state,
                selectArray:st
            });

        break;
    
        
        default:
            return state;

    }

}

export default reducer;