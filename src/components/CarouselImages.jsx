import Carousel from 'react-bootstrap/Carousel';
import '../css/carouselImages.css'
import Cookies from 'universal-cookie'
import React, { useState, useEffect } from 'react';

function CarouselImages() {
  const [products, setProducts] = useState([])
  const cookies = new Cookies();
  
  
  let userName = cookies.get('nombre')

  useEffect(() => {
    fetch('https://back-rollandco-production.up.railway.app/api/products')
        .then(response => response.json())
        .then((json) => {
            setProducts(json.data)
        })
}, [])

  
  return (
    <div className='container-carousell'>
    <h3 className='effect-blur'><div className=""></div></h3>
    { userName != undefined ? 
      <h3 className='banner-welcome'>Bienvenido {userName}!</h3> : <h3 className='banner-welcome'>Bienvenido a Roll & CO</h3>
     }
    <Carousel fade>
    {products.map((products, i) => (
      ((i == 0 || i == 2 || i == 4 || i == 8 || i == 6) && 
        
        <Carousel.Item key={i}>
        <img
        className="d-block w-100"
        src={require(`../images/${products.imagen}`)}
        alt={products.nombre}
        />
        <Carousel.Caption>
        </Carousel.Caption>
        </Carousel.Item>
      )
    ))}
    </Carousel>
  </div>
  );
}

export default CarouselImages;