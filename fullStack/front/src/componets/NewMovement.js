import React, { useState, useContext, useRef } from 'react';
import Axios from 'axios';
import {Redirect } from 'react-router-dom';
import {Link } from 'react-router-dom'
function NewMovement(props){    
    
    const url="http://localhost:3001/movements/create";
    const concept = useRef();
    const amount = useRef();
    const date = useRef();
    const type = useRef();
    const state = useRef();
    const user_id = sessionStorage.getItem('id');
    const [isComplete, setIsComplete] = useState(false)


    //if(mail.current){console.log(mail.current.value);}
    const submit = async (e) =>{
        e.preventDefault(); 
        
        console.log(user_id)  ;     
        const res = await Axios.post(url,{
            concept:concept.current.value,
            amount:amount.current.value,
            date:date.current.value,
            type:type.current.value,
            state:'activo',
            user_id:user_id
            
        }) 
        setIsComplete(true)
    }               
    return   (
        <>{isComplete ? < Redirect to='/profile'/>:
        <div className="bodyNota">
            <div className="crear">
                          <Link to="/Profile"><button>Volver </button></Link>
            </div>
            <p className="incoming">Nueva operacion</p>
           <div className="notaInicia" >
           
            <form className="formInicia" onSubmit={(e)=> submit(e)}>              
              <label htmlFor="concept">Concepto:</label>
              <input  ref={concept} type="text" name="concept" id="concept"></input>
              <label htmlFor="amount">Monto:</label>
              <input ref={amount}  type="text" name="amount" id="amount"></input>
              <label htmlFor="date">Fecha:</label>
              <input ref={date}  type="date" name="date" id="date"></input>
              <div className="divSelect">
              <label htmlFor="type">Tipo:</label>
              <select  ref={type} name="type" id="type"> 
                <option value='ingreso'>Ingreso</option>
                <option value='egreso'>Egreso</option>
              </select>             
              </div>
              <button className="buttonSubmit">Enviar</button>
              
             </form>
           </div>
        </div>
         }
         </>
        
        
        
    )
}


export default NewMovement;