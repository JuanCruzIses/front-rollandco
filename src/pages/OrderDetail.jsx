import NavbarMain from '../components/NavbarMain'
import ButtonsNavigateDashboard from '../components/ButtonsNavigateDashboard'
import '../css/dashboard.css'
import React, { useState, useEffect, useRef } from 'react';
import BodyOrderDetail from '../components/BodyOrderDetail';
import Cookies from 'universal-cookie'


function OrderDetail(){
    const cookies = new Cookies()
    useEffect(() => {
        if (cookies.get('rol_id') != 1) {
          window.location.href = '/'
        }
      })
    
    return(
        <>
        <NavbarMain/>
        <ButtonsNavigateDashboard/>
        <BodyOrderDetail/>
        </>
    )
}

export default OrderDetail;
