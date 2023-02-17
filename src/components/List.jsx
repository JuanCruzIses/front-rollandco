import React, { useEffect, useRef, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination';

function List(props) {
    let [page, setPage] = useState(1)
    let [itemsPerPage, setItemsPerPage] = useState(page*10)
    let [inicio, setInicio] = useState(0)
    
    useEffect(()=>{
        setItemsPerPage(page*10)
    },[page])

    let { orders } = props

    let itemsForRender = orders.slice(inicio, itemsPerPage)
    
    let nextHandler = ()=>{
        if(orders[itemsPerPage] !== undefined){
            setInicio(itemsPerPage)
            setPage(page+1)
        }
    }
    
    let  prevHandler = ()=>{
        if(page > 1){
            setPage(page-1)
            setInicio(itemsPerPage-20)
            console.log(inicio)
            console.log(itemsPerPage)
        }
    }
    
    orders.map(order =>{
        let date = new Date(order.fecha)
        let day = date.getDate() + 1
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        let dateNow = `${day}-${month}-${year}`
    })

    return (
        <>

        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th className='date-column'>Fecha</th>
                    <th>Usuario</th>
                    <th>Cantidad</th>
                    <th>Detalle</th>
                    <th>Precio</th>
                    <th>Leído</th>
                    <th>Pagado</th>
                </tr>
            </thead>
            <tbody>

                {itemsForRender && itemsForRender.map((order, i) => (
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
                        ${new Intl.NumberFormat('es-ES').format(222 * (order.almendras_roll + order.cinnamon_roll + order.fenix_roll + order.jamon_roll + order.kinder_roll + order.nutella_roll + order.oreo_roll + order.pistacho_roll + order.portobello_roll))}
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
        <Pagination pagination={page} size="sm">
                <Pagination.Prev onClick={prevHandler} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextHandler}/>
            </Pagination>
        </>
    );
}

export default List;