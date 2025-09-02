import { useEffect, useState } from "react";
import api from "../../services/auth";

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
      {console.log(products)}
    </div>
  );
}
 
export default BrandDashboard;