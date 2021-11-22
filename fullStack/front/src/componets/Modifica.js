import React, { useState, useContext, useRef, useEffect } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
function Modifica(props) {
  const url =
    "http://localhost:3001/movements/update?id=" +
    localStorage.getItem("moveId");
  const urlRecu =
    "http://localhost:3001/movements/movementById?id=" +
    localStorage.getItem("moveId");
  const urlDelete =
    "http://localhost:3001/movements/delete?id=" +
    localStorage.getItem("moveId");
  const concept = useRef();
  const amount = useRef();

  const [oldConcept, setOldConcept] = useState();
  const [oldAmount, setOldAmount] = useState();
  const [date, setDate] = useState();
  const [type, setType] = useState();
  const [state, setState] = useState();
  const [id, setId] = useState();

  const user_id = sessionStorage.getItem("id");
  const [isComplete, setIsComplete] = useState(false);
  const [old, setOld] = useState(false);
  const [moves, setMoves] = useState([]);
  const [elimina, setElimina] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch(urlRecu,{
        headers: {Authorization: sessionStorage.getItem("token")}
    });
    const data = await res.json();
    setMoves(data);
  };

  useEffect(() => {
    if (moves.movement) {
      setDate(moves.movement[0].date);
      setType(moves.movement[0].type);
      setState(moves.movement[0].state);
      setId(moves.movement[0].user_id);
      setOldConcept(moves.movement[0].concept);
      setOldAmount(moves.movement[0].amount);

      setOld(true);
    }
  }, [moves]);

  
  //if(mail.current){console.log(mail.current.value);}
  const submit = async (e) => {
    e.preventDefault();

    
    const res = await Axios.post(url, {
      concept: concept.current.value,
      amount: amount.current.value,
      date: date,
      type: type,
      state: state,
      user_id: id
      
    },{headers: {authorization: sessionStorage.getItem("token")},}) 
    setIsComplete(true);
  };

  function submit2(e) {
    setElimina(true);
  }

  useEffect(() => {
    if (elimina) {
      loadData2();
    }
  }, [elimina]);

  const loadData2 = async () => {
    const res = await fetch(urlDelete,{
        headers: {Authorization: sessionStorage.getItem("token")}
    });
    const data = await res.json();
  };

  return (
    <>
      {isComplete ? (
        <Redirect to="/profile" />
      ) : (
        <div className="bodyNota">
          <div className="crear">
            <Link to="/profile">
              <button type="button" class="btn btn-outline-primary" id="backButton">
                Volver
              </button>
            </Link>
          </div>
          <div className="card-header ingresar">
            <p className="personalh1 ">Modificar/Eliminar item</p>
          </div>
          <div className="notaInicia">
            {old && (
              <form className="login" onSubmit={(e) => submit(e)}>
                <div className="mb-3">
                  <label
                    htmlFor="concept"
                    for="exampleInputEmail1"
                    className="form-label"
                  >
                    Concepto:
                  </label>
                  <input
                    ref={concept}
                    type="text"
                    name="conc"
                    className="form-control"
                    id="conc"
                    aria-describedby="emailHelp"
                    required
                    defaultValue={oldConcept}
                  ></input>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="amount"
                    for="exampleInputPassword1"
                    className="form-label"
                  >
                    Monto:
                  </label>
                  <input
                    ref={amount}
                    type="number"
                    name="numb"
                    className="form-control"
                    id="numb"
                    defaultValue={oldAmount}
                    required
                  ></input>
                </div>
                <div className="modificaButtons">
                  <button class="btn btn-danger" onClick={(e) => submit2(e)}>
                    Eliminar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Modificar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Modifica;
