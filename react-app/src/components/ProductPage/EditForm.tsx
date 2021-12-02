import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Input from "@mui/material/Input"
import TextField from "@mui/material/TextField"
import { secondary } from "components/styling-variables"
import { useState } from "react"



interface EditFormProps{
  product:any;
}

function EditForm({product}:EditFormProps){
  console.log(product)
  const [title, setTitle] = useState<string>(product?.title)
  const [summary, setSummary] = useState<string>(product?.summary)
  const [description, setDescription] = useState<string>(product?.description)
  const [image, setImage] = useState<any>(product?.image)
  const [tags, setTags] = useState<Set<string>>(new Set(product?.tags))
  const [rewards, setRewards] = useState<Array<any>>(JSON.parse(product?.rewards))
  // const [validators, setValidators] = useState<Array<string>>([])
  
  console.log(setRewards)
  console.log(image)
  const updateImage = (e:any) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const tagNames = ['Technology', 'Fashion', 'Outdoors', 'Food', 'Free', 'Video Games', 'Board Game', 'Art', 'Tool', 'Entertainment', 'Event', 'Software', 'Hardware']
  console.log('TAGS:', tags)

  const rewardUpdateFunc(reward:any, description:string = '', price:number = NaN) => {
      
  }


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

  return(
    <div className="edit-product-form">
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
              control={<Checkbox style={{"color":secondary}}  defaultChecked={tags.has(tag)} onChange={e => tagHandler(e)} />}
              value={tag}
            />
          )}
        </div>

        <h2>Rewards</h2>
        {rewards.map(reward => 
          <div>
            <h3>Tier {reward.tier}</h3>
            <TextField label="Description" variant="outlined" value={reward.description} onChange={e => setTitle(e.target.value)}/>

          </div>
        )}
    </div>
  )
}

export default EditForm