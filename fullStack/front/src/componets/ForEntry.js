import React from 'react';
import {useEffect,useState} from "react";
import PropsMoves from './PropsMoves';

import {Link } from 'react-router-dom'

function ForEntry(){   
    
    let id = sessionStorage.getItem('id');
    const [moves, setMoves] = useState([]);    
    const [ingreso,setIngreso] = useState(0);    

    useEffect(() => {
        loadData();
    }, []);

       const loadData = async () => {
          const res = await fetch('http://localhost:3001/movements/movementsById?id=' + id)
            const data= await res.json()            
                setMoves(data);      
                 
        }        

  useEffect(() => {
    if(moves.movements){ 

    let ingresos = moves.movements.filter (movimiento => movimiento.type === 'ingreso')
    setIngreso(ingresos);
    
    }
}, [moves]);    
       
    return(
        <>{
        <div className="bodyProfile">
            <div className="navProfile">
            
            <div className="crear">
                          <Link to="/profile"><button>Volver</button></Link>
            </div>
            <p className="incoming">Movimientos por ingresos</p>
            </div>
            
            <table className="table">
                        <thead>
                            <tr className="list">
                                <th>Concepto</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                                <th>Tipo</th>
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