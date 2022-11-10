import '../css/navbarMain.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from "react-icons/ai";
import Cookies from 'universal-cookie'

function NavbarMain() {
  const cookies = new Cookies()
  let userName = cookies.get('id')
  let rol_id = cookies.get('rol_id')

  let cerrarSesion = function(){
    cookies.remove("id", {path:'/'})
    cookies.remove("nombre", {path:'/'})
    cookies.remove("email", {path:'/'})
    cookies.remove("rol_id", {path:'/'})
    window.location.href = '/'
  }


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/"><img alt='logoRoll' className='logoRoll' src={require('../images/logo_roll.jpg')}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"> <AiOutlineMenu className='button-menu' /> </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {userName === undefined ?
               <>
               <Nav.Link><Link to="/" >Inicio</Link></Nav.Link>
               <Nav.Link><Link to="/products">Productos</Link></Nav.Link>
               <Nav.Link><Link to="/login">Iniciar sesion</Link></Nav.Link>
               <Nav.Link><Link to="/register">Registrarse</Link></Nav.Link>  
               </>
             : 
              <>
              <Nav.Link><Link to="/" >Inicio</Link></Nav.Link>
              <Nav.Link><Link to="/products">Productos</Link></Nav.Link>
              {rol_id == 2 ?
              <Nav.Link><Link to="/products/order">Hace tu pedido</Link></Nav.Link>  
              :
              <Nav.Link><Link to="/admin">Dashboard</Link></Nav.Link>
            }
              <Nav.Link><Link onClick={cerrarSesion}>Cerrar sesion</Link></Nav.Link>
              </>
             }
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMain;