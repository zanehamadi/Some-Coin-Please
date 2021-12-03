import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Input from "@mui/material/Input"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {useNavigate, useParams} from 'react-router-dom'
import { updateProduct, loadProducts } from "store/products"
import Button from "@mui/material/Button"
import { useDispatch } from "react-redux"

interface EditFormProps{
 products?:any;
 
}




function EditForm({products}: EditFormProps){
  let {productId}:any = useParams()
  let product = products?.find((specProduct:any) => +specProduct.id === parseInt(productId))
  const [title, setTitle] = useState<string>(product?.title)
  const [summary, setSummary] = useState<string>(product?.summary)
  const [description, setDescription] = useState<string>(product?.description)
  const [image, setImage] = useState<any>(product?.image)
  const [tags, setTags] = useState<Set<string>>(new Set(product?.tags))
  const [rewards, setRewards] = useState<any>(JSON.parse(product?.rewards))
  const [validators, setValidators] = useState<Array<string>>([])
  const [isImage, setIsImage] = useState<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const tagNames = ['Technology', 'Fashion', 'Outdoors', 'Food', 'Free', 'Video Games', 'Board Game', 'Art', 'Tool', 'Entertainment', 'Event', 'Software', 'Hardware']
  
  
  
  interface RewardUpdateParams{
    reward: any;
    description?: string;
    price?: number
  }
  const rewardUpdateFunc = ({reward, description, price}:RewardUpdateParams) => {
    let rewardClone = rewards.slice()
    let rewardIndex = rewards.indexOf(reward)
    if(price) rewardClone[rewardIndex]['price'] = price
    if(description) rewardClone[rewardIndex]['description'] = description
    setRewards(rewardClone)
  }
  
  const updateImage = (e:any) => {
    setIsImage(true)
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

  const clearFunc = () => {
    setTitle('')
    setDescription('')
    setRewards([])
    setTags(new Set())
    setSummary('')
    setImage(null)
  }

  
  const productUpdateHandler = async () => {
    
    const postValidators = []

    if(title.length > 256) postValidators.push('Title can not be longer than 256 characters.')
    if(title.length === 0) postValidators.push('Please provide a valid title.')
    if(description.length > 10000) postValidators.push('Description is too long.')
    if(description.length < 15) postValidators.push('Description can be no shorter than 15 characters.')
    if(summary.length > 256) postValidators.push('Summary can not be longer than 256 characters.')
    if(summary.length < 15) postValidators.push('Summary can be no shorter than 15 characters.')
    if(tags.size === 0) postValidators.push('Please provide atleast one tag.')
    
    setValidators(postValidators)
    
    if(!postValidators.length){

      
      let tagsArr = Array.from(tags)
      let tagsString = tagsArr.join(',')
      
      console.log('REWARDS', rewards)

      const newProductId = dispatch(updateProduct({
        id: product.id, 
        title,
        description,
        funding: product.funding,
        investors: product.investors,
        rewards,
        tags:tagsString,
        summary,
        image: isImage ? image : ''
      }))

      dispatch(loadProducts())
      clearFunc()
      navigate(`/products/${newProductId}`)
    }

  }

  return(
    <div className="edit-product-form">
      {validators && 
        <ul>
          {validators.map(validator => {
            <li>{validator}</li>
          })}
        </ul>
      }
      <h1>Edit Form</h1>
      <TextField label="Title" variant="outlined" value={title} onChange={e => setTitle(e.target.value)}/>
      <TextField required multiline  minRows={5} maxRows={5} value={summary} onChange={e => setSummary(e.target.value)} label="Summary"/>
      <TextField required multiline minRows={10} maxRows={10}  value={description} onChange={e => setDescription(e.target.value) } label="Description"/>
      <label>
        Logo/Cover Image  
        <Input type="file" onChange={updateImage}/>
      </label>

      <h2>Tags:</h2>
        <div className="tag-checkboxes">
          {tagNames.map(tag => 
            <FormControlLabel
              label={`${tag}`} 
              control={<Checkbox  defaultChecked={tags.has(tag)} onChange={e => tagHandler(e)} />}
              value={tag}
            />
          )}
        </div>

        <h2>Rewards</h2>
        {rewards.map((reward:any) => 
          <div>
            <h3>Tier {reward.tier}</h3>
            <TextField label="Description" variant="outlined" value={reward.description} onChange={e => rewardUpdateFunc({reward, description:e.target.value})}/>
            <InputLabel htmlFor="input-with-icon-adornment">
              Price
            </InputLabel>
            <Input
            value={reward.price}
            onChange={e => rewardUpdateFunc({reward, price:+e.target.value})}
            type="number"
            startAdornment={
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            }
            />
          </div>
        )}

        <Button onClick={productUpdateHandler}>Update Product</Button>
    </div>
  )
}

export default EditForm