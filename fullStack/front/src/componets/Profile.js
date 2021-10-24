import React from 'react';
import { useContext,useEffect,useState,useRef } from "react";
import PropsMoves from './PropsMoves';
import ForEntry from './ForEntry';
import {Redirect } from 'react-router-dom';
import {Link } from 'react-router-dom'

function Profile(){
    
    //const {userGlobal} = useContext (UsuarioContext);
    //console.log(localStorage);
    let id = sessionStorage.getItem('id');
    let name= sessionStorage.getItem('name');
    const [moves, setMoves] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [egreso,setEgreso] = useState(0);
    const [ingreso,setIngreso] = useState(0);
    const [saldo,setSaldo] = useState(0);
    const [reenvia,setReenvia] = useState(false);
    const moveId = useRef();
    

    useEffect(() => {
        loadData();
    }, []);

       const loadData = async () => {
          const res = await fetch('http://localhost:3001/movements/movementsById?id=' + id)
            const data= await res.json()            
                setMoves(data);      
                setIsLoading(false);  
        }        

  useEffect(() => {
    if(moves.movements){        
    let ingresos = moves.movements.filter (movimiento => movimiento.type == 'ingreso')
    let egresos = moves.movements.filter (movimiento => movimiento.type == 'egreso')
    let saldo=0;
    let egresosTotal=0;
    let ingresosTotal=0;
    for(let i=0; i<egresos.length;i++){
        egresosTotal+= egresos[i].amount;
    }
    for(let i=0; i<ingresos.length;i++){
        ingresosTotal+= ingresos[i].amount;
    }

    setIngreso(ingresosTotal);
    setEgreso(egresosTotal);
    saldo=(ingresosTotal-egresosTotal);
    setSaldo(saldo);
    }
}, [moves]);

 function rescue(e){
  console.log(e.target.id);
  localStorage.setItem("moveId", e.target.id); 
  setReenvia(true);
  
 }      

      console.log(egreso)  
    return(
        <>{reenvia ? <Redirect to='./modifica'/>:
        <div className="bodyProfile">
            <div className="navProfile">
            
            <div className="crear">
                          <Link to="/NewMovement"><button>Create new movement</button></Link>
            </div>
            <div className="crear">
                          <Link to="/ForEntry"><button>Incoming movements </button></Link>
            </div>
            <div className="crear">
                          <Link to="/ForEgress"><button>Movements by egress</button></Link>
            </div>
            </div>
            <p className="client">Customer:{name} </p>  
            <p className="balance">Balance:{saldo}</p>      


            <table className="table">
                        <thead>
                            <tr className="list">
                                <th>Concept</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                            moves.movements && moves.movements.map(record => {
                                return <div className="list"> <PropsMoves
                                concept= {record.concept}
                                amount = {record.amount}
                                date = {record.date}
                                type = {record.type}

                                key={record.id}
                                />
                                <button className="buttonEdit" id={record.id} onClick={(e)=> rescue(e)}>Delete/edit</button>
                                </div>
                            })
            
                            
                            }




                        </tbody>
                   </table>           
            
            
            
        </div>
        }
         </>
    )
    
}





export default Profile;