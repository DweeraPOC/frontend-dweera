import React from 'react';
import {Slider} from "@mui/material";



const SliderProton = ({ value, changePrice }) => {
 

  return (
    <div>
      <Slider
        value={value}
        onChange={changePrice}
        valueLabelDisplay='auto'
        min={0}
        max={500}
        getAriaLabel={() => 'Price range'}
        color="secondary"
          
      />
    </div>
  );
};

export default SliderProton;
