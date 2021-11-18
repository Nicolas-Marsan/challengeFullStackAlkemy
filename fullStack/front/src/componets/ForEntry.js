import React from "react";
import { useEffect, useState } from "react";
import PropsMoves from "./PropsMoves";

import { Link } from "react-router-dom";

function ForEntry() {
  let id = sessionStorage.getItem("id");
  const [moves, setMoves] = useState([]);
  const [ingreso, setIngreso] = useState(0);

  useEffect(() => {
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

  useEffect(() => {
    if (moves.movements) {
      let ingresos = moves.movements.filter(
        (movimiento) => movimiento.type === "ingreso"
      );
      setIngreso(ingresos);
    }
  }, [moves]);

  return (
    <>
      {
        <div className="bodyProfile">
          <div className="navProfile">
            <div className="crear">
              <Link to="/profile">
                <button type="button" class="btn btn-outline-primary" id="backButton">
                  Volver
                </button>
              </Link>
            </div>
            <div className="card-header ingresar">
              <p className="personalh1 ">Movimientos por ingresos</p>
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
                </div>
              </div>
            </thead>
            <tbody>
              {ingreso &&
                ingreso.map((record) => {
                  return (
                    <div className="list">
                      <div className="row align-items-start contenido detail">
                        <div className="col">{record.concept}</div>
                        <div className="col">${record.amount}</div>
                        <div className="col">{record.type}</div>
                        <div className="col">{record.date}</div>
                      </div>
                    </div>
                  );
                })}
            </tbody>
          </table>
        </div>
      }
    </>
  );
}

export default ForEntry;
