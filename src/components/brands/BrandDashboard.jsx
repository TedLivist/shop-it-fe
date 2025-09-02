import { useEffect, useState } from "react";
import api from "../../services/auth";
import ProductItem from "../common/ProductItem";

const BrandDashboard = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchBrandProducts = async () => {
      try {
        const response = await api.get('/brand/products')
        setProducts(response.data)
      } catch (e) {
        console.error(e)
      }
    }

    fetchBrandProducts()
  }, [])

  return (
    <div>
      I am a seller
      
      {products && products.map((product) => (
        <div>
          <ProductItem
            name={product.name}
            image_url={product.image_url}
            description={product.description}
            price={product.price}
            stock={product.stock}
          />
        </div>
      ))} 
    </div>
  );
}
 
export default BrandDashboard;