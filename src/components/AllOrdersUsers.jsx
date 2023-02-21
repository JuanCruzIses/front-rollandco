import React, { useState, useEffect, useRef } from 'react';
import {useParams} from 'react-router'
import Table from 'react-bootstrap/Table';
import NavbarMain from './NavbarMain';
import ButtonsNavigateDashboard from './ButtonsNavigateDashboard';
import Cookies from 'universal-cookie'
import '../css/allOrdersUsers.css'
import { Link } from 'react-router-dom'

function AllOrdersUsers() {
    const order = useRef([])
    const cookies = new Cookies()
    let captureParams = useParams()
    useEffect(() => {
        if (cookies.get('rol_id') != 1) {
          window.location.href = '/'
        }
      })
    
    const [orders, setOrders] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        try {
            fetch(`https://back-rollandco-production.up.railway.app/api/admin/users/orders/${captureParams.id}`)
                .then(response => response.json())
                .then((json) => {
                    if(json.data){              
                            order.current = json.data
                            order.current.map(object=>{
                            let date = new Date(object.fecha)
                            let day = date.getDate() + 1
                            let month = date.getMonth() + 1
                            let year = date.getFullYear()
                            
                            let dateNow = `${day}-${month}-${year}`
                            object.fecha = dateNow
                        })
                        setOrders(order.current)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }, [])
    
    useEffect(() => {
        try {
            fetch(`https://back-rollandco-production.up.railway.app/api/admin/users/${captureParams.id}`)
                .then(response => response.json())
                .then((json) => {
                   setUser(json.data[0].nombre)
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
        <h4 className='user-name'>{user}</h4>}
        <Table  bordered hover responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Fecha</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>

                {orders ? orders && orders.map((order, i) => (
                    <tr
                    key={`tr-${i}`}
                    >
                        <td>
                            <Link to={`/admin/orders/${order.id}`}>
                                {order.id}
                            </Link>
                        </td>
                        <td>{order.fecha}</td>
                        <td>{order.almendras_roll + order.cinnamon_roll + order.fenix_roll + order.jamon_roll + order.kinder_roll + order.nutella_roll + order.oreo_roll + order.pistacho_roll + order.portobello_roll }</td>
                        <td>${222 * (order.almendras_roll + order.cinnamon_roll + order.fenix_roll + order.jamon_roll + order.kinder_roll + order.nutella_roll + order.oreo_roll + order.pistacho_roll + order.portobello_roll)}</td>
                    </tr>
                )) : <tr><td colSpan={4}>Aun no ha realizado ningun pedido</td></tr>
                }

            </tbody>
        </Table>
        </>
    );
}

export default AllOrdersUsers;