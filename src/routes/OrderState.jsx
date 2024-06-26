import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CardOrderState from '../components/CardOrderState';
import { viewOrderPending } from '../helpers/axios';
import { useNavigate } from 'react-router-dom';
import CardOrderStateDelivering from '../components/CardOrderStateDelivering';
import CardOrderStateDelivered from '../components/CardOrderStateDelivered';

const OrderState = () => {

    const userActived = localStorage.getItem('userRole')
    const navegate = useNavigate()

    const [orderListPending, setorderListPending] = useState([])
    
    useEffect(() => {
        if (orderListPending.length === 0) {
            const viewListOrderPending = async () => {
                const res = await viewOrderPending()
                setorderListPending(res)
            }
            viewListOrderPending()
        }
    }, [orderListPending])


    const orderStatusPending = orderListPending.filter((order) => {
        return order.status === 'pending' && order
    })
    
    const orderStatusDelivering = orderListPending.filter((order) => {
        return order.status === 'delivering' && order
    })

    const orderStatusDelivered = orderListPending.filter((order) => {
        return order.status === 'delivered' && order
    })


    return (
        <section >
            <Header />
            <section className='containerOrderState'>
                <div className='containerBtnP'>
                    <div className='containerBtnBack'>
                        {
                            userActived === 'admin' && 
                                <Button className='btnOrderRow' onClick={() => { navegate('/admin') }}><FontAwesomeIcon className='iconArrow' icon={faCircleArrowLeft} />Inicio</Button>
                        }
                        <Button className='btnOrderRow'
                            onClick={() => { navegate('/order') }}>
                            <FontAwesomeIcon className='iconArrowOrderState' icon={faCircleArrowLeft} />Realizar Pedido
                        </Button>
                    </div>
                </div>
                <div className='containerH1'>
                    <h1>Estado de los Pedidos</h1>
                </div>

                <div className='containerGridOrderState'>

                    <div className='pOrderState'>
                        <div className='pOrderStateSend'><p>Enviados</p></div>
                        {orderStatusPending.map((order, id) => {
                            return (
                                <div key={id}>
                                    <CardOrderState
                                        order={order}
                                        setorderListPending={setorderListPending}
                                    />
                                </div>
                            )
                        })}
                    </div>

                    <div className='pOrderState'>
                        <div className='pOrderStateSend'><p>Servidos</p></div>
                        {orderStatusDelivering.map((order, id) => {
                            return (
                                <div key={id}>
                                    <CardOrderStateDelivering
                                        order={order}
                                        setorderListPending={setorderListPending}
                                    />
                                </div>
                            )
                        })}
                    </div>

                    <div className='pOrderState'>
                        <div className='pOrderStateSend'><p>Entregados</p></div>
                        {orderStatusDelivered.map((order, id) => {
                            return (
                                <div key={id}>
                                    <CardOrderStateDelivered
                                        order={order}
                                        setorderListPending={setorderListPending}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>

            </section>

        </section>

    )
}

export default OrderState