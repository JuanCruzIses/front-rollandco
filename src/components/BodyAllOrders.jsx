import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import NavbarMain from './NavbarMain';
import ButtonsNavigateDashboard from './ButtonsNavigateDashboard';
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import '../css/bodyAllOrders.css'

function BodyAllOrders() {
    const arrayUser = useRef([])
    const orders = useRef([])
    const [ordenes, setOrdenes] = useState()
    const cookies = new Cookies()
    const [user, setUser] = useState()


    useEffect(() => {
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
                    orders.current.map(object=>{
                        let date = new Date(object.fecha)
                        let day = date.getDate() + 1
                        let month = date.getMonth() + 1
                        let year = date.getFullYear()

                        let dateNow = `${day}-${month}-${year}`
                        object.fecha = dateNow

                    setOrdenes(orders.current)
                    })
                })
        } catch (error) {
            setOrdenes(0)
        }
    }, [])

    useEffect(()=>{
        try{
            ordenes.forEach((orden, index)=>{
                if(index >= ordenes.length){
                    console.log('funciona')
                    fetch(`https://back-rollandco-production.up.railway.app/api/admin/users/${orden.id_usuarios}`)
                    .then(response => response.json())
                    .then((json) => {
                        console.log(json)
                        let result = arrayUser.current.indexOf(json.data[0].nombre)
                        console.log(result)
                        if(result !== -1){
                            console.log(json.data[0].nombre)
                        }
                     })
                }
                })
        }catch (error) {
            setUser(null)
        }
    }, [ordenes])
    // console.log(user)

    return (
        <>
            <NavbarMain />
            <ButtonsNavigateDashboard />
            <Table responsive bordered hover>
                <thead>
                    <tr>
                        <th className='locker-date'>FECHA</th>
                        <th>USUARIO</th>
                        <th>ROLL</th>
                        <th>CR</th>
                        <th>PR</th>
                        <th>NR</th>
                        <th>KR</th>
                        <th>FR</th>
                        <th>OR</th>
                        <th>JP</th>
                        <th>PP</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.current.map((orden, index) => (
                        <tr key={index}>
                            <td className='td locker-date'>{orden.fecha}</td>
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
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default BodyAllOrders;