// import React, { useEffect } from 'react'
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger, faList, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Administration = () => {
  const navegate = useNavigate();

  return (
    <>
      <Header />
      <div className="App">
        <div className="containerBtnAdmin">
          <Button
            className="btnAdmin"
            onClick={() => {
              navegate("/users");
            }}
          >
            <FontAwesomeIcon className="iconUsers" icon={faUsers} />
            Administración de personal
          </Button>

          <Button
            className="btnAdmin"
            onClick={() => {
              navegate("/products");
            }}
          >
            <FontAwesomeIcon className="iconUsers" icon={faHamburger} />
            Administración de productos
          </Button>

          <Button
            className="btnAdmin"
            onClick={() => {
              navegate("/orderState");
            }}
          >
            <FontAwesomeIcon className="iconUsers" icon={faList} />
            Administración de pedidos
          </Button>
        </div>
      </div>
    </>
  );
};

export default Administration;
