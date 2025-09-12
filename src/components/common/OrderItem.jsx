import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRole } from "../../hooks/useRole";
import { useState } from "react";
import api from "../../services/auth";

const OrderItem = () => {
  const navigate = useNavigate()
  const { canAccessOrderItem } = useRole()
  const location = useLocation();
  const { id } = useParams();
  const orderItem = location.state?.orderItem;
  const [status, setStatus] = useState(orderItem?.status || '');
  const [updating, setUpdating] = useState(false);

  const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      console.log(newStatus)
      await api.put(`/brand/order_items/${id}`, { status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
      setStatus(orderItem.status);
    } finally {
      setUpdating(false);
    }
  };

  if (!canAccessOrderItem(orderItem)) {
    return (
      <div>
        <p>You don't have permission to view this order.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Order Item #{orderItem.id}</h2>

      <div className="status-section">
        <label>Status: </label>
        <select 
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            handleStatusUpdate(e.target.value);
          }}
          disabled={updating}
        >
          {ORDER_STATUSES.map(statusOption => (
            <option key={statusOption} value={statusOption}>
              {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
            </option>
          ))}
        </select>
        {updating && <span>Updating...</span>}
      </div>

      <h2>Order Item #{orderItem.id}</h2>
      <p>Product: {orderItem.product.name}</p>
      <p>Quantity: {orderItem.quantity}</p>
      <p>Status: {status}</p>
      <p>Unit Price: ${orderItem.unit_price}</p>
      
      <h3>Delivery Details</h3>
      <p>Address: {orderItem.order.delivery_address}</p>
      <p>Phone: {orderItem.order.delivery_phone_number}</p>
      <p>Recipient: {orderItem.order.delivery_recipient_name}</p>
    </div>
  );
}
 
export default OrderItem