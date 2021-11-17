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
        
        console.log(user_id);     
        const res = await Axios.post(url,{            
           concept:concept.current.value,
            amount:amount.current.value,
            date:date.current.value,
            type:type.current.value,
            state:'activo',
            user_id:user_id           
        },{headers: {authorization: sessionStorage.getItem("token")},}) 
        setIsComplete(true)
    }               
    return   (
        <>{isComplete ? < Redirect to='/profile'/>:
        <div className="bodyNota">
            <div className="crear">
                          <Link to="/Profile"><button type="button" class="btn btn-outline-primary">Volver</button></Link>
            </div>
            <div className="card-header ingresar">
                <p className="personalh1 ">Nueva operación</p>
         </div> 
           <div className="notaInicia" >
           
            
             <form className="login" onSubmit={(e)=> submit(e)}>
                 <div className="mb-3">

                    <label htmlFor="concept" for="exampleInputEmail1" className="form-label">Concepto:</label>
                    <input   ref={concept} type="text" name="concept" className="form-control" id="firstName" aria-describedby="emailHelp"></input>
                    <label htmlFor="amount" for="exampleInputEmail1" className="form-label">Monto:</label>
                    <input   ref={amount} type="text" name="amount" className="form-control" id="lastName" aria-describedby="emailHelp"></input>
                    <label htmlFor="date" for="exampleInputEmail1" className="form-label">Fecha:</label>
                    <input  ref={date} type="date" name="date" className="form-control" id="date" aria-describedby="emailHelp"></input>
                </div>
                <select ref={type} class="form-select" aria-label="Default select example">
                    <option selected>Seleccionar opción</option>
                    <option value="ingreso">Ingreso</option>
                    <option value="egreso">Egreso</option>                    
                </select>
  
                    <button type="submit" className="btn btn-primary" id="newmovementbutton">Crear</button>
              </form>




           </div>
        </div>
         }
         </>
        
        
        
    )
}


export default NewMovement;