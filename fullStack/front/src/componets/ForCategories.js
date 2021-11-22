import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function ForEgress() {
  const urlCat = "http://localhost:3001/movements/categories";
  let id = sessionStorage.getItem("id");
  const [moves, setMoves] = useState([]);
  const [arrayCategorias, setarrayCategorias] = useState();
  const [categories, setCategories] = useState();
  const [catReady, setCatReady] = useState();
  const [category, setCategory] = useState();
  const [isComplete, setIsComplete] = useState();
  const cat = useRef();

  useEffect(() => {
    loadData2();
  }, []);

  const loadData2 = async () => {
    const res = await fetch(urlCat, {
      headers: { Authorization: sessionStorage.getItem("token") },
    });
    const data = await res.json();
    setCategories(data.category);
    setCatReady(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch(
      "http://localhost:3001/movements/movementsById?id=" + id,
      {
        headers: { Authorization: sessionStorage.getItem("token") },
      }
    );
    const data = await res.json();
    setMoves(data);
  };

  useEffect(() => {
    if (moves.movements) {
      let egresos = moves.movements.filter(
        (movimiento) => movimiento.category_id == category
      );
      setarrayCategorias(egresos);
    }
  }, [moves, category]);

  const cambia = async (e) => {
    setCategory(cat.current.value);
    console.log("entro a cambia");
  };

  return (
    <>
      {
        <div className="bodyProfile">
          <div className="navProfile">
            <div className="crear">
              <Link to="/profile">
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  id="backButton"
                >
                  Volver
                </button>
              </Link>
            </div>
            <div className="card-header ingresar">
              <p className="personalh1 ">Movimientos por categorias</p>
            </div>
          </div>

          <select
            onChange={(e) => cambia(e)}
            ref={cat}
            class="form-select"
            id="select"
            aria-label="Default select example"
          >
            <option selected>Categoria</option>
            {catReady &&
              categories.map((cat) => {
                return (
                  <option value={cat.id} key={cat.id}>
                    {cat.category}
                  </option>
                );
              })}
          </select>

          <table className="table">
            <thead>
              <div className="list">
                <div className="row align-items-start detailh1">
                  <div className="col colh1">Concepto</div>
                  <div className="col colh1">Monto</div>
                  <div className="col colh1">Tipo</div>
                  <div className="col colh1">Fecha</div>
                  <div className="col colh1">Categoria</div>
                </div>
              </div>
            </thead>
            <tbody>
              {arrayCategorias &&
                arrayCategorias.map((record) => {
                  return (
                    <div className="list">
                      <div className="row align-items-start contenido detail">
                        <div className="col">{record.concept}</div>
                        <div className="col">${record.amount}</div>
                        <div className="col">{record.type}</div>
                        <div className="col">{record.date}</div>
                        <div className="col">{record.categories.category}</div>
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

export default ForEgress;
