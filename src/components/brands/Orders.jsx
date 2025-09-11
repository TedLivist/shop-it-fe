import { useEffect, useMemo, useState } from "react";
import api from "../../services/auth";

const Orders = () => {
  const [orderItems, setOrderItems] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const statusList = ['pending', 'processing', 'delivered']

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await api.get('/brand/order_items')
        setOrderItems(response.data)
      } catch (e) {
        console.error(e)
      }
    }

    fetchOrderItems()
  })

  const filterOrderItems = useMemo(() => {
    if(statusFilter === '') {
      return orderItems
    }
    return orderItems.filter(item => item.status === statusFilter)
  }, [orderItems, statusFilter])

  return (
    <div>
      Orders...
      <div>
        <label>Filter by status</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All orders</option>
          {statusList.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {filterOrderItems.length === 0 ? (
        <p>No orders for selected status</p>
      ) : (
        filterOrderItems.map((orderItem) => (
          <div key={orderItem.id}>
            {orderItem.id} |
            {orderItem.order.delivery_address} |
            {orderItem.order.delivery_phone_number} |
            {orderItem.order.delivery_recipient_name} |
            {orderItem.product.name} |
            {orderItem.product.image_url} |
            {orderItem.quantity} |
            {orderItem.status} |
            {orderItem.unit_price} |
          </div>
        )))}
    </div>
  );
}
 
export default Orders;
