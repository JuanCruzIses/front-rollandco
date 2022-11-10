import React, { useState, useEffect, useRef } from 'react';
import {useParams} from 'react-router'
import Table from 'react-bootstrap/Table';
import NavbarMain from './NavbarMain';
import ButtonsNavigateDashboard from './ButtonsNavigateDashboard';
import Cookies from 'universal-cookie'
import '../css/allOrdersUsers.css'

function AllOrdersUsers() {
    const cookies = new Cookies()
    let captureParams = useParams()
    useEffect(() => {
        if (cookies.get('rol_id') == 2) {
          window.location.href = '/'
        }
      })
    
    const [orders, setOrders] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        try {
            fetch(`http://localhost:3001/api/v1/admin/users/orders/${captureParams.id}`)
                .then(response => response.json())
                .then((json) => {
                    setOrders(json.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])
    useEffect(() => {
        try {
            fetch(`http://localhost:3001/api/v1/admin/users/${captureParams.id}`)
                .then(response => response.json())
                .then((json) => {
                   setUser(json.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
        <NavbarMain/>
        <ButtonsNavigateDashboard/>
        {user &&
        <h4 className='user-name'>{user.nombre}</h4>}
        <Table  bordered hover responsive>
            <thead>
                <tr>
                    <th>Cantidad</th>
                    <th>Fecha</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>

                {orders && orders.map((order, i) => (
                    <tr
                    key={`tr-${i}`}
                    >
                        <td>{order.almendras_roll + order.cinnamon_roll + order.fenix_roll + order.jamon_roll + order.kinder_roll + order.nutella_roll + order.oreo_roll + order.pistacho_roll + order.portobello_roll }</td>
                        <td>{order.fecha}</td>
                        <td>${185 * (order.almendras_roll + order.cinnamon_roll + order.fenix_roll + order.jamon_roll + order.kinder_roll + order.nutella_roll + order.oreo_roll + order.pistacho_roll + order.portobello_roll)}</td>
                    </tr>
                ))
                }

            </tbody>
        </Table>
        </>
    );
}

export default AllOrdersUsers;