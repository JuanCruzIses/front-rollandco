import React from 'react';
import { NavLink } from 'react-router-dom'

function ButtonsNavigateDashboard(){
    return(
        <div
        className='container-navigate-buttons'>
             <NavLink
            className='button-navigate-dashboard'
            id='button-dashboard'
             to="/admin">
                Dashboard
            </NavLink>
            <NavLink
            className='button-navigate-dashboard'
            activeclassname='active-button-navigate-dashboard'
            to="/admin/orders">
                Todos los pedidos
            </NavLink>
            <NavLink
            className='button-navigate-dashboard'
            activeclassname='active-button-navigate-dashboard'
            to="/admin/users">
                Todos los Usuarios
            </NavLink>

        </div>
    )
}

export default ButtonsNavigateDashboard