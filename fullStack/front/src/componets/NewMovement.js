import React, { useState, useContext, useRef, useEffect } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
function NewMovement(props) {
  const url = "http://localhost:3001/movements/create";
  const urlCat = "http://localhost:3001/movements/categories";
  const concept = useRef();
  const amount = useRef();
  const date = useRef();
  const type = useRef();
  const cat = useRef();
  const state = useRef();
  const user_id = sessionStorage.getItem("id");
  const [isComplete, setIsComplete] = useState(false);
  const [categories, setCategories] = useState();
  const [catReady, setCatReady] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch(urlCat, {
      headers: { Authorization: sessionStorage.getItem("token") },
    });
    const data = await res.json();
    setCategories(data.category);
    setCatReady(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log("submint");
    if (type.current.value != "Tipo" && cat.current.value != "Categoria") {
      const res = await Axios.post(
        url,
        {
          concept: concept.current.value,
          amount: amount.current.value,
          date: date.current.value,
          type: type.current.value,
          state: "activo",
          user_id: user_id,
          category_id: cat.current.value,
        },
        { headers: { authorization: sessionStorage.getItem("token") } }
      );
      setIsComplete(true);
    } else {
      let errorTipo = document.querySelector("#errorTipo");
      let errorCat = document.querySelector("#errorCat");

      if (type.current.value == "Tipo") {
        errorTipo.innerHTML = "Este campo es requerido";
      } else {
        errorTipo.innerHTML = "";
      }
      if (cat.current.value == "Categoria") {
        errorCat.innerHTML = "Este campo es requerido";
      } else {
        errorCat.innerHTML = "";
      }
    }
  };

  return (
    <>
      {isComplete ? (
        <Redirect to="/profile" />
      ) : (
        <div className="bodyNota">
          <div className="crear">
            <Link to="/Profile">
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
            <p className="personalh1 ">Nueva operación</p>
          </div>
          <div className="notaInicia">
            <form
              className="login"
              id="formuNewMovement"
              onSubmit={(e) => submit(e)}
            >
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
                  name="concept"
                  className="form-control"
                  id="firstName"
                  aria-describedby="emailHelp"
                  required
                ></input>
                <label
                  htmlFor="amount"
                  for="exampleInputEmail1"
                  className="form-label"
                >
                  Monto:
                </label>
                <input
                  ref={amount}
                  type="text"
                  name="amount"
                  className="form-control"
                  id="lastName"
                  aria-describedby="emailHelp"
                  required
                ></input>
                <label
                  htmlFor="date"
                  for="exampleInputEmail1"
                  className="form-label"
                >
                  Fecha:
                </label>
                <input
                  ref={date}
                  type="date"
                  name="date"
                  className="form-control"
                  id="date"
                  aria-describedby="emailHelp"
                  required
                ></input>
              </div>
              <select
                ref={cat}
                class="form-select"
                aria-label="Default select example"
                required
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
              <p id="errorCat"></p>
              <select
                id="categories"
                ref={type}
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option selected>Tipo</option>
                <option value="ingreso">Ingreso</option>
                <option value="egreso">Egreso</option>
              </select>
              <p id="errorTipo"></p>
              <button
                type="submit"
                className="btn btn-primary"
                id="newmovementbutton"
              >
                Crear
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NewMovement;
