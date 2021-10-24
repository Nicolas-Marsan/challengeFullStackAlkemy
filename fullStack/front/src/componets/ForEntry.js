import React from 'react';
import { useContext,useEffect,useState,useRef } from "react";
import PropsMoves from './PropsMoves';
import {Redirect } from 'react-router-dom';
import {Link } from 'react-router-dom'

function ForEntry(){
    
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
    setIngreso(ingresos);
    
    }
}, [moves]);    
       
    return(
        <>{
        <div className="bodyProfile">
            <div className="navProfile">
            
            <div className="crear">
                          <Link to="/profile"><button>Back</button></Link>
            </div>
            <p className="incoming">Incoming Movements</p>
            </div>
            
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
                            ingreso && ingreso.map(record => {
                                return <div className="list"> <PropsMoves
                                concept= {record.concept}
                                amount = {record.amount}
                                date = {record.date}
                                type = {record.type}

                                key={record.id}
                                />
                                
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





export default ForEntry;