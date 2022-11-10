import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'

function List(props) {
    
    let { orders } = props

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Cantidad</th>
                    <th>Fecha</th>
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
                        <td>{order.id_usuarios}</td>
                        <td>{order.almendras_roll + order.cinnamon_roll + order.fenix_roll + order.jamon_roll + order.kinder_roll + order.nutella_roll + order.oreo_roll + order.pistacho_roll + order.portobello_roll}</td>
                        <td>{order.fecha}</td>
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