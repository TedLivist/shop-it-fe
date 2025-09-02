const ProductItem = (props) => {
  const { name, image_url, description, price, stock } = props

  return (
    <div>
      <div>{name}</div>
      <div><img src={image_url} alt="product-img" /></div>
      <div>{description}</div>
      <div>N{price}</div>
      <div>stock: {stock}</div>
    </div>
  );
}
 
export default ProductItem;