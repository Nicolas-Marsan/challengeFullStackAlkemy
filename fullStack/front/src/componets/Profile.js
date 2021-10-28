import React from 'react';
import {useEffect,useState,useRef } from "react";
import PropsMoves from './PropsMoves';
import ForEntry from './ForEntry';
import {Redirect } from 'react-router-dom';
import {Link } from 'react-router-dom'

function Profile(){
    
    
    let id = sessionStorage.getItem('id');
    let name= sessionStorage.getItem('name');
    const [moves, setMoves] = useState([]);
    const [egreso,setEgreso] = useState(0);
    const [ingreso,setIngreso] = useState(0);
    const [saldo,setSaldo] = useState(0);
    const [reenvia,setReenvia] = useState(false);
    const [isComplete, setIsComplete] = useState(false)
    const [cargaId, setCargaId] = useState(false)
    const [nuevo, setNuevo]= useState([]);
    

    useEffect(() => {
        
        setCargaId(id);
        
        loadData();
    },[]);

       const loadData = async () => {
        

           console.log("el ide dentro del loaddata",id);
          const res = await fetch('http://localhost:3001/movements/movementsById?id=' + id)
            const data= await res.json()            
                setMoves(data);  
                      
        }        

  useEffect(() => {
    if(moves.movements){        
    let ingresos = moves.movements.filter (movimiento => movimiento.type === 'ingreso')
    let egresos = moves.movements.filter (movimiento => movimiento.type === 'egreso')
    let saldo=0;
    let egresosTotal=0;
    let ingresosTotal=0;
    for(let i=0; i<egresos.length;i++){
        egresosTotal+= egresos[i].amount;
    }
    for(let i=0; i<ingresos.length;i++){
        ingresosTotal+= ingresos[i].amount;
    }

    moves.movements.sort((a,b)=>{
        if(a.date < b.date){
            return 1;
        }
        if(a.date > b.date){
            return -1;
        }
        return 0;

    });
    let nuevoAux=[];
    for(let i=0; i<moves.movements.length;i++){
        if(i<=9){
        nuevoAux.push(moves.movements[i])
        }else{break}
    }


    setNuevo(nuevoAux)
    setIngreso(ingresosTotal);
    setEgreso(egresosTotal);
    saldo=(ingresosTotal-egresosTotal);
    setSaldo(saldo);
    setIsComplete(true)
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
           
        <>{moves.movements && <div className="bodyProfile">
            <div className="navProfile">
            
            <div className="crear">
                          <Link to="/NewMovement"><button>Crear nuevo movimiento</button></Link>
            </div>
            <div className="crear">
                          <Link to="/ForEntry"><button>Movimientos por ingresos </button></Link>
            </div>
            <div className="crear">
                          <Link to="/ForEgress"><button>Movimientos por egresos</button></Link>
            </div>
            </div>
            <p className="client">Cliente:{name} </p>  
            <p className="balance">Saldo:{saldo}</p>      


            <table className="table">
                        <thead>
                            <tr className="list">
                                <th>Concepto</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                            isComplete && nuevo.map(record => {
                                return <div className="list"> <PropsMoves
                                concept= {record.concept}
                                amount = {record.amount}
                                date = {record.date}
                                type = {record.type}

                                key={record.id}
                                />
                                <button className="buttonEdit" id={record.id} onClick={(e)=> rescue(e)}>Borrar/editar</button>
                                </div>
                            })
            
                            
                            }




                        </tbody>
                   </table>           
            
            
            
        </div>
         }
         </>
        }
         </>
    )
    
}





export default Profile;