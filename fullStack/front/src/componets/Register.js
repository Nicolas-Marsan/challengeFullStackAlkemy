import React, { useState, useContext, useRef } from 'react';
import Axios from 'axios';
import {Redirect } from 'react-router-dom';
import {Link } from 'react-router-dom'
function Register(props){    
    
    const url="http://localhost:3001/users/create";
    const firstName = useRef();
    const lastName = useRef();
    const mail = useRef();
    const password = useRef();
    
    const [isComplete, setIsComplete] = useState(false)


    //if(mail.current){console.log(mail.current.value);}
    const submit = async (e) =>{
        e.preventDefault(); 
        setIsComplete(true)
           
        const res = await Axios.post(url,{           

            first_name: firstName.current.value,
            last_name: lastName.current.value,
            mail: mail.current.value,
            password:password.current.value
            
        }) 
    }               
    return   (
        <>{isComplete ? < Redirect to='/login'/>:
        <div className ='bodyNota'>
            
            <div className="crear">
                          <Link to="/"><button>Volver </button></Link>
            </div>
            <p className="incoming">Registrarse</p>
        <div className="notaInicia2" >
            <form className="formInicia" onSubmit={(e)=> submit(e)}>              
              <label htmlFor="firstName">Nombre:</label>
              <input  ref={firstName} type="text" name="firstName" id="firstName"></input>
              <label htmlFor="lastName">Apellido:</label>
              <input ref={lastName}  type="text" name="lastName" id="lastName"></input>
              <label htmlFor="mail">Mail:</label>
              <input ref={mail}  type="text" name="mail" id="mail"></input>
              <label htmlFor="password">Password:</label>
              <input ref={password}  type="password" name="password" id="password"></input>         
              
              <button className="primero">Enviar</button>
          </form>
        </div>
        </div>
         }
         </>
        
        
        
    )
}


export default Register;