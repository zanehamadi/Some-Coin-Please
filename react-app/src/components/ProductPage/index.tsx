import {useParams} from 'react-router-dom'

interface ProductPageProps{
  products?: object
}
function ProductPage({products}:ProductPageProps){
  let {productId} = useParams()
  let product = products?.find(specProduct => specProduct.id === productId)
  return(
    <h1>{productId}</h1>
  )
}

export default ProductPage