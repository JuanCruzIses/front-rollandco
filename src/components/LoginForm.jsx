import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'


const LoginForm = () => {
    const [error, setError] = useState(null)
    const [body, setBody] = useState({email: '', contrasenia: ''})
    const cookies = new Cookies()

    useEffect(()=>{
        if(cookies.get('nombre') !== undefined){
            window.location.href = '/'
        }
    })

    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        })
    }

    const sendOrder = async (valores) => {
        let response = await fetch('https://back-rollandco-production.up.railway.app/api/users/login',
               {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json;charset=utf-8'
                   },
                body: JSON.stringify(valores)
            })
            const data = await response.json();
            if(data.data){    
                cookies.set('id', data.data[0].id, {path: '/'})
                cookies.set('nombre', data.data[0].nombre, {path: '/'})
                cookies.set('email', data.data[0].email, {path: '/'})
                cookies.set('rol_id', data.data[0].rol_id, {path: '/'})
                window.location.href='/'
            } else {
                setError(data.msg)
            }
    }
    return (
            <Formik
                initialValues={({
                   email: '', 
                   contrasenia: ''
                })}
                onSubmit={(valores) => {
                    sendOrder(valores)
                }}
            >
            {( {values, handleSubmit, handleChange} )=>(
            <Form onSubmit={handleSubmit}>
            <h3 className='page-title'>Inicio de sesion</h3>
            {error && 
            <Form.Group className="container-errors">
            <p>{error}</p>
            </Form.Group>
            }
            <Form.Group className="form-group-login" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    name='email'
                    values={values}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="form-group-login" controlId="formBasicPassword">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                    type="password"
                    name='contrasenia'
                    values={values}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
            >
                Ingresar
            </Button>
            <p>Si aun no se encuentra registrado, hacer click <Link to="/register">aqui</Link></p>
            </Form>
            )}
        </Formik>
    );
}

export default LoginForm;
