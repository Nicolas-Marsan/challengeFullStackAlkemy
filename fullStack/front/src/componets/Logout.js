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