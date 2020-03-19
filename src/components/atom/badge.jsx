import React from 'react';
const Badge = (props) => {
    return ( 
        props.selected.map((item,index)=>{ 
         return <li key={index}>{item}<span onClick={props.removeBadge} value={item.split(" ").join("").replace(/[(,),',.]/g,'')}>x</span></li>
        })
    );
}
 
export default Badge;