import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import NavbarMain from './NavbarMain';
import ButtonsNavigateDashboard from './ButtonsNavigateDashboard';
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import '../css/bodyAllOrders.css'

function BodyAllOrders() {
    const orders = useRef([])
    const [ordenes, setOrdenes] = useState()
    const cookies = new Cookies()

    useEffect(() => {
        console.log(cookies.get('rol_id'))
        if (cookies.get('rol_id') != 1) {
            window.location.href = '/'
        }
    })

    useEffect(() => {
        try {
            fetch('https://back-rollandco-production.up.railway.app/api/admin/orders')
                .then(response => response.json())
                .then((json) => {
                    orders.current = json.data
                    setOrdenes(orders.current)
                })
        } catch (error) {
            setOrdenes(0)
        }
    }, [])

    return (
        <>
            <NavbarMain />
            <ButtonsNavigateDashboard />
            <Table responsive bordered hover>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>ROLL</th>
                        <th>CR</th>
                        <th>PR</th>
                        <th>NR</th>
                        <th>KR</th>
                        <th>FR</th>
                        <th>OR</th>
                        <th>JP</th>
                        <th>PP</th>
                        <th>FECHA</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.current.map((orden, index) => (
                        // 
                        <tr key={index}>
                            <Link className='redirect-detail-order' to={`/admin/orders/${orden.id}`}>
                                <td>{orden.id_usuarios}</td>
                            </Link>
                            <td className='td'>{orden.cinnamon_roll}</td>
                            <td className='td'>{orden.almendras_roll}</td>
                            <td className='td'>{orden.pistacho_roll}</td>
                            <td className='td'>{orden.nutella_roll}</td>
                            <td className='td'>{orden.kinder_roll}</td>
                            <td className='td'>{orden.fenix_roll}</td>
                            <td className='td'>{orden.oreo_roll}</td>
                            <td className='td'>{orden.jamon_roll}</td>
                            <td className='td'>{orden.portobello_roll}</td>
                            <td className='td'>{orden.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default BodyAllOrders;