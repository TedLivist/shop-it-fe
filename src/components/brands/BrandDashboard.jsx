import { useEffect, useState } from "react";
import api from "../../services/auth";

const BrandDashboard = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchBrandProducts = async () => {
      api
    }
  })

  return (
    <div>
      I am a seller
    </div>
  );
}
 
export default BrandDashboard;