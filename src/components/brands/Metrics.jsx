import { useEffect, useState } from "react";
import api from "../../services/auth";
import ProductItem from "../common/ProductItem";

const Metrics = () => {

  const [totalSales, setTotalSales] = useState('')
  const [totalOrders, setTotalOrders] = useState('')
  const [topProducts, setTopProducts] = useState([])

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const salesData = await api('/brand/metrics/sales_summary')
        const topProductsData = await api('/brand/metrics/top_products')
        const { total_sales, total_orders } = salesData.data
        setTopProducts(topProductsData.data)
        setTotalSales(total_sales)
        setTotalOrders(total_orders)
      } catch (err) {
        console.error(err)
      }
    }

    fetchMetrics()
  }, [])

  return (
    <div>
      {totalSales && (
        <div>Total sales: N{totalSales}</div>
      )}
      {totalOrders && (
        <div>Total orders: {totalOrders}</div>
      )} <br/>
      <h3>Top products</h3>
      {topProducts && topProducts.map((product) => (
        <div key={product.id}>
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
 
export default Metrics;