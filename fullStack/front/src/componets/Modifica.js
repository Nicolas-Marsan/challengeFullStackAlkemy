import React, { useState, useContext, useRef,useEffect } from 'react';
import Axios from 'axios';
import {Redirect } from 'react-router-dom';
import {Link } from 'react-router-dom'
function Modifica(props){    
    
    const url="http://localhost:3001/movements/update?id=" + localStorage.getItem('moveId');
    const urlRecu="http://localhost:3001/movements/movementById?id=" + localStorage.getItem('moveId');
    const urlDelete="http://localhost:3001/movements/delete?id=" + localStorage.getItem('moveId');
    const concept = useRef();
    const amount = useRef();
    
    const [oldConcept, setOldConcept] = useState();
    const [oldAmount, setOldAmount] = useState();
    const [date, setDate] = useState();
    const [type, setType] = useState();
    const [state, setState] = useState();
    const [id, setId] = useState();

    const user_id = sessionStorage.getItem('id');
    const [isComplete, setIsComplete] = useState(false)
    const [old, setOld] = useState(false)
    const [moves, setMoves] = useState([]);
    const [elimina, setElimina] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

       const loadData = async () => {
          const res = await fetch(urlRecu)
            const data= await res.json()            
                setMoves(data); 
                console.log("entro en la api", data)     
                
        }

        useEffect(() => {
            if(moves.movement){
            console.log('entro al if');
            setOld(true)
            console.log("los datos del movimiento", moves.movement[0].concept)  
            console.log("datos del local storage " , localStorage.getItem('moveId'))
            setDate(moves.movement[0].date)
            setType(moves.movement[0].type)
            setState(moves.movement[0].state)
            setId(moves.movement[0].user_id)
            setOldConcept(moves.movement[0].concept)
            setOldAmount(moves.movement[0].amount)

            }
        },[moves]);

    //if(mail.current){console.log(mail.current.value);}
    const submit = async (e) =>{
        e.preventDefault(); 
        
        console.log(user_id)  ;     
        const res = await Axios.post(url,{
            concept:concept.current.value,
            amount:amount.current.value,
            date:date,
            type:type,
            state:state,
            user_id:id
            
        }) 
        setIsComplete(true)
    }    
    
     function submit2 (e){
                    
            setElimina(true);     
        
    } 

    useEffect(() => {
        if(elimina){
            console.log("entro en elimina");
        loadData2();
        }
    }, [elimina]);  

    const loadData2 = async () => {
        const res = await fetch(urlDelete)
          const data= await res.json()                 
      }
    return   (
        <>{isComplete ? < Redirect to='/profile'/>:
        <div className ='bodyNota'>
            <div className="crear">
                          <Link to="/Profile"><button>Back </button></Link>
            </div>
        <div className="notaInicia" >
            { old && <form className="formInicia" onSubmit={(e)=> submit(e)}>              
              <label htmlFor="concept">Concept:</label>
              <input  ref={concept} type="text" name="concept" id="concept" placeholder={oldConcept}></input>
              <label htmlFor="amount">Amount:</label>
              <input ref={amount}  type="text" name="amount" id="amount" placeholder={oldAmount}></input>  
              <div className="subdel">         
                <button className="primero">Submit</button>
                 <button className="segundo" onClick={(e)=> submit2(e)}>Delete</button>
              </div>  
          </form>}
        </div>
        </div>
        
         }
         </>
        
        
        
    )
}


export default Modifica;