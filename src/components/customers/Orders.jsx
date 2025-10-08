import { useEffect, useState } from "react";
import api from "../../services/auth";

const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      const response = await api.get('/customer/orders')
      setOrders(response.data)
    }

    fetchCustomerOrders()
  })

  return (
    <div>
      {orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <div key={order.id}>
              <div>{order.status}</div>
              <div>{order.delivery_address}</div>
              <div>{order.delivery_phone_number}</div>
              <div>{order.delivery_recipient_name}</div>
              {order.order_items.map((item) => (
                <ul>
                  <li>{item.product_name} | {item.quantity} | {item.status} | {item.unit_price}</li>
                </ul>
              ))}
            </div>
          ))}
        </div>
      ) : (
          <div>No orders yet</div>
          )}
    </div>
  );
}
 
export default Orders;