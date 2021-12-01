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
import {primary, secondary} from '../styling-variables'



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



  const [tierPrice, setTierPrice] = useState<number>(0)
  const [tierDescription, setTierDescription] = useState<string>('')
  const [tierCounter, setTierCounter] = useState<number>(1)


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
    let rewardsClone = rewards
    let counter = tierCounter
    let newTier = {}
    newTier['tier'] = counter
    newTier['price'] = tierPrice
    newTier['description'] = tierDescription
    rewardsClone.push(newTier)
    setTierCounter(++counter)
    setTierPrice(0)
    setTierDescription('')
    setRewards(rewardsClone)
  }

  const clearFunc = () => {
    setTitle('')
    setDescription('')
    setRewards([])
    setTags(new Set())
    setSummary('')
    setImage(null)
  }

  const productCreationHandler = async (e:any) => {
    e.preventDefault()
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
      
      console.log('REWARDS:', rewards)

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
    
    <>
    {sessionUser ? 
    
    <Box style={{marginTop:'150px', marginLeft:'50px'}} component="form" autoComplete="off" >

      <div>

        <ul>
          {validators.map(validator => 
            <li>{validator}</li>
          )}
        </ul>

        <TextField required value={title} onChange={e => setTitle(e.target.value)} label="Product Name"/>
        <TextField required multiline minRows={10} maxRows={10}  value={description} onChange={e => setDescription(e.target.value) } label="Description"/>
        <TextField required multiline  minRows={5} maxRows={5} value={summary} onChange={e => setSummary(e.target.value)} label="Summary"/>

        <label>
          Logo/Cover Image  
          <Input type="file" onChange={updateImage}/>
        </label>


        <h2>Tags:</h2>
        <div className="tag-checkboxes">
          {tagNames.map(tag => 
            <FormControlLabel
              label={`${tag}`} 
              control={<Checkbox style={{"color":secondary}} onChange={e => tagHandler(e)} />}
              value={tag}
            />
          )}
        </div>

        <div>
          <h3>Tier Creator (optional)</h3>
          {rewards && rewards.map(tier => 
            <div>
              <h3>{`Tier ${tier.tier}` }</h3>
              <h4>{`Price: ${tier.price}`}</h4>
              <p>{`Description: ${tier.description}`}</p>
            </div>
            )}

            <div>
            <InputLabel htmlFor="input-with-icon-adornment">
              Price
            </InputLabel>
            <Input
            value={tierPrice}
            onChange={e => setTierPrice(+e.target.value)}
            type="number"
            startAdornment={
              <InputAdornment position="start">
            
              <AttachMoneyIcon />
            </InputAdornment>
            }
            />
            <TextField required multiline  value={tierDescription} onChange={e => setTierDescription(e.target.value) } label="Tier Description"/> 
            <Button variant="contained" style={{'backgroundColor': secondary}} onClick={tierHandler}>Create Tier</Button>
            </div>


        </div>

        <Button variant="contained" style={{'backgroundColor':primary, 'color': 'black'}} onClick={e => productCreationHandler(e)} >CREATE</Button>

      </div>

    </Box>
    
    :
    
      <div>
          <h2>You must be logged in to create a post.</h2>
      </div>
    
    }

    </>

  )

}

export default ProductForm