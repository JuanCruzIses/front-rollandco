import '../css/footer.css'
import Cookies from 'universal-cookie'
import {FaWhatsapp, FaMotorcycle} from 'react-icons/fa'
import {IoIosHome} from 'react-icons/io'


function Footer() {
  
  return (
    <footer>
        <h4>Contactanos</h4>
        <div className='footer-container-text'>
            <p className='footer-text'><FaWhatsapp/> 1123911681</p>
            <p className='footer-text'><IoIosHome/> Parque Rivadavia, Caballito</p>
            <p className='footer-text'><FaMotorcycle/> Envios a toda CABA</p>
        </div>
    </footer>
  );
}

export default Footer;