import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router';

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



  

  return(
    <>
      {sessionUser ? 
      


      <div className="home-container">
        
        <h1>Welcome back, {sessionUser.username}</h1>
        
        <Button variant="outlined" onClick={() => setTab('yourProducts')}>
          Your Products
        </Button>
        <Button variant="outlined" onClick={() => setTab('updates')}>
          Updates
        </Button>
        <Button variant="outlined" onClick={() => setTab('invested')}>
          Followed/Invested Products
        </Button>
        
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