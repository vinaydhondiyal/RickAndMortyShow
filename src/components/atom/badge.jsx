import React from 'react';
const Badge = (props) => {
    return ( 
        props.selected.map((item,index)=>{ 
         return <li key={index}>{item}<span onClick={props.removeBadge} value={item}>x</span></li>
        })
    );
}
 
export default Badge;