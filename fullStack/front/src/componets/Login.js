import React, { useState, useContext, useRef } from 'react';
import Axios from 'axios';
import {Redirect } from 'react-router-dom';
import { UsuarioContext } from './UsuarioContext';
import {Link } from 'react-router-dom'

function Login(props){
    
    const {setUserGlobal} = useContext (UsuarioContext);
    const url="http://localhost:3001/users/login";
    const [isLogged, setIsLogged] = useState(false)
    
    
    const mail = useRef();
    const pass = useRef();
    
    
    if(mail.current){console.log(mail.current.value);}
    


    const submit = async (e) =>{
        e.preventDefault();
        
        const res = await Axios.post(url,{
            mail:mail.current.value,
            password:pass.current.value
        })

        if(res.data.userLogged){
                
                sessionStorage.setItem("id", res.data.userLogged.id);  
                sessionStorage.setItem("name", res.data.userLogged.first_name);              
                setUserGlobal(res.data.userLogged)
                console.log(res.data.userLogged)
                
            }else{console.log("false de react")}
            setIsLogged(true) 
        }
        
    return   (
        <>
        {isLogged ? <Redirect to='/profile'  />
        : 
        <div className ='bodyNota'>
            
            <div className="crear">
                          <Link to="/"><button>Volver </button></Link>
            </div>
            <p className="incoming">Ingresar</p> 
        <div className="notaInicia" >
            <form className="formInicia" onSubmit={(e)=> submit(e)}>              
              <label htmlFor="mail">Mail:</label>
              <input  ref={mail} type="text" name="mail" id="mail"></input>
              <label htmlFor="password">Password:</label>
              <input ref={pass}  type="password" name="password" id="password"></input>
              <button className="primero">Enviar</button>
          </form>
        </div>
        </div>
        }
        </>
        
    )
}





export default Login;