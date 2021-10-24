import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './componets/Home';
import Login from './componets/Login';
import Profile from './componets/Profile';
import Erro404 from './componets/Erro404';
import Modifica from './componets/Modifica';
import ForEntry from './componets/ForEntry';
import ForEgress from './componets/ForEgress';
import Register from './componets/Register';
import Logout from './componets/Logout';
import NewMovement from './componets/NewMovement';
import {BrowserRouter, Link, Route, Switch,Redirect} from 'react-router-dom'
import { UserProvider } from './componets/UsuarioContext';

function App() {
  
  return (
    <UserProvider>
    <div>
 
         
<Route>
  <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/forEntry" component={ForEntry}/>
      <Route path="/forEgress" component={ForEgress}/>
      <Route path="/register" component={Register}/>
      <Route path="/modifica" component={Modifica}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/NewMovement" component={NewMovement}/>
      <Route component={Erro404} /> 
  </Switch>
</Route>    
</div>
</UserProvider>
  );
    
}

export default App;
