import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';

import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import ThemeProvider from '@mui/system/ThemeProvider';
import {theme} from '../styling-variables'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


interface SearchProps{

  products: any
}
function Search({products}: SearchProps){
  
  const [userInput, setUserInput] = useState<string>('')
  const [productResults, setProductResults] = useState<Array<any>>([])
  const [tags, setTags] = useState<Set<any>>(new Set())
  const [counter, setCounter] = useState<number>(0)
  const navigate = useNavigate()
  
  const tagNames = ['Technology', 'Fashion', 'Outdoors', 'Food', 'Free', 'Video Games', 'Board Game', 'Art', 'Tool', 'Entertainment', 'Event', 'Software', 'Hardware']




  useEffect(() => {
    let filteredProducts = products
    if(userInput){
      filteredProducts = filteredProducts.filter((product:any) => product.title.startsWith(userInput))
    }
    
    
    if(tags.size){
      let tagsArr = Array.from(tags)
      filteredProducts = filteredProducts.filter((product:any) => {
        let hasTag = false
        let productTags = product.tags
        productTags.forEach((tag:string, i:number) => {
          if(tagsArr.includes(tag)){
            hasTag = true
            return;
          }
          else if(productTags.length - 1 === i) return;
        })

        return hasTag
      })
    }
    setProductResults(filteredProducts)
  }, [userInput, tags, counter])


  
  const tagHandler = (e:any) => {
    
    setCounter(counter + 1)
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
    <ThemeProvider theme={theme}>
      <div className="search-container" style={{marginTop:'10px'}}>

        <FormControl>
          <Input 
          id="search-input"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          }
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          color="secondary"
          style={{width:"30vw"}}
          />
        </FormControl>
          <div className="search-filters">
              {tagNames.map(tag => 
                <FormControlLabel
                  label={`${tag}`} 
                  control={<Checkbox color="secondary" onChange={e => tagHandler(e)} />}
                  value={tag}
                />
              )}
          </div>

        {(productResults && (userInput.length || tags.size)) ?

            <div className="product-results-container">
              {productResults.map(product => 
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
                </CardActions>
              </Card>
              )}
            </div>
            :
            <></>
        }
      </div>
  </ThemeProvider>   
  )
}

export default Search