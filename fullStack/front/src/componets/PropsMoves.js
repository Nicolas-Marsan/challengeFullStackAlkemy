import React from 'react';
import PropTypes from 'prop-types';



function PropsMoves(props){
    return (
                <tr className='list'>
                    <td>{props.concept}</td>
                    <td>{props.amount}</td>
                    <td>{props.date}</td>
                    <td>{props.type}</td>
                </tr>
            )
    }
    
    PropsMoves.defaultProps = {
        concept: 'No Concept',
        amount: 'No Amount',
        date: 'No Date'
        
    }
    
    /* PROPTYPES */
    
    

export default PropsMoves;