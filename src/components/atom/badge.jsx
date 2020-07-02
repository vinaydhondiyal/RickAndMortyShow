import React from 'react';
import {connect} from 'react-redux';

const Badge = (props) => {
    return ( 
        props.selectArray.map((item,index)=>{ 
         return <li key={index}>{item}<span onClick={(e)=>props.removeBadge(e)} value={item.split(" ").join("").replace(/[(,),',.]/g,'')}>x</span></li>
        })
    );
}

var mapStateToProps=(state)=>({
    ...state
});

var mapDispatchToProps=(dispatch)=>{
    return {
        removeBadge:event=>dispatch({ 
            type:'REMOVE_BADGE',
            payload:event
        })
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Badge);