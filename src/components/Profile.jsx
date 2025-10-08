import { useState, useEffect } from 'react';
import api from '../services/auth';
import Orders from './customers/Orders';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('delivery-address');
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  // states for editing
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await api.get('/customer/delivery_addresses');
      setAddresses(response.data);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address.id);
    setPhoneNumber(address.phone_number);
    setDescription(address.description);
    setFirstName(address.first_name);
    setLastName(address.last_name);
    setIsDefault(address.is_default);
  };

  const handleUpdate = async (addressId) => {
    try {
      await api.put(`/customer/delivery_addresses/${addressId}`, {
        delivery_address: {
          phone_number: phoneNumber,
          description,
          first_name: firstName,
          last_name: lastName,
          is_default: isDefault
        }
      });
      setEditingAddress(null);
      fetchAddresses(); // Refresh list
    } catch (error) {
      console.error('Failed to update address:', error);
    }
  };

  const handleCancel = () => {
    setEditingAddress(null);
    setPhoneNumber('');
    setDescription('');
    setFirstName('');
    setLastName('');
    setIsDefault(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Side Menu - Horizontal */}
      <div style={{ marginBottom: '30px', borderBottom: '1px solid #ccc' }}>
        <h2>Profile</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px' }}>
          <li>
            <button onClick={() => setActiveTab('delivery-address')}>
              Delivery Addresses
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('customer-orders')}>
              Orders
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('personal-info')} disabled>
              Personal Info (Coming Soon)
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div>
        {activeTab === 'delivery-address' && (
          <div>
            <h3>Delivery Addresses</h3>
            
            {loading ? (
              <p>Loading addresses...</p>
            ) : (
              <div>
                {addresses.length === 0 ? (
                  <p>No delivery addresses found.</p>
                ) : (
                  <div>
                    {addresses.map((address) => (
                      <div key={address.id} style={{ 
                        border: '1px solid #ddd', 
                        borderRadius: '8px',
                        padding: '20px',
                        backgroundColor: address.is_default ? '#f0f8ff' : '#fff',
                        position: 'relative'
                      }}>
                        {editingAddress === address.id ? (
                          // Edit Form
                          <div>
                            <h4>Edit Address</h4>
                            <div>
                              <label>Phone Number: </label><br />
                              <input 
                                type="text" 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                            </div>
                            <div>
                              <label>Description: </label><br />
                              <input 
                                type="text" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>
                            <div>
                              <label>First Name: </label><br />
                              <input 
                                type="text" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            </div>
                            <div>
                              <label>Last Name: </label><br />
                              <input 
                                type="text" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                              />
                            </div>
                            <div>
                              <label>
                                <input 
                                  type="checkbox" 
                                  checked={isDefault}
                                  onChange={(e) => setIsDefault(e.target.checked)}
                                />
                                Set as default address
                              </label>
                            </div>
                            <div>
                              <button onClick={() => handleUpdate(address.id)}>
                                Save
                              </button>
                              <button onClick={handleCancel} >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          // Display Address
                          <div>
                            <div>
                              <h4>Address #{address.id}</h4>
                              {address.is_default && 
                                <span
                                  style={{ 
                                  backgroundColor: '#28a745', 
                                  color: 'white', 
                                  padding: '2px 8px',
                                  borderRadius: '12px',
                                  fontSize: '12px'
                                }}>
                                  Default
                                </span>
                              }
                            </div>
                            <div>
                              <p><strong>Phone:</strong> {address.phone_number}</p>
                              <p><strong>Description:</strong>{address.description}</p>
                              <p><strong>Name:</strong>{address.first_name + " " + address.last_name}</p>
                            </div>
                            <button onClick={() => handleEdit(address)}>
                              Edit Address
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'customer-orders' && (
          <div>
            <Orders />
          </div>
        )}

        {activeTab === 'personal-info' && (
          <div>
            <h3>Personal Information</h3>
            <p>Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;