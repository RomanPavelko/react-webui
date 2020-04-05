import React from 'react'

function MenuItem(props){
    return(
        <div 
            id={"menu-item-" + props.value}
            className={"Menu-item " + props.getClass}
            onClick={props.onClick}>
            {props.value}
        </div>
    );
}

export default MenuItem