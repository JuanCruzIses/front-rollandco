import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'


const schema = Yup.object().shape({
  nombre: Yup.string().required('Ingrese un nombre'),
  email: Yup.string().email('Ingrese un email valido').required('Ingrese un email'),
  telefono: Yup.number().required('Ingrese un telefono'),
  contrasenia: Yup.string().required('Ingrese una contrasenia')
})

const RegisterForm = ()=>{
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null)
  const [validateErrors, setValidateErrors] = useState({})
  const [body, setBody] = useState({})
  const [userCreate, setUserCreate] = useState(null)
  const cookies = new Cookies()
  
  useEffect(() => {
  if (cookies.get('nombre') !== undefined) {
    window.location.href = '/'
    }
  })

  const handleSubmit = async (valores) => {
    const isValid = await schema.isValid(valores)
    if (isValid == false) {
      setError('Por favor verifica los datos ingresados')
    }else{
      sendOrder(valores)
    } 
  }
  

     const sendOrder = async (valores) => {
      if ((valores.contrasenia === valores.confirmContrasenia) && valores.email != undefined) {
        let response = await fetch('http://localhost:3001/api/v1/users/register',
          {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(valores)
          })
          const data = await response.json();
          console.log(data)
          console.log(data.meta.status)
          if(data.meta.status == 200){    
            window.location.href = '/login'
          } else {
            console.log('else')
            setError(data.meta.msg)
          }
      } else{
        setError('Por favor verifique los datos ingresados')
      }
    }

    return (
      <Formik
        initialValues={({
          nombre: '',
          email: '',
          telefono: '',
          contrasenia: '',
          confirmContrasenia: ''
        })}
        onSubmit={(valores) => {
          handleSubmit(valores)
        }}
        >

        { ({values, errors, handleSubmit, handleChange, handleBlur}) => (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h3 className='page-title'>Registro de usuario</h3>
          {error && 
            <Form.Group className="container-errors">
            <p>{error}</p>
            </Form.Group>
            }
          <Row className="form-group-login">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Nombre y apellido:</Form.Label>
              <Form.Control
                required
                type="text"
                name='nombre'
                values={values}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Correo electronico:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  className='input-email'
                  type="text"
                  aria-describedby="inputGroupPrepend"
                  required
                  name='email'
                  values={values}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Telefono de contacto:</Form.Label>
              <Form.Control
                type="number"
                name='telefono'
                values={values}
                onChange={handleChange}
                onBlur={handleBlur}
                required />
              <Form.Control.Feedback type="invalid">
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                required
                type="password"
                name='contrasenia'
                values={values}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>Confirmar contraseña:</Form.Label>
              <Form.Control
                required
                type="password"
                name='confirmContrasenia'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>

          </Row>
            {userCreate ? 
          <div>
            {userCreate}
            <Link to="/login"><p className='login'>Inicia sesion</p></Link>    
          </div>
              :
          <Button type="submit">Enviar</Button>
          }
        </Form>
    )}
      </Formik>
    );
  }

export default RegisterForm 