import React from "react";
import { useEffect, useState, useRef } from "react";
import ForEntry from "./ForEntry";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile() {
  let id = sessionStorage.getItem("id");
  let name = sessionStorage.getItem("name");
  const [moves, setMoves] = useState([]);
  const [egreso, setEgreso] = useState(0);
  const [ingreso, setIngreso] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [reenvia, setReenvia] = useState(false);
  const [cerrarS, setCerrar] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cargaId, setCargaId] = useState(false);
  const [nuevo, setNuevo] = useState([]);

  useEffect(() => {
    if (!id) {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    setCargaId(id);

    loadData();
  }, []);

  const loadData = async () => {
    
    const res = await fetch(
      "http://localhost:3001/movements/movementsById?id=" + id,{
          headers: {Authorization: sessionStorage.getItem("token")}
      }
    );
    const data = await res.json();
    setMoves(data);
  };
      console.log(moves.movements);
  useEffect(() => {
    if (moves.movements) {
      let ingresos = moves.movements.filter(
        (movimiento) => movimiento.type === "ingreso"
      );
      let egresos = moves.movements.filter(
        (movimiento) => movimiento.type === "egreso"
      );
      let saldo = 0;
      let egresosTotal = 0;
      let ingresosTotal = 0;
      for (let i = 0; i < egresos.length; i++) {
        egresosTotal += parseFloat(egresos[i].amount);
      }
      for (let i = 0; i < ingresos.length; i++) {
        ingresosTotal += parseFloat(ingresos[i].amount);
      }

      moves.movements.sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        return 0;
      });
      let nuevoAux = [];
      for (let i = 0; i < moves.movements.length; i++) {
        if (i <= 9) {
          nuevoAux.push(moves.movements[i]);
        } else {
          break;
        }
      }

      setNuevo(nuevoAux);
      setIngreso(ingresosTotal);
      setEgreso(egresosTotal);
      saldo = ingresosTotal - egresosTotal;
      saldo = saldo.toFixed(2);
      setSaldo(saldo);
      setIsComplete(true);
    }
  }, [moves]);

  function rescue(e) {
    console.log(e.target.id);
    localStorage.setItem("moveId", e.target.id);
    setReenvia(true);
  }
  function cerrar(e) {
    setCerrar(true);
  }

  return (
    <>
      {isLogged ? (
        <Redirect to="./" />
      ) : (
        <>
          {cerrarS ? (
            <Redirect to="./logout" />
          ) : (
            <>
              {reenvia ? (
                <Redirect to="./modifica" />
              ) : (
                <>
                  {moves.movements && (
                    <div className="bodyProfile">
                      <div className="row menuhome mh">
                        <div className="col">
                          <p className="client">Cliente:{" " + name} </p>
                        </div>
                        <div className="col">
                          <p className="balance">Saldo: ${saldo}</p>
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={(e) => cerrar(e)}
                          >
                            Cerrar sesión
                          </button>
                        </div>
                      </div>
                      <div className="row menuhome">
                        <div className="col menu">
                          <Link to="/NewMovement">
                            <button
                              type="button"
                              class="btn btn-primary btn-sm"
                              name="primero"
                            >
                              Crear nuevo movimiento
                            </button>
                          </Link>
                        </div>
                        <div className="col">
                          <Link to="/ForEntry">
                            <button
                              type="button"
                              class="btn btn-primary btn-sm"
                            >
                              Movimientos por ingresos
                            </button>
                          </Link>
                        </div>
                        <div className="col">
                          <Link to="/ForEgress">
                            <button
                              type="button"
                              class="btn btn-primary btn-sm"
                            >
                              Movimientos por egresos
                            </button>
                          </Link>
                        </div>
                        <div className="col">
                          <Link to="/ForCategories">
                            <button
                              type="button"
                              class="btn btn-primary btn-sm"
                            >
                              Movimientos por categoria
                            </button>
                          </Link>
                        </div>
                      </div>

                      <table className="table">
                        <thead>
                          <div className="list">
                            <div className="row align-items-start detailh1">
                              <div className="col colh1">Concepto</div>
                              <div className="col colh1">Monto</div>
                              <div className="col colh1">Tipo</div>
                              <div className="col colh1">Fecha</div>
                              <div className="col colh1">Categoria</div>
                              <div className="col colh1">Acción</div>
                            </div>
                          </div>
                        </thead>
                        <tbody>
                          {isComplete &&
                            nuevo.map((record) => {
                              return (
                                <div className="list">
                                  <div className="row align-items-start contenido detail">
                                    <div className="col">{record.concept}</div>
                                    <div className="col">${record.amount}</div>
                                    <div className="col">{record.type}</div>
                                    <div className="col">{record.date}</div>
                                    <div className="col">{(record.categories.category)}</div>
                                    <div className="col">
                                      <button
                                        className="buttonEdit"
                                        id={record.id}
                                        onClick={(e) => rescue(e)}
                                      >
                                        Borrar/editar
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Profile;
