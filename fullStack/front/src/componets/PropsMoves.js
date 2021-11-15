import React from 'react';
function PropsMoves(props){

    
    return (

                 <div className="row align-items-start consh2">
                        <div className="col">
                        {props.concept}
                        </div>
                        <div className="col">
                        {props.amount}
                        </div>
                        <div className="col">
                        {props.type}
                        </div>
                        <div className="col">
                        {props.date}
                        </div>
                        
                        
                 </div>



                
            )
    }
    
    PropsMoves.defaultProps = {
        concept: 'No Concept',
        amount: 'No Amount',
        date: 'No Date'
        
    }
    
    /* PROPTYPES */
    
    

export default PropsMoves;