import React from 'react'
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { deleteOrderPending } from '../helpers/axios';

const CardOrderStateDelivered = ({order, setorderListPending}) => {

  const orderDeliveredDelete = async() => {
    setorderListPending(( currentState )=>{
      const updateDeleted = currentState.filter( (theOrderState) => {
          return theOrderState.id !== order.id
      })
      return updateDeleted
    })
    await deleteOrderPending(order.id)
  }

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
            )
          })}
        </div>
        <div className="divTime">
          <p>{order.dataEntry}</p>
        </div>
        <div className="divCheckRed">
            <Button onClick={orderDeliveredDelete}><FontAwesomeIcon icon={faTrashCan}/></Button>
        </div>
      </div>
    </>
  );
};

export default CardOrderStateDelivered