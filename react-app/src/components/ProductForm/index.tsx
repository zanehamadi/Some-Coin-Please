import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import {blueGrey, yellow} from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';

function ProductForm(){
  const primary = yellow[700]
  const secondary = blueGrey[700]
  const [image, setImage] = useState(null)
  const [video, setVideo] = useState(null)

  const updateImage = (e:any) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const updateVideo = (e:any) => {
    const file = e.target.files[0];
    if (file) setVideo(file);
  };


  return(

    <Box style={{marginTop:'150px', marginLeft:'50px'}} component="form" autoComplete="off" >

      <div>

        <TextField required id="outlined-required" label="Product Name"/>

        <TextField required multiline id="outlined-required" label="Description"/>

        <TextField required multiline id="outlined-required" label="Summary"/>

        <TextField required id="outlined-required" label="Product Name"/>

        <label>
          Logo/Cover Image
          <input type="file" onChange={updateImage}/>
        </label>

        <label>
          Trailer/Video
          <input type="file" onChange={updateVideo} />
        </label>

        <h2>Tags:</h2>
        
        <div className="tag-checkboxes">
      
          <FormControlLabel
            label="Technology" 
            control={<Checkbox style={{"color":primary}}/>}
          />

          <FormControlLabel
          label="Fashion"
          control={<Checkbox style={{"color":secondary}}/>}
          />

          <FormControlLabel
          label="Outdoors"
          control={<Checkbox style={{"color": secondary}}/>}
          />

          <FormControlLabel
          label="Food"
          control={<Checkbox style={{"color": primary}}/>}
          />

          
          <FormControlLabel
          label="Free"
          control={<Checkbox style={{"color": primary}}/>}
          />

          
          <FormControlLabel
          label="Video Game"
          control={<Checkbox style={{"color": secondary }}/>}
          />

          
          <FormControlLabel
          label="Board Game"
          control={<Checkbox style={{"color": secondary}}/>}
          />

          
          <FormControlLabel
          label="Art"
          control={<Checkbox style={{"color": secondary}}/>}
          />

          
          <FormControlLabel
          label="Tool"
          control={<Checkbox style={{"color": secondary}}/>}
          />

          
          <FormControlLabel
          label="Entertainment"
          control={<Checkbox style={{"color": secondary}}/>}
          />

          
          <FormControlLabel
          label="Event"
          control={<Checkbox style={{"color": primary}}/>}
          />

          <FormControlLabel
          label="Software"
          control={<Checkbox style={{"color": secondary}}/>}
          />

          <FormControlLabel
          label="Hardware"
          control={<Checkbox style={{"color": primary}}/>}
          />

        </div>

      </div>

    </Box>

  )

}

export default ProductForm