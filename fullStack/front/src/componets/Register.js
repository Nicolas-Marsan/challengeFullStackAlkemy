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

  const [isComplete, setIsComplete] = useState(false);

  //if(mail.current){console.log(mail.current.value);}
  const submit = async (e) => {
    e.preventDefault();
    setIsComplete(true);

    const res = await Axios.post(url, {
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      mail: mail.current.value,
      password: password.current.value,
    });
  };
  return (
    <>
      {isComplete ? (
        <Redirect to="/login" />
      ) : (
        <div className="bodyNota">
          <div className="crear">
            <Link to="/">
              <button type="button" class="btn btn-outline-primary" id="backButton">
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
                  Email address
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
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  for="exampleInputPassword1"
                  className="form-label"
                >
                  Password
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
  );
}

export default Register;
