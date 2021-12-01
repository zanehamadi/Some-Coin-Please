import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';


interface SearchProps{

  products: any
  users: any

}
function Search({users, products}: SearchProps){
  console.log(users)
  console.log(products)  
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
        />
      </FormControl>
    </div>
  )
}

export default Search