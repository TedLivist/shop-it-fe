import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/auth";
import RoleGuard from "./RoleGuard";
import { useCart } from "../contexts/cartContext";
import ProductItem from "./common/ProductItem";

const Homepage = () => {
  const { user } = useAuth()
  const { addToCart } = useCart()

  const [products, setProducts] = useState(null)
  const [allProducts, setAllProducts] = useState(null)

  const [productNameFilter, setProductNameFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products')
        setProducts(response.data)
        setAllProducts(response.data)
      } catch (e) {
        console.error(e)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (!allProducts) return

    let filtered = allProducts

    if (productNameFilter) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(productNameFilter.toLowerCase())
      )
    }

    if (categoryFilter) {
      filtered = filtered.filter(product => 
        product.category?.name?.toLowerCase().includes(categoryFilter.toLowerCase())
      )
    }

    if (brandFilter) {
      filtered = filtered.filter(product => 
        product.brand?.name?.toLowerCase().includes(brandFilter.toLowerCase())
      )
    }

    setProducts(filtered)
  }, [productNameFilter, categoryFilter, brandFilter, allProducts])

  const clearFilters = () => {
    setProductNameFilter('')
    setCategoryFilter('')
    setBrandFilter('')
  }

  return (
    <div>
      {user && <div>Logged in</div>}

      {!user && <div>Logged out</div>}
      
      I am the dashboard

      <div className="filters">
        <h3>Search Products</h3>
        
        <input
          type="text"
          placeholder="Search by product name..."
          value={productNameFilter}
          onChange={(e) => setProductNameFilter(e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Search by category..."
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Search by brand..."
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        />
        
        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <div>
        {console.log(products)}
        {products && products.map((product) => (
          <div key={product.id}>
            <ProductItem
              name={product.name}
              image_url={product.image_url}
              description={product.description}
              price={product.price}
              stock={product.stock}
            />
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default Homepage;