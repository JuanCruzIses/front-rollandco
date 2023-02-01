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
    useEffect(() => {
        fetch('http://localhost:3001/api/v1/products')
            .then(response => response.json())
            .then((json) => {
                setProducts(json.data)
            })
    }, [])
    
    const cookies = new Cookies();
    let userId = cookies.get('id')
    
    const [msgOrder, setMsgOrder] = useState('')
    const [products, setProducts] = useState([])
    const [precio, setPrecio] = useState(0)
    const [precioParcial, setPrecioParcial] = useState(0)
    
    
    let cantidad = useRef(0)
    let input = useRef()
    // let partialCost = useRef()
    // let incrementButton = useRef()
    // let decrementButton = useRef()


    let sumar = (e) => {
        e.preventDefault()
    }
    let restar = (e) => {
        e.preventDefault()
    }

    let arrayName = []
    products.map(product =>{
        let name = product.nombre.replace(' ', '_')
        return arrayName.push(name.toLowerCase())
    })
    
    const sendOrder = async (valores) => {
        let response = await fetch('http://localhost:3001/api/v1/products/order',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(valores)
            })
        if (response.ok) {
            const data = await response.json();
            setMsgOrder('Tu pedido fue realizado correctamente!')
        } else {
            setMsgOrder('Tu pedido no pudo ser realizado, por favor vuelva a intentar!')
            throw new Error(`HTTP error!!! status: ${response.status}`);
        }
    }

    let blur = (e) =>{
        console.log(e.relatedTarget.value)
        let inputs = document.querySelectorAll('.quantity-button')
        console.log(inputs[0].id)
        for(let i = 0; i < inputs.length; i++){
            // console.log(inputs[i].value)
            // cantidad.current = (Number(cantidad.current) + Number(inputs[i].value))
            // console.log(cantidad.current)
            // console.log(input.value*products[0].precio)
            // setPrecio(precio + input.value*products[0].precio)
        }
    }

  
    // let selectItem = (e)=>{
    //     let name = e.relatedTarget.id
    //     let value = e.target.value
    //     setCantidad({name : value })
    //     console.log(name)
    //     // console.log(item.target)
        
    // }
    return (
        <Formik
            initialValues={({
                id_usuario: Number(userId),
                fecha: new Date(),
            })}
            onSubmit={(valores) => {
                sendOrder(valores)
            }}
        >
        {( {values, handleSubmit, handleChange, isSubmitting} )=>(

            <Form noValidate onSubmit={handleSubmit} >
                <h3>Hacenos tu pedido!</h3>
                <Row className="mb-3">
                    <h6>Los pedidos se tomaran hasta las 19 hs. del dia anterior</h6>
                    {products.map((products, i) => (
                        <Form.Group key={`form-${i}`} as={Col} md="4" >
                            <Form.Label className='form-label-order'>{products.nombre}</Form.Label>
                            <div className='quantity-container'>
                                {/* <button
                                    ref={decrementButton}
                                    className='decrement-button'
                                    onClick={restar}
                                    key={`increment-${i}`}
                                    >-</button> */}

                                <Form.Control
                                    key={`input-${i}`}
                                    id={`input-${i}`}
                                    name={arrayName[i]}
                                    values={values}
                                    ref={input}
                                    placeholder='0'
                                    className='quantity-button'
                                    type="number"
                                    onChange={handleChange}
                                    onBlur={(e) =>blur(e)}
                                    />

                                {/* <button
                                    className='increment-button'
                                    ref={incrementButton}
                                    key={`decrement-${i}`}
                                    id={`decrement-${i}`}
                                    onClick={sumar}
                                    onChange={handleChange}
                                >+</button> */}
                            </div>
                            {/* <p
                            key={`p-${i}`}
                            id={`p-${i}`}
                            ref={partialCost}
                            className='spent-unitary'
                            >
                                ${precioParcial}
                            </p> */}
                            <Form.Control.Feedback></Form.Control.Feedback>
                        </Form.Group>
                    ))}
                    <FloatingLabel className='label-comment'  label="Dejanos tu comentario">
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
                    >${precio}</p>
                </div>

                {msgOrder.length !=0 ?
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