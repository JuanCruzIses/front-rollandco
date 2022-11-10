import List from "./List";
import '../css/dashboard.css'
import AllOrdersUsers from "./AllOrdersUsers";

function BodyDashboard(props) {    
    const orders = props.orders

    return (
        <div className='container-dashboard'>
            <List orders={orders} />
        </div>
    );
}

export default BodyDashboard