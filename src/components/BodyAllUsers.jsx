import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import NavbarMain from './NavbarMain';
import ButtonsNavigateDashboard from './ButtonsNavigateDashboard';
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'

function BodyAllUsers() {
    const cookies = new Cookies()
    
    useEffect(() => {
        console.log(cookies.get('rol_id'))
        if (cookies.get('rol_id') != 1) {
            window.location.href = '/'
        }
    })

    useEffect(() => {
        try {
            fetch('http://localhost:3001/api/v1/admin/users')
                .then(response => response.json())
                .then((json) => {
                    users.current = json.data
                    setUsuarios(json.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    const users = useRef([])
    const [usuarios, setUsuarios] = useState()

    return (
        <>
            <NavbarMain />
            <ButtonsNavigateDashboard />
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Telefono</th>
                    </tr>
                </thead>
                <tbody>

                    {usuarios && usuarios.map((usuario, i) => (
                        <tr
                            key={`tr-${i}`}
                        >
                            <Link className='redirect-detail-order' to={`/admin/users/orders/${usuario.id}`}>
                                <td>{usuario.id}</td>
                            </Link>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.telefono}</td>
                        </tr>
                    ))
                    }

                </tbody>
            </Table>
        </>
    );
}

export default BodyAllUsers;