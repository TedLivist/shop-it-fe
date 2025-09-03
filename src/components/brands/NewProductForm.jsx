import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import api from "../../services/auth";

const NewProductForm = () => {
  const { categories, loading } = useCategories()

  const [name, setName] = useState("")
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(null)
  const [stock, setStock] = useState(null)
  const [status, setStatus] = useState('')
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState('')

  if (loading) return <div>Loading categories...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('product[name]', name)
    formData.append('product[description]', description)
    formData.append('product[price]', price)
    formData.append('product[stock]', stock)
    formData.append('product[status]', status)
    formData.append('product[category_id]', category)
    formData.append('product[image]', image)

    try {
      const response = await api.post('/brand/products',
        formData,
        { headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response.data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          name="description" cols="30" rows="10"
          placeholder="Enter description of product"
          required
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          type="number" name="price"
          onChange={(e) => setPrice(e.target.value)}
          required
          placeholder="Enter price in naira"
        />

        <input
          type="number" name="stock"
          onChange={(e) => setStock(e.target.value)}
          required
          placeholder="Enter stock"
        />

        <select
          name="status"
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option disabled selected value>---select status---</option>
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>

        <input type="file" name="image" required onChange={(e) => setImage(e.target.files[0])} />
        
        <select
          name="category"
          required
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled selected value>-select category-</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
 
export default NewProductForm;