import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react'

function CardsProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://back-rollandco-production.up.railway.app/api/products')
    .then(response => response.json())
    .then((json) =>{
      setProducts(json.data)
    })
}, [])

  return (
    <>
    <h2 className='h2-title'>Nuestros Rolls</h2>
    <Row xs={1} md={2} className="g-4">
      {products.map((products, i) => (
        <Col key={i}>
          <Card>
            <Card.Img variant="top" src={require(`../images/${products.imagen}`)} />
            <Card.Body>
              <div className='container-shadow'></div>
              <Card.Title>{products.nombre}</Card.Title>
              <Card.Text>
                {products.descripcion}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  )
}

export default CardsProducts
