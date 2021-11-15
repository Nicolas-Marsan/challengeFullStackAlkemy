import React from 'react';
import {useEffect,useState } from "react";
import {Redirect } from 'react-router-dom';

function Logout(props){

    const [logout, setLogout] = useState(false);
    let id = sessionStorage.getItem('id'); 

    useEffect(() => {
        loadData();
    }, []);

       const loadData = async () => {
            const res = await fetch('http://localhost:3001/users/logout')
             const data = await res.json()
                       
                sessionStorage.removeItem('id');
                sessionStorage.removeItem('name');
                setLogout(data);
                
            }   
            
            
        
    return(
        <>
        {logout ? <Redirect to='/'  />
        :  
        <Redirect to='/logout'  />
         }
        </>
    )
    
}

export default Logout;