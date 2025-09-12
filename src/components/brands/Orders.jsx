import { useEffect, useMemo, useState } from "react";
import api from "../../services/auth";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate()
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

  const handleOrderItemView = (orderItem) => {
    navigate(`/orderItem/${orderItem.id}`, {
      state: { orderItem }
    })
  }

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
            {orderItem.product.name} |
            {orderItem.product.image_url} |
            {orderItem.quantity} |
            {orderItem.status} |
            {orderItem.unit_price} |

            <button onClick={() => handleOrderItemView(orderItem)}>
              View order
            </button>
          </div>
        )))}
    </div>
  );
}
 
export default Orders;
