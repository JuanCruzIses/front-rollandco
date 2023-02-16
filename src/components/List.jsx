import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'


function List(props) {

    
    let { orders } = props
    
    orders.map(order =>{
        let date = new Date(order.fecha)
        let day = date.getDate() + 1
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        let dateNow = `${day}-${month}-${year}`
    })
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th className='date-column'>Fecha</th>
                    <th>Usuario</th>
                    <th>Cantidad</th>
                    <th>Detalle</th>
                    <th>Leído</th>
                    <th>Pagado</th>
                </tr>
            </thead>
            <tbody>

                {orders && orders.map((order, i) => (
                    <tr
                        key={`tr-${i}`}
                    >
                        <td>{order.fecha}</td>
                        <td>{order.id_usuario}</td>
                        <td>{order.almendras_roll + order.cinnamon_roll + order.fenix_roll + order.jamon_roll + order.kinder_roll + order.nutella_roll + order.oreo_roll + order.pistacho_roll + order.portobello_roll}</td>
                        <td>
                            <Link
                                to={`/admin/orders/${order.id}`}
                                className='detail-button'
                            >
                                Detalle
                            </Link >
                        </td>
                        <td>
                            {order.leido == false ?
                                <p
                                    className='not-reading'> No </p>
                                :
                                <p className='reading'> Si </p>
                            }
                        </td>
                        <td>
                            {order.pagado == 0 ?
                                <p
                                    className='not-reading'> No </p>
                                :
                                <p className='reading'> Si </p>
                            }
                        </td>
                    </tr>
                ))
                }

            </tbody>
        </Table>
    );
}

export default List;