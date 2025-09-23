import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/cartContext";
import api from "../services/auth";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth()
  const [processing, setProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  useEffect(() => {
    const fetchDeliveryAddresses = async () => {
      if (!user) return;

      try {
        const response = await api.get('/customer/delivery_addresses');
        console.log(response.data)
        setDeliveryAddresses(response.data);
        
        const defaultAddress = response.data.find(addr => addr.is_default);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id.toString());
        }
      } catch (error) {
        console.error('Failed to fetch delivery addresses:', error);
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchDeliveryAddresses();
  }, [user]);

  const handlePayment = async () => {
    if (!user) {
      alert('Please log in to place an order');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!selectedAddressId) {
      alert('Please select a delivery address');
      return;
    }

    setProcessing(true);

    try {
      const orderData = {
        order: {
          delivery_address_id: parseInt(selectedAddressId),
          order_items: cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity
          }))
        }
      };

      console.log(orderData)

      const response = await api.post('/customer/orders', orderData);
      
      setTimeout(() => {
        setOrderSuccess(true);
        clearCart();
        setProcessing(false);
      }, 2000);

    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
      setProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div>
        <h2>Order Successful!</h2>
        <p>Your order has been placed successfully.</p>
        <p>You will receive a confirmation shortly.</p>
        <button onClick={() => setOrderSuccess(false)}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>
          <input 
            type="number" 
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
            min="1"
          />
          <span>${item.price * item.quantity ? item.price * item.quantity : 0}</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <div>Total: ${getTotalPrice()}</div>

      {cartItems.length > 0 && (
        <div>
          <hr />
          <h3>Delivery Address</h3>
          {loadingAddresses ? (
            <p>Loading addresses...</p>
          ) : deliveryAddresses.length === 0 ? (
            <div>
              <p>No delivery addresses found.</p>
              <p>Please add a delivery address in your profile before ordering.</p>
            </div>
          ) : (
            <div>
              <label>Select Delivery Address:</label>
              <select 
                value={selectedAddressId}
                onChange={(e) => setSelectedAddressId(e.target.value)}
              >
                <option value="">-- Select Address --</option>
                {deliveryAddresses.map(address => (
                  <option key={address.id} value={address.id}>
                    {address.description} | {address.first_name} {address.last_name}
                    {address.is_default ? ' (Default)' : ''}
                  </option>
                ))}
              </select>
              
              {selectedAddressId && (
                <div>
                  <strong>Selected Address:</strong>
                  {deliveryAddresses
                    .filter(addr => addr.id.toString() === selectedAddressId)
                    .map(addr => (
                      <div key={addr.id}>
                        <p>{addr.first_name} {addr.last_name}</p>
                        <p>{addr.description}</p>
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          )}

          <hr />
          <h3>Payment</h3>
          <div>
            <p>Total Amount: <strong>${getTotalPrice()}</strong></p>
            <button 
              onClick={handlePayment} 
              disabled={processing || !selectedAddressId}
            >
              {processing ? 'Processing Payment...' : 'Pay Now (Test Payment)'}
            </button>
          </div>

          {processing && (
            <p>Please wait, processing your order...</p>
          )}
        </div>
      )}
    </div>
  );
};
 
export default Cart;