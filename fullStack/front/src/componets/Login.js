import React, { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import {Redirect , useHistory} from 'react-router-dom';
import { UsuarioContext } from './UsuarioContext';
import {Link } from 'react-router-dom'

function Login(props){
    
    const {setUserGlobal} = useContext (UsuarioContext);
    const url="http://localhost:3001/users/login";
    const [data, setData] = useState({mail: "", password: ""})
    const [isLogged, setIsLogged] = useState(false)
    const [user,setUser] = useState({});
    //const mail = document.getElementById("mail");
    //const password = document.getElementById("password");
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
                setIsLogged(true) 
                sessionStorage.setItem("id", res.data.userLogged.id);  
                sessionStorage.setItem("name", res.data.userLogged.first_name);              
                setUserGlobal(res.data.userLogged)
                console.log(res.data.userLogged)
                
            }else{console.log("false de react")}
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