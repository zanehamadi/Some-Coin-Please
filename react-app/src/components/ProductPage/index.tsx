import { useState } from 'react'
import {useParams} from 'react-router-dom'
import Button from '@mui/material/Button';


interface ProductPageProps{
  products?: any;
  users?: any;
}

function ProductPage({products, users}:ProductPageProps){
  let {productId}:any = useParams()
  let product = products?.find((specProduct:any) => specProduct.id === parseInt(productId))
  let user = users?.find((u:any) => u?.id === product?.user_id)
  const [updateTab, setUpdateTab] = useState<boolean>(false)
  const updateTabSwitch = () => {
    updateTab ? setUpdateTab(false) : setUpdateTab(true)
  }


  return(
    <div>

        {product ?
        <>
          <div className="main-content">
            <h1>{product?.title}</h1>
            <img src={product?.image} />
            <h3>{`invented by ${user?.username}`}</h3>
            {updateTab ? 
            <>
              <Button onClick={updateTabSwitch}>Description</Button>
              <h2>Updates</h2>

            </>
            :
            <>
              <Button onClick={updateTabSwitch}>Updates</Button>
              <h2>About the product</h2>
              <h3>Summary</h3>
              <p>{product?.summary}</p>
              <h3>Description:</h3>
              <p>{product?.description}</p>
            </>
          
            }
          </div>

          <div className="side-bar">
            <Button>Invest</Button>
            <span>Current Investors: {product?.investors}</span>
            <span>Current Funds: {product?.funding}</span>
          </div>
          
          {(JSON.parse(product?.rewards)).length && 
          <div className="rewards-container">
            {(JSON.parse(product.rewards)).map((reward: any) => 
              <div className="tier-container">
                <h3>Tier: {reward.tier}</h3>
                <h4>${reward.price}</h4>
                <h3>What you get:</h3>
                <p>{reward.description}</p>
              </div>
            )}
          </div>
          }
        </>
        :
        <>
          <h1>Product not found.(404)</h1>
        </>
        }
    </div>
  )
}

export default ProductPage