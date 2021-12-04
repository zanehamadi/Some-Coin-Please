import { useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Button from '@mui/material/Button';
import UpdateModal from './UpdateModal'
import ThemeProvider from '@mui/system/ThemeProvider';
import {theme} from '../styling-variables'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FundModal from './FundModal'

interface ProductPageProps{
  products?: any;
  users?: any;
  sessionUser?: any;
  updates?:any;
  investments?:any
}

function ProductPage({products, users, sessionUser, updates, investments}:ProductPageProps) {
  
  let {productId}:any = useParams()
  let product = products?.find((specProduct:any) => specProduct.id === parseInt(productId))
  let user = users?.find((u:any) => u?.id === product?.user_id)
  let navigate = useNavigate()
  let postUpdates = updates.filter((update:any) => +update.product_id === +productId)




  const [tab, setTab] = useState<string>('description');

  const handleTabChange = (_event: React.SyntheticEvent, tabValue: string) => {
    setTab(tabValue);
  };

  const isPoster = user?.id === sessionUser?.id
  

  return(
    <ThemeProvider theme={theme} >
    <div>

        {product ?


        <>
          <div className="main-content">
            <h1>{product?.title}</h1>
            {isPoster && <Button variant="outlined" color="primary" onClick={() => navigate(`/products/${productId}/edit`)}>Edit Product</Button>}
            {isPoster && <UpdateModal product={product} update={null} /> }
            {sessionUser &&  <FundModal sessionUser={sessionUser} product={product} investments={investments} /> }
            <br/>
            <img src={product?.image} style={{width:'350px', height:'250px'}}/>
            <h3>{`invented by ${user?.username}`}</h3>

            <Tabs
              value={tab}
              onChange={handleTabChange}
              textColor='primary'
              indicatorColor='secondary'
        
            >
              <Tab value="description" label="Description" />
              <Tab value="updates" label="Updates" />
              <Tab value="tiers" label="Tiers" />
            </Tabs>

            {tab === 'updates' && 
              <div className="product-update-tab">
                <h2>Updates</h2>
                {
                  postUpdates ?
                  <>
                    {postUpdates.map((update:any) => 
                    <>
                      <h3>{update.title}</h3>
                      <p>{update.description}</p>
                      {isPoster && 
                        <UpdateModal product={product} update={update}/>
                      }
                    </>
                    )}
                  </>
                  :
                  <>
                  <h2>There are no updates for this product.</h2>
                  </>
                }            
              </div>
            }

            {tab === 'description' &&             
              <div>
                <h2>About the product</h2>
                <h3>Summary</h3>
                <p>{product?.summary}</p>
                <h3>Description:</h3>
                <p>{product?.description}</p>
              </div> 
            }

            {tab === 'tiers' &&
              <div className="rewards-container">
                {JSON.parse(product.rewards).length ?
                  <>
                    {JSON.parse(product.rewards).map((reward:any) =>   
                      <div className="tier-container">
                        <h3>Tier: {reward.tier}</h3>
                        <h4>${reward.price}</h4>
                        <h3>What you get:</h3>
                        <p>{reward.description}</p>
                      </div>
                    )}
                  </>
                :
                <h2>
                  There are no rewards for funding this product.
                </h2>
              }
              </div> 
            }

                    
            
          </div>

          
        </>
        :
        <>
          <h1>Product not found.(404)</h1>
        </>
        }
    </div>
    </ThemeProvider>
  )
}

export default ProductPage