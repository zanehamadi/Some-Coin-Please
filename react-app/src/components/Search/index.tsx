import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import {secondary} from '../styling-variables'
import { Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router';


interface SearchProps{

  products: any
}
function Search({products}: SearchProps){
  
  const [userInput, setUserInput] = useState<string>('')
  const [productResults, setProductResults] = useState<Array<any>>([])
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [tags, setTags] = useState<Set<any>>(new Set())
  const [counter, setCounter] = useState<number>(0)
  const navigate = useNavigate()
  
  const tagNames = ['Technology', 'Fashion', 'Outdoors', 'Food', 'Free', 'Video Games', 'Board Game', 'Art', 'Tool', 'Entertainment', 'Event', 'Software', 'Hardware']




  const filterSwitch = () => {
    if(showFilter){
      setShowFilter(false)
      setCounter(counter + 1)
      setTags(new Set())
    }else setShowFilter(true)
  }

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
    <div className="search-container">

      <FormControl>
        <Input 
        id="search-input"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        />
      </FormControl>
        <IconButton onClick={filterSwitch}>
          <FilterAltIcon/>
        </IconButton>
      {showFilter && 
        <div className="search-filters">
            {tagNames.map(tag => 
              <FormControlLabel
                label={`${tag}`} 
                control={<Checkbox style={{"color":secondary}} onChange={e => tagHandler(e)} />}
                value={tag}
              />
          )}
        </div>
      }

      {(productResults && (userInput.length || tags.size)) ?

          <div className="product-results-container">
            {productResults.map(product => 
              <div className="product-result" onClick={() => navigate(`/products/${product.id}`)}>
                <img style={{width:'50px'}} src={product.image} />
                <span>{product.title}</span>
              </div>
            )}
          </div>
          :
          <></>
      }
    </div>
  )
}

export default Search