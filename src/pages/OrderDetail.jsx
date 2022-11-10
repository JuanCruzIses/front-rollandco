import NavbarMain from '../components/NavbarMain'
import BodyDashboard from '../components/BodyDashboard'
import ButtonsNavigateDashboard from '../components/ButtonsNavigateDashboard'
import '../css/dashboard.css'
import React, { useState, useEffect, useRef } from 'react';
import BodyOrderDetail from '../components/BodyOrderDetail';


function OrderDetail(){
    return(
        <>
        <NavbarMain/>
        <ButtonsNavigateDashboard/>
        <BodyOrderDetail/>
        </>
    )
}

export default OrderDetail;
