import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useState } from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Input from '@mui/material/Input';
import { createProduct, loadProducts } from 'store/products';
import { useDispatch} from "react-redux";
import { useNavigate } from 'react-router';
import ThemeProvider from '@mui/system/ThemeProvider';
import {theme} from '../styling-variables'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
// import './productform.css'

interface ProductFormProps{
  sessionUser?: any
}

function ProductForm({sessionUser}:ProductFormProps){

  const dispatch:any = useDispatch();
  const navigate = useNavigate()


  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [summary, setSummary] = useState<string>('')
  const [image, setImage] = useState<any>(null)
  const [tags, setTags] = useState<Set<string>>(new Set())
  const [rewards, setRewards] = useState<Array<any>>([])
  const [validators, setValidators] = useState<Array<string>>([])



  const [tierPrice, setTierPrice] = useState<any>('')
  const [tierDescription, setTierDescription] = useState<string>('')
  const [tierCounter, setTierCounter] = useState<number>(1)
  const [tierValidator, setTierValidator] = useState<Array<string>>([])

  const updateImage = (e:any) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };


  const tagHandler = (e:any) => {
    let tag = e.target.value
    let tagsClone = tags
    if(tagsClone.has(tag)){
      tagsClone.delete(tag)
      setTags(tagsClone)
    }else{
      tagsClone.add(tag)
      setTags(tagsClone)
    }
  }

  const tagNames = ['Technology', 'Fashion', 'Outdoors', 'Food', 'Free', 'Video Games', 'Board Game', 'Art', 'Tool', 'Entertainment', 'Event', 'Software', 'Hardware']

  const tierHandler = () => {
    let rewardsClone = rewards;
    let counter = tierCounter;
    let newTier = {};
    let validators = [];
    if(!tierPrice) validators.push('Please provide a proper price for this tier.');
    if(!tierDescription) validators.push('Please provide a description for this tier.')
    if(tierPrice > 1000000000) validators.push('Tier Price cannot be more than 1,000,000,000 dollars. Come on.')
    if(+tierPrice <= +rewardsClone[rewardsClone.length - 1]?.price) validators.push('Tier price can not be lower than previous tier.')

    if(!validators.length){
      newTier['tier'] = counter;
      newTier['price'] = tierPrice;
      newTier['description'] = tierDescription;
      rewardsClone.push(newTier);
      setTierCounter(++counter);
      setTierPrice('');
      setTierDescription('');
      setRewards(rewardsClone);
    }
    setTierValidator(validators)
  }

  const clearFunc = () => {
    setTitle('')
    setDescription('')
    setRewards([])
    setTags(new Set())
    setSummary('')
    setImage(null)
  }

  const productCreationHandler = async () => {

    const postValidators = []

    if(title.length > 256) postValidators.push('Title can not be longer than 256 characters.')
    if(title.length === 0) postValidators.push('Please provide a valid title.')
    if(description.length > 10000) postValidators.push('Description is too long.')
    if(description.length < 15) postValidators.push('Description can be no shorter than 15 characters.')
    if(summary.length > 256) postValidators.push('Summary can not be longer than 256 characters.')
    if(summary.length < 15) postValidators.push('Summary can be no shorter than 15 characters.')
    if(tags.size === 0) postValidators.push('Please provide atleast one tag.')
    if(!image) postValidators.push('Please provide an image for this product(Logo/Product Picture)')

    setValidators(postValidators)
    
    if(!postValidators.length){


      let tagsArr = Array.from(tags)
      let tagsString = tagsArr.join(',')
      

       const newProductId = await dispatch(createProduct({
        user_id:sessionUser.id, 
        title,
        description,
        funding:0,
        investors: 0,
        rewards,
        tags:tagsString,
        summary,
        image
      }))

      await dispatch(loadProducts())
      clearFunc()
      navigate(`/products/${newProductId}`)
    }

  }


  return(
    
    <ThemeProvider theme={theme}>
    {sessionUser ? 
    
    <Box component="form" autoComplete="off" sx={{ p: 2, border: '1px solid grey', display:'flex', flexDirection:'column' }} >

      <div>

        <ul>
          {validators.map(validator => 
            <li>{validator}</li>
          )}
        </ul>

        <TextField required style={{width:"100%", marginTop:"10px"}} color="secondary" value={title} onChange={e => setTitle(e.target.value)} label="Product Name"/>
        <br />
        <TextField required style={{width:"100%", marginTop:"10px"}} color="secondary" multiline  minRows={5} maxRows={5} value={summary} onChange={e => setSummary(e.target.value)} label="Summary"/>
        <br />

        <TextField required style={{width:"100%", marginTop:"10px"}} color="secondary" multiline minRows={10} maxRows={10}  value={description} onChange={e => setDescription(e.target.value) } label="Description"/>
        <br />


        <label>
          Logo/Cover Image  
          <Input style={{marginTop:"10px"}} type="file" color="secondary" onChange={updateImage}/>
        </label>


        <h2>Tags:</h2>
        <div className="tag-checkboxes">
          {tagNames.map(tag => 
            <FormControlLabel
              label={`${tag}`} 
              control={<Checkbox onChange={e => tagHandler(e)} color="secondary" />}
              value={tag}
              
            />
          )}
        </div>

        <div>
          <h3>Tier Creator (optional)</h3>
          {tierValidator.length ?
            <ul>
              {tierValidator.map((validator:string) => 
                  <li>{validator}</li>
              )}
            </ul>
            :
            <> </>
          }
          {rewards && rewards.map(tier => 
            <Card variant="outlined" sx={{overflowX:'visible'}}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {`Tier ${tier.tier}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Price: $${tier.price}`}
                </Typography>
                <Typography>
                  {tier?.description}
                </Typography>
              </CardContent>
              </Card>
            )}

            <div className="tier-creator">
            <InputLabel htmlFor="input-with-icon-adornment">
              Price
            </InputLabel>
            <Input
            value={tierPrice}
            onChange={e => setTierPrice(+e.target.value)}
            type="number"
            color="secondary"
            startAdornment={
              <InputAdornment position="start">
            
              <AttachMoneyIcon />
            </InputAdornment>
            }
            />
            <TextField required multiline  id="tier-description" value={tierDescription} onChange={e => setTierDescription(e.target.value) } color="secondary" label="Tier Description" style={{marginTop: '10px'}} /> 
            <Button variant="outlined" color="primary" onClick={tierHandler}>Create Tier</Button>
            </div>


        </div>

        <Button variant="outlined" color="primary" onClick={productCreationHandler} >CREATE</Button>

      </div>

    </Box>
    
    :
    
      <div>
          <h2>You must be logged in to create a post.</h2>
      </div>
    
    }

    </ThemeProvider>

  )

}

export default ProductForm