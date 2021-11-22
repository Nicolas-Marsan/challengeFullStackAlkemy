import React, { useState, useContext, useRef } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { UsuarioContext } from "./UsuarioContext";
import { Link } from "react-router-dom";

function Login(props) {
  const { setUserGlobal } = useContext(UsuarioContext);
  const url = "http://localhost:3001/users/login";
  const [isLogged, setIsLogged] = useState(false);
  const [error, setError] = useState(false);

  const mail = useRef();
  const pass = useRef();

  const submit = async (e) => {
    e.preventDefault();

    const res = await Axios.post(url, {
      mail: mail.current.value,
      password: pass.current.value,
    });
    if (res.data.error) {
      setError(true);
    }

    console.log(res.data.error);
    if (res.data.data) {
      sessionStorage.setItem("id", res.data.data.id);
      sessionStorage.setItem("name", res.data.data.first_name);
      sessionStorage.setItem("token", res.data.token);
      setIsLogged(true);
      setError(false);
    }
  };
  console.log(error);
  return (
    <>
      {error ? (
        <div className="bodyingresar">
          <div className="crear">
            <Link to="/">
              <button type="button" class="btn btn-outline-primary" id="backButton">
                Volver
              </button>
            </Link>
          </div>
          <div className="card-header ingresar">
            <p className="personalh1 ">Ingresar</p>
          </div>
          <div className="notaInicia">
            <form className="login" onSubmit={(e) => submit(e)}>
              <div className="mb-3">
                <label
                  htmlFor="mail"
                  for="exampleInputEmail1"
                  className="form-label"
                >
                  Direccion de e-mail:
                </label>
                <input
                  ref={mail}
                  type="email"
                  name="mail"
                  className="form-control"
                  id="mail"
                  aria-describedby="emailHelp"
                  required
                ></input>
                <div id="emailHelp" className="form-text">
                  No comparta su contraseña con nadie.
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  for="exampleInputPassword1"
                  className="form-label"
                >
                  Contraseña
                </label>
                <input
                  ref={pass}
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  required
                ></input>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="mail"
                  for="exampleInputEmail1"
                  className="alert alert-danger"
                >
                  Credenciales invalidas!!
                </label>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                ></input>
                <label className="form-check-label" for="exampleCheck1">
                  Recordarme
                </label>
              </div>

              <button type="submit" className="btn btn-primary">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          {isLogged ? (
            <Redirect to="/profile" />
          ) : (
            <div className="bodyingresar">
              <div className="crear">
                <Link to="/">
                  <button type="button" class="btn btn-outline-primary" id="backButton">
                    Volver
                  </button>
                </Link>
              </div>
              <div className="card-header ingresar">
                <p className="personalh1 ">Ingresar</p>
              </div>
              <div className="notaInicia">
                <form className="login" onSubmit={(e) => submit(e)}>
                  <div className="mb-3">
                    <label
                      htmlFor="mail"
                      for="exampleInputEmail1"
                      className="form-label"
                    >
                      Direccion de e-mail
                    </label>
                    <input
                      ref={mail}
                      type="email"
                      name="mail"
                      className="form-control"
                      id="mail"
                      aria-describedby="emailHelp"
                      required
                    ></input>
                    <div id="emailHelp" className="form-text">
                      No comparta su contraseña con nadie.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      for="exampleInputPassword1"
                      className="form-label"
                    >
                      Contraseña
                    </label>
                    <input
                      ref={pass}
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      required
                    ></input>
                    <div className="mb-3">
                
              </div>
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    ></input>
                    <label className="form-check-label" for="exampleCheck1">
                      Recordarme
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Ingresar
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Login;
