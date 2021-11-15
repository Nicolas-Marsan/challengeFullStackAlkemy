import React from 'react';

import { Link, Route} from 'react-router-dom'
import Login from './Login';
function Home(props){
    return(
    <div className="bodyHome">
                
        <div className="card-header hometop">
                <p className="personalh1">Personal Finance</p>
         </div>


        <div className="container ">
  <div className="row menuhome">
    
    
    <div className="col">
    <Link to="/register"><button type="button" class="btn btn-primary btn-lg">Registrarse</button></Link>
    </div>
    <div className="col">
    <Link to="/login"><button type="button" class="btn btn-secondary btn-lg">Ingresar</button></Link>
    </div>
  </div>
</div>
               

    
    



   
    
    </div>   
    )
}





export default Home;