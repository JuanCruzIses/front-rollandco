import { useState, useEffect } from "react"
import {useParams} from 'react-router'
import '../css/bodyOrderDetail.css'
import { Formik } from 'formik'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function BodyOrderDetail(){
    const [order, setOrder] = useState()
    const [params, setParams] = useState()
    const [user, setUser] = useState()
    const [leido, setLeido] = useState()
    const [pagado, setPagado] = useState()
    let captureParams = useParams()

    useEffect(()=>{
        setParams(captureParams)
    }, [])

    let toggleCheckbox = ()=>{
        if(leido == false){
            setLeido(true)
        } else {
            setLeido(false)
        }
    }
    let toggleCheckbox2 = ()=>{
        if(pagado == false){
            setPagado(true)
        } else {
            setPagado(false)
        }
        
    }

    useEffect(()=>{
        try{
            fetch(`https://back-rollandco-production.up.railway.app/api/admin/orders/${params.id}`)
            .then(response => response.json())
            .then((json) => {
                setOrder(json.data[0])
                setLeido(json.data.leido)
                setPagado(json.data.pagado)
            })
        }catch (error) {
            setOrder(null)
        }
    }, [params])

    useEffect(()=>{
        try{
            fetch(`https://back-rollandco-production.up.railway.app/api/admin/users/${order.id_usuarios}`)
            .then(response => response.json())
            .then((json) => {
                setUser(json.data)
            })
        }catch (error) {
            setUser(null)
        }
    }, [order])

    const sendOrder = async (valores) => {
        let response = await fetch(`https://back-rollandco-production.up.railway.app/api/admin/orders/${order.id}`,
               {
                   method: 'PUT',
                   headers: {
                       'Content-Type': 'application/json;charset=utf-8'
                   },
                body: JSON.stringify(valores)
            })
            const data = await response.json();
            console.log(data)
            window.location.href=`/admin/orders/${order.id}`
    }
    
    return(
        <>
        <h6>Detalle de la orden</h6>
        <div className="container-info">
            {(order && user) &&
            <>
                <p className="p-user"><b>Usuario:</b> {user.nombre}</p>
                <p className="p-info"><b>Id:</b> {order.id}</p>
                <p className="p-info"><b>Fecha:</b> {order.fecha}</p>
                <p className="p-info"><b>Cinnamon Roll:</b> {order.cinnamon_roll}</p>
                <p className="p-info"><b>Almendras Roll:</b> {order.almendras_roll}</p>
                <p className="p-info"><b>Pistacho Roll:</b> {order.pistacho_roll}</p>
                <p className="p-info"><b>Nutella Roll:</b> {order.nutella_roll}</p>
                <p className="p-info"><b>Kinder Roll:</b> {order.kinder_roll}</p>
                <p className="p-info"><b>Fenix Roll:</b> {order.fenix_roll}</p>
                <p className="p-info"><b>Oreo Roll:</b> {order.oreo_roll}</p>
                <p className="p-info"><b>Jamon Roll:</b> {order.jamon_roll}</p>
                <p className="p-info"><b>Portobello Roll:</b> {order.portobello_roll}</p> 
                <p className="p-info"><b>Valor total:</b>${order.precio * (order.almendras_roll + order.cinnamon_roll + order.fenix_roll + order.jamon_roll + order.kinder_roll + order.nutella_roll + order.oreo_roll + order.pistacho_roll + order.portobello_roll)}</p>
                {order.comentario && <p className="p-user"><b>Comentario:</b> {order.comentario}</p>}
            </>
            }
        </div>
        <Formik
            onSubmit={(e) => {
                    sendOrder({leido: leido, pagado : pagado})
                }}
            >
            {( {values, handleSubmit, handleChange} )=>(
            <Form onSubmit={handleSubmit} className='form-order-detail'>
                <Form.Group className="container-option">
                    <Form.Label className="label-checkbox">Leído</Form.Label>
                    <input 
                    type='checkbox'
                    onClick={toggleCheckbox}
                    values={values}
                    key={'leido'}
                    checked= {leido}
                    ></input>
                </Form.Group>
                <Form.Group className="container-option">
                    <Form.Label className="label-checkbox">Pagado</Form.Label>
                    <input 
                    type='checkbox'
                    onClick={toggleCheckbox2}
                    key={'pagado'}
                    checked= {pagado}
                    ></input>
                </Form.Group>
                <Button
                variant="primary"
                type="submit"
                className="submit-button-orderDetail">
                Actualizar
                </Button>
            </Form>
            )}
        </Formik>
        </>
    )
}

export default BodyOrderDetail