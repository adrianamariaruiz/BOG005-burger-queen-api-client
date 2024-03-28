import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "./Button";
import { faCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { changeOrderToDelivered, deleteOrderPending } from "../helpers/axios";

const CardOrderStateDelivering = ({ order, setorderListPending }) => {
  const sendToDelivered = async () => {
    setorderListPending((currentState) => {
      const updateState = currentState.map((theOrderState) => {
        if (
          theOrderState.id === order.id &&
          theOrderState.status === "delivering"
        ) {
          return {
            ...theOrderState,
            status: "delivered",
          };
        }
        return theOrderState;
      });
      return updateState;
    });
    await changeOrderToDelivered(order.id);
  };

  const orderDeliveringDelete = async () => {
    setorderListPending((currentState) => {
      const updateDeleted = currentState.filter((theOrderState) => {
        return theOrderState.id !== order.id;
      });
      return updateDeleted;
    });
    await deleteOrderPending(order.id);
  };

  return (
    <>
      <div className="greyCont">
        <div className="divNameSend">
          <h3>{order.client}</h3>
          <p>Id mesero:{order.userId}</p>
          {order.products.map((product, id) => {
            return (
              <div key={id} className="divProductStateOrder">
                <p>{product.product.name}</p>
                <p>{product.qty}</p>
              </div>
            );
          })}
        </div>
        <div className="divTime">
          <p>{order.dataEntry}</p>
        </div>
        <div className="btnContOrderState">
          <div className="divCheck">
            <Button>
              <FontAwesomeIcon icon={faCheck} onClick={sendToDelivered} />
            </Button>
          </div>
          <div className="divCheckRed">
            <Button onClick={orderDeliveringDelete}>
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardOrderStateDelivering;
