
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ThemeProvider from '@mui/system/ThemeProvider';
import {theme} from '../styling-variables'
import {useUpdateTrigger} from '../../context/updateTrigger'

interface HomeProps{
  sessionUser?:any;
  products?:any;
  updates?:any;
}

function Home({sessionUser, products}:HomeProps){
  
  const [tab, setTab] = useState<string>('updates');
  const navigate = useNavigate()
  const {updateTrigger}:any = useUpdateTrigger()
  
  
  let userId = sessionUser ? sessionUser.id : ''
 
  const [userProducts, setUserProducts] = useState<any>('')
  const [userInvestments, setUserInvestments] = useState<any>('')
  const [investedProductUpdates, setInvestedProductUpdates] = useState<Array<any>>([])


  useEffect(() => {

    let filteredUserProducts = products.filter((product:any) => product.user_id === userId)
    setUserProducts(filteredUserProducts)


    let filteredUserInvestments = products.filter((product:any) => product.funders.includes(userId))
    setUserInvestments(filteredUserInvestments)
    let filteredInvestedProducts: Array<any> = []


    filteredUserInvestments?.forEach((product:any) => {
      if(product.Updates.length){
        product.Updates.forEach((update:any) => filteredInvestedProducts.push(update))
      }
    })
    setInvestedProductUpdates(filteredInvestedProducts)


  }, [updateTrigger])

  




  const handleTabChange = (_event: React.SyntheticEvent, tabValue: string) => {
    setTab(tabValue);
  };



  
  return(
    <>
      {sessionUser ? 
      


      <div className="home-container">
        
        <h1>Welcome back, {sessionUser.username}</h1>
      
        <Box sx={{ width: '100%'}}>
          <ThemeProvider theme={theme} >
            <Tabs
              value={tab}
              onChange={handleTabChange}
              textColor='primary'
              indicatorColor='secondary'
        
            >
              <Tab value="yourProducts" label="Your Products" />
              <Tab value="updates" label="Updates" />
              <Tab value="followedProducts" label="Followed/Funding Products" />
            </Tabs>
          </ThemeProvider>
        </Box>
        
        {tab === 'yourProducts' && 
          <div className="your-products-container">
            {userProducts?.map((product:any) => 
              <div className="your-specific-product" onClick={() => navigate(`/products/${product.id}`)}>
              <h2>{product.title}</h2>
              <img src={product.image}/>
              </div>
            )}
          </div>
        }

        {tab === 'updates' &&
          <div className="followed-products-page">
            {userInvestments.length ?
              <>
                {investedProductUpdates.length ?
                
                  <>
                    {investedProductUpdates?.map((update:any) => {

                      let specificProduct = products.find((product:any) => product.id === update.product_id)
                      return(
                        <>
                          <h2>{specificProduct.title}</h2>
                          <h3>{update.title}</h3>
                          <p>{update.description}</p>
                          
                        </>
                      )
                    }

                    )}

                  </>
                  :
                  <>
                    <h2>Followed/Funded Products have not been updated.</h2>
                  </>
                }
              </>
              :
              <>
                <h3>You have not funded nor followed any products.</h3>
              </>
            }
          </div>
        
        }
      </div>
      :
      <div className="splash-container">

        <h1>
          Some Coin, Please.
        </h1>
        <h2>
          HOME OF INNOVATION
        </h2>
        <p>
          Creating a product is expensive and requires funding, we get that. Thats why on SCP, crowdfunding is king. Explore and find products you find interesting, and follow em'. If you find them interesting enough, you can purchase some coin and send it to the creators of the product to help let them capitalize off their dream. It doesn't stop there, though. Have something you have always wanted to create? Make a post, show your work, and see if other people share a similar passion as you and want to help fund your creativity. 
        </p>

      </div>
    
    
      
      }
      
    </>
  )
}

export default Home