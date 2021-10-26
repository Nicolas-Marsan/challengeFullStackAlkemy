import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import Login from './Login';
function Home(props){
    return(
    <div>
        <Route path="/login" component={Login}/>
        <header className="encabezado">
                <div className="logo">
                        <Link to="/"><img src="logo.jpg"></img></Link>
                        
                </div>
                      <nav className="menu">                       
                      <p className= "titulo">Personal Finance</p>
                        <div className="crear">
                          <Link to="/register"><button>Registrarse</button></Link>
                        </div>

                        <div className="iniciar">
                          <Link to="/login"><button>Ingresar</button></Link>
                          
                        </div>

                      </nav>

        </header>

    <div className="cuerpo">

    </div>
    </div>   
    )
}





export default Home;