import React from "react";
import { Link } from "react-router-dom";

function Error(props) {
  return (
    <div>
      <div className="crear">
        <Link to="/profile">
          <button type="button" class="btn btn-outline-primary" id="backButton">
            Volver
          </button>
        </Link>
      </div>
      <div>
        <p>error 404</p>
      </div>
    </div>
  );
}

export default Error;
