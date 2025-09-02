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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products')
        setProducts(response.data)
      } catch (e) {
        console.error(e)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      {user && (
        <div>Logged in</div>
      )}

      {!user && (
        <div>Logged out</div>
      )}
      I am the dashboard
      {products && products.map((product) => (
        <div>
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
  );
}
 
export default Homepage;