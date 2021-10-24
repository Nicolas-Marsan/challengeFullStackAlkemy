import React from 'react';
import PropTypes from 'prop-types';

function Card(props){
    return(
        
                        <div>
                            <div>{props.title}</div>
                            <div>{props.cuantity}</div>
                        </div>
                   
        
    )
}




export default Card;