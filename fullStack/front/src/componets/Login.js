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
        <div className ='bodyingresar'>
            
            <div className="crear">
                          <Link to="/"><button type="button" class="btn btn-outline-primary">Volver</button></Link>
            </div>
            <div className="card-header ingresar">
                <p className="personalh1 ">Ingresar</p>
         </div> 
        <div className="notaInicia" >            
          <form className="login" onSubmit={(e)=> submit(e)}>
                <div className="mb-3">
                    <label htmlFor="mail" for="exampleInputEmail1" className="form-label">Email address</label>
                    <input  ref={mail} type="email" name="mail" className="form-control" id="mail" aria-describedby="emailHelp"></input>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label  htmlFor="password" for="exampleInputPassword1" className="form-label">Password</label>
                    <input ref={pass}  type="password" name="password" className="form-control" id="password"></input>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Ingresar</button>
           </form>
        </div>
        </div>
        }
        </>
        
    )
}





export default Login;