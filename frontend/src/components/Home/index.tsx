
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {theme} from '../styling-variables'
import {useUpdateTrigger} from '../../context/updateTrigger'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ThemeProvider from '@mui/system/ThemeProvider';
import {loadInvestments, unfollowProduct} from '../../store/investments'
import { useDispatch } from 'react-redux';
import { loadUsers } from 'store/users';
import { loadProducts } from 'store/products';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Search from '../Search';


interface HomeProps{
  sessionUser?:any;
  products?:any;
  investments?:any;
}

function Home({sessionUser, products, investments}:HomeProps){
  
  const [tab, setTab] = useState<string>('updates');
  const navigate = useNavigate()
  const {updateTrigger, setUpdateTrigger}:any = useUpdateTrigger()
  const dispatch = useDispatch()

  
  let userId = sessionUser ? sessionUser.id : ''
 
  const userProducts = products.filter((product:any) => product.user_id === userId)
  const [userInvestments, setUserInvestments] = useState<any>('')
  const [investedProductUpdates, setInvestedProductUpdates] = useState<Array<any>>([])
  const [progress, setProgress] = useState<number>(0)
  const [openSnack, setOpenSnack] = useState<boolean>(false)


  useEffect(() => {

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

  


  const handleClose = () => {
    setOpenSnack(false)
    setProgress(0)
  }


  const handleTabChange = (_event: React.SyntheticEvent, tabValue: string) => {
    setTab(tabValue);
  };

  const unfollowProductHandler = async (productId:number) => {
    
    let specInvestment = investments.find((investment:any) => (+investment.user_id === +sessionUser.id) && (+investment.product_id === productId))

    await dispatch(unfollowProduct(specInvestment.id))
    setProgress(25)
    await dispatch(loadUsers())
    setProgress(50)
    await dispatch(loadInvestments())
    setProgress(75)
    await dispatch(loadProducts())
    setProgress(100)
    setUpdateTrigger(!updateTrigger)
    setOpenSnack(true)
  }


  
  return(
    <ThemeProvider theme={theme} >

      {sessionUser ? 
      


      <div className="home-container">
        
        <h1>Welcome back, {sessionUser.username}</h1>
      
        <Box sx={{ width: '100%'}}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              textColor='primary'
              indicatorColor='secondary'
        
            >
              <Tab value="yourProducts" label="Your Products" />
              <Tab value="updates" label="Updates" />
              <Tab value="followedProducts" label="Followed/Funding Products" />
              <Tab value="search" label="Find a product" />
            </Tabs>
        </Box>
        
        {tab === 'yourProducts' && 
          <div className="your-products-container">
            {userProducts.length ? 
            <>
              {userProducts?.map((product:any) => 
                <Card sx={{ maxWidth: 500}} variant="outlined" >
                  <CardMedia
                  component="img"
                  height="300"
                  image={product.image}
                  alt={`${product?.title} logo`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                        {product?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product?.sumarry}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="large" variant="outlined" color="primary" onClick={() => navigate(`/products/${product.id}`)}>Visit Page</Button>
                  </CardActions>
                </Card>
              )}
            </>
            :
            <>
              <h2>You have not posted any products.</h2>
            </>
            }
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
                        <Card variant="outlined" sx={{ maxWidth: 800 }}>
                          <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="secondary" style={{fontWeight:"600"}} gutterBottom>
                              {specificProduct.title}
                            </Typography>
                            <Typography variant="h5" component="div">
                              {update.title}
                            </Typography>
                            <Typography variant="body2">
                              {update.description}
                            </Typography>
                          </CardContent>
                          
                        </Card>
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

        {tab === 'followedProducts' && 
          <div className="followed-products-tab">
            {userInvestments.length ?
            
            <>
              {userInvestments.map((product:any) => 
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={`${product?.title} logo`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product?.sumarry}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="outlined" color="primary" onClick={() => navigate(`/products/${product.id}`)}>Visit Page</Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => unfollowProductHandler(+product.id)}>Unfollow</Button>
                  </CardActions>
                  <LinearProgress color="secondary" variant="determinate" value={progress} />
                </Card>
              )}
            </>



            :

            <>
              <h3>You are currently not invested in any products.</h3>
            </>
          
          
            }

          </div>
        }

        
        {tab === 'search' &&
          
          <Search products={products} />

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

    <Snackbar
    open={openSnack}
    autoHideDuration={3000}
    onClose={handleClose}
    message="Successfully unfollowed product."
    
    />
      
    </ThemeProvider>
  )
}

export default Home