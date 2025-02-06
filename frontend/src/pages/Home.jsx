import React from "react";
import {Link} from "react-router-dom";

const Home = () => {

  return (
    <div>
      <h1>People App Home Page</h1>
      <button className="fetchButton">
        <Link to="/people" style={{color: "inherit", textDecoration: "none"}}>
          Fetch Random Person
        </Link>
      </button>
    </div>
  );
};

export default Home;
