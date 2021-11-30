import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import {blueGrey, yellow} from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useState } from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Input from '@mui/material/Input';
import { createProduct } from 'store/products';
import { useDispatch} from "react-redux";



interface ProductFormProps{
  sessionUser?: any
}

function ProductForm({sessionUser}:ProductFormProps){

  const dispatch:any = useDispatch();
  const primary = yellow[700]
  const secondary = blueGrey[700]
  console.log(primary)
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
      console.log('Tags', tags)
    }else{
      tagsClone.add(tag)
      setTags(tagsClone)
      console.log('Tags', tags)
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
  }

  const productCreationHandler = (e:any) => {
    e.preventDefault()
    const postValidators = []

    if(title.length > 256) postValidators.push('Title can not be longer than 256 characters.')
    if(title.length === 0) postValidators.push('Please provide a valid title.')
    if(description.length > 10000) postValidators.push('Description is too long.')
    if(description.length < 15) postValidators.push('Description can be no shorter than 15 characters.')
    if(summary.length > 256) postValidators.push('Summary can not be longer than 256 characters.')
    if(summary.length < 15) postValidators.push('Summary can be no shorter than 15 characters.')
    if(tags.size < 0) postValidators.push('Please provide atleast one tag.')
    if(!image) postValidators.push('Please provide an image for this product(Logo/Product Picture)')

    setValidators(postValidators)
    
    if(!postValidators.length){
      let rewardsObject = {}
      if(rewards.length){
        rewards.forEach(reward => {
          rewardsObject[`tier ${reward.tier}`] = {
            "price":reward.price,
            "summary":reward.description
          }
        })
      }
      let tagsArr = Array.from(tags)
      let tagsString = tagsArr.join(',')
      console.log('tags string:', tagsString)
      

      return dispatch(createProduct({
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
      .then(() => {
        
        setTitle('')
        setDescription('')
        setRewards([])
        setTags(new Set())
        setSummary('')
        setImage(null)
      })
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

        <TextField required id="outlined-required" value={title} onChange={e => setTitle(e.target.value)} label="Product Name"/>
        <TextField required multiline id="outlined-required" value={description} onChange={e => setDescription(e.target.value) } label="Description"/>
        <TextField required multiline id="outlined-required" value={summary} onChange={e => setSummary(e.target.value)} label="Summary"/>

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
            <TextField required multiline id="outlined-required" value={tierDescription} onChange={e => setTierDescription(e.target.value) } label="Tier Description"/> 
            <Button variant="contained" style={{'backgroundColor': secondary}} onClick={tierHandler}>Create Tier</Button>
            </div>


        </div>

        <Button variant="contained" style={{'backgroundColor':primary}} onClick={e => productCreationHandler(e)} >CREATE</Button>

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