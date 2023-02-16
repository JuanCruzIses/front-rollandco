import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'



function OrderForm() {

    const sendOrder = async (valores) => {
        console.log(valores)
        let response = await fetch('https://back-rollandco-production.up.railway.app/api/products/order',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(valores)
            })
        if (response.ok) {
            setMsgOrder('Tu pedido fue realizado correctamente!')
        } else {
            setMsgOrder('Tu pedido no pudo ser realizado, por favor vuelva a intentar!')
            throw new Error(`HTTP error!!! status: ${response.status}`);
        }
    }

    useEffect(() => {
        fetch('https://back-rollandco-production.up.railway.app/api/products')
            .then(response => response.json())
            .then((json) => {
                setProducts(json.data)
            })
    }, [])


    const cookies = new Cookies();
    let userId = cookies.get('id')

    const [msgOrder, setMsgOrder] = useState('')
    const [products, setProducts] = useState([])

    let arrayName = []
    products.map(product => {
        let name = product.nombre.replace(' ', '_')
        return arrayName.push(name.toLowerCase())
    })

    let inputValues = useRef({
        almendras_roll: 0,
        cinnamon_roll: 0,
        fenix_roll: 0,
        kinder_roll: 0,
        jamon_roll: 0,
        nutella_roll: 0,
        oreo_roll: 0,
        pistacho_roll: 0,
        portobello_roll: 0
    })


    let sumatory
    let modifyValue = ((e) => {
        let name = e.target.name
        let value = e.target.value

        if (value == undefined || value == '') {
            value = 0
        }

        Object.defineProperty(inputValues.current, name, {
            configurable: true,
            value: Number(value)
        })

        let object = inputValues.current
        let { almendras_roll, cinnamon_roll, fenix_roll, kinder_roll, jamon_roll, nutella_roll, oreo_roll, pistacho_roll, portobello_roll } = object
        sumatory = almendras_roll + cinnamon_roll + fenix_roll + kinder_roll + jamon_roll + nutella_roll + oreo_roll + pistacho_roll + portobello_roll
        let p = document.getElementsByClassName('cost-number')
        let precio = new Intl.NumberFormat('es-ES').format(products[0].precio * sumatory)
        p[0].innerText = `$ ${products[0].precio * sumatory}`
    })


    let date = new Date()

    let day = date.getDate() + 1
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let dateNow = `${year}-${month}-${day}`

    return (
        <Formik
            initialValues={({
                id_usuario: Number(userId),
                fecha: dateNow,
                almendras_roll:0,
                cinnamon_roll:0,
                pistacho_roll:0,
                nutella_roll:0,
                kinder_roll:0,
                fenix_roll:0,
                oreo_roll:0,
                portobello_roll:0,
                jamon_roll:0
            })}
            onSubmit={(valores) => {
                sendOrder(valores)
            }}
        >
            {({ values, handleSubmit, handleChange, isSubmitting }) => (

                <Form noValidate onSubmit={handleSubmit} >
                    <h3>¡Hace tu pedido!</h3>
                    <Row className="mb-3">
                        <h6>Los pedidos se tomaran hasta las 19 hs. del dia anterior</h6>
                        {products.map((products, i) => (
                            <Form.Group key={`form-${i}`} as={Col} md="4" >
                                <Form.Label className='form-label-order'>{products.nombre}</Form.Label>
                                <div className='quantity-container'>
                                    <Form.Control
                                        key={`input-${i}`}
                                        id={`${i}`}
                                        name={arrayName[i]}
                                        values={values}
                                        placeholder='0'
                                        className='quantity-button'
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={(e) => modifyValue(e)}
                                    />
                                </div>
                                <Form.Control.Feedback></Form.Control.Feedback>
                            </Form.Group>
                        ))}
                        <FloatingLabel className='label-comment' label="Dejanos tu comentario">
                            <Form.Control
                                as="textarea"
                                className='input-textarea'
                                style={{ height: '8em' }}
                                values={values}
                                onChange={handleChange}
                                name='comentario'
                            />
                        </FloatingLabel>

                    </Row>

                    <div className='container-costTotal'>
                        <p className='cost-text'>Costo total:</p>
                        <p
                            className='cost-number'
                        >${ }</p>
                    </div>

                    {msgOrder.length !== 0 ?
                        <div>
                            <h6>{msgOrder}</h6>
                            <Link to="/" ><p className='retun-home'>Volver a inicio</p></Link>
                        </div> :
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Enviar'} </Button>
                    }
                </Form>
            )}
        </Formik>
    );
}


export default OrderForm