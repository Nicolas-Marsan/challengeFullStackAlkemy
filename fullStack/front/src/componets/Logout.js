import React from 'react';

import { useContext,useEffect,useState } from "react";
import { UsuarioContext } from './UsuarioContext';
import Card from './Card';
import {Redirect } from 'react-router-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
function Logout(props){

    const [logout, setLogout] = useState(false);
    let id = sessionStorage.getItem('id'); 

    useEffect(() => {
        loadData();
    }, []);

       const loadData = async () => {
           await fetch('http://localhost:3001/users/logout')
            .then( res => res.json())
            .then ( data => {
                setLogout(data);
                sessionStorage.removeItem('id');
                
            })
            .catch( err => console.log(err));
        
        }

        
        
    return(
        <>
        {logout ? <Redirect to='/login'  />
        :  
        <Redirect to='/logout'  />
         }
        </>
    )
    
}

export default Logout;