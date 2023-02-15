import NavbarMain from '../components/NavbarMain'
import BodyDashboard from '../components/BodyDashboard'
import ButtonsNavigateDashboard from '../components/ButtonsNavigateDashboard'
import '../css/dashboard.css'
import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie'

function Dashboard(){
    const orders = useRef([])
    const [ordenes, setOrdenes] = useState()
    const cookies = new Cookies()

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
                    orders.current.map(order =>{
                        let date = new Date(order.fecha)
                        let day = date.getDate() + 1
                        let month = date.getMonth() + 1
                        let year = date.getFullYear()
                
                        let dateNow = `${day}-${month}-${year}`
                        order.fecha = dateNow
                    })
                    setOrdenes(orders.current)
                })
        } catch (error) {
            setOrdenes(orders.current)
        }
    }, [])

    
    return(
        <>
        <NavbarMain/>
        <ButtonsNavigateDashboard/>
        <BodyDashboard orders={orders.current}/>
        </>
    )
}

export default Dashboard