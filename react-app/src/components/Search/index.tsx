import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import {secondary} from '../styling-variables'
import { Checkbox, FormControlLabel } from '@mui/material';


interface SearchProps{

  products: any
}
function Search({products}: SearchProps){
  
  const [userInput, setUserInput] = useState<string>('')
  const [productResults, setProductResults] = useState<Array<any>>([])
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [tags, setTags] = useState<Set<any>>(new Set())

  
  const tagNames = ['Technology', 'Fashion', 'Outdoors', 'Food', 'Free', 'Video Games', 'Board Game', 'Art', 'Tool', 'Entertainment', 'Event', 'Software', 'Hardware']



  const inputFunc = (e:any) => {
    let input = e.target.value
    setUserInput(input)
    let filteredProducts = products
  
    if(input){
      filteredProducts = filteredProducts.filter((product:any) => product.title.startsWith(input))
      setProductResults(filteredProducts)
    }
    
  }

  const filterSwitch = () => {
    showFilter ? setShowFilter(false) : setShowFilter(true)
  }

  useEffect(() => {
    if(!userInput.length && !tags.size){
      setProductResults([])
    }
  }, [userInput, tags])


  
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
        onChange={e => inputFunc(e)}
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

      {productResults && 
          <div className="product-results-container">
            {productResults.map(product => 
              <div className="product-result">
                <span>{product.title}</span>
                <img style={{width:'50px'}} src={product.image} />
              </div>
            )}
          </div>
      }
    </div>
  )
}

export default Search