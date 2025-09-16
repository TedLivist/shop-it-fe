import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/auth";

const EditProductForm = () => {
  const { productId } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        const product = response.data;

        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setStock(product.stock);
        setStatus(product.status);
        // Note: Don't set image file, just show current image
      } catch (error) {
        console.error('Failed to fetch product:', error);
        navigate('/brand-dashboard'); // Redirect if product not found
      } finally {
        setLoading(false);
      }
    };

    fetchProduct()
  }, [productId, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('product[name]', name);
    formData.append('product[description]', description);
    formData.append('product[price]', price);
    formData.append('product[stock]', stock);
    formData.append('product[status]', status);

    // Only append image if user selected a new one
    if (image) {
      formData.append('product[image]', image);
    }

    try {
      await api.put(`/brand/products/${productId}`, formData);
      navigate('/brand-dashboard');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required 
        />
        
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        
        <input 
          type="number" 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required 
        />
        
        <input
          type="number" name="stock"
          onChange={(e) => setStock(e.target.value)}
          required
          value={stock}
          placeholder="Enter stock"
        />

        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option disabled defaultValue value>---select status---</option>
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>

        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
        <small>Leave empty to keep current image</small>
        
        <button type="submit">Update product</button>
      </form>
    </div>
  );
}
 
export default EditProductForm;