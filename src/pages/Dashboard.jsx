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