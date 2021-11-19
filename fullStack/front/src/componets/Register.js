import React, { useState, useContext, useRef } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
function Register(props) {
  const url = "http://localhost:3001/users/create";
  const firstName = useRef();
  const lastName = useRef();
  const mail = useRef();
  const password = useRef();
  const [error, setError] = useState(false);
  const [mailError, setMailError] = useState();
  const [isComplete, setIsComplete] = useState(false);

  
  const submit = async (e) => {
    e.preventDefault();

    const res = await Axios.post(url, {
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      mail: mail.current.value,
      password: password.current.value,
    });

    if (res.data.error) {
      setMailError(res.data.mail);

      setError(true);
    } else {
      setError(false);
    }
    setIsComplete(true);
  };

  return (
    <>
      {error ? (
        <div className="bodyNota">
          <div className="crear">
            <Link to="/">
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
            <p className="personalh1 ">Registrarse</p>
          </div>
          <div className="notaInicia2">
            <form className="login" onSubmit={(e) => submit(e)}>
              <div className="mb-3">
                <label
                  htmlFor="firstName"
                  for="exampleInputEmail1"
                  className="form-label"
                >
                  Nombre:
                </label>
                <input
                  ref={firstName}
                  type="text"
                  name="firstName"
                  className="form-control"
                  id="firstName"
                  aria-describedby="emailHelp"
                ></input>

                <label
                  htmlFor="lastName"
                  for="exampleInputEmail1"
                  className="form-label"
                >
                  Apellido:
                </label>
                <input
                  ref={lastName}
                  type="text"
                  name="lastName"
                  className="form-control"
                  id="lastName"
                  aria-describedby="emailHelp"
                ></input>

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
                  defaultValue={mailError}
                ></input>
                <div className="mb-3">
                  <label
                    htmlFor="mail"
                    for="exampleInputEmail1"
                    className="alert alert-danger"
                  >
                    Este mail ya esta en uso.
                  </label>
                </div>
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
                  Contraseña:
                </label>
                <input
                  ref={password}
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                ></input>
              </div>

              <button type="submit" className="btn btn-primary">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          {isComplete ? (
            <Redirect to="/login" />
          ) : (
            <div className="bodyNota">
              <div className="crear">
                <Link to="/">
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
                <p className="personalh1 ">Registrarse</p>
              </div>
              <div className="notaInicia2">
                <form className="login" onSubmit={(e) => submit(e)}>
                  <div className="mb-3">
                    <label
                      htmlFor="firstName"
                      for="exampleInputEmail1"
                      className="form-label"
                    >
                      Nombre:
                    </label>
                    <input
                      ref={firstName}
                      type="text"
                      name="firstName"
                      className="form-control"
                      id="firstName"
                      aria-describedby="emailHelp"
                    ></input>

                    <label
                      htmlFor="lastName"
                      for="exampleInputEmail1"
                      className="form-label"
                    >
                      Apellido:
                    </label>
                    <input
                      ref={lastName}
                      type="text"
                      name="lastName"
                      className="form-control"
                      id="lastName"
                      aria-describedby="emailHelp"
                    ></input>

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
                      Contraseña:
                    </label>
                    <input
                      ref={password}
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                    ></input>
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

export default Register;
