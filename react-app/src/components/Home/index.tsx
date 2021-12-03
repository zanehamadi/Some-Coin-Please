import { useState } from 'react';
import { useNavigate } from 'react-router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ThemeProvider from '@mui/system/ThemeProvider';
import {theme} from '../styling-variables'

interface HomeProps{
  sessionUser?:any
  products?:any
}

function Home({sessionUser, products}:HomeProps){
  
  const [tab, setTab] = useState<string>('updates');
  const navigate = useNavigate()

  let userId = sessionUser ? sessionUser.id : ''
  let userProducts;

  if(userId){
    userProducts = products.filter((product:any) => product.user_id === userId)
  }


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