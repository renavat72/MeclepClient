import React from 'react';
import { Box, Flex, Image } from 'rebass';
import {GridList, GridListTile} from '@material-ui/core';
import styled from 'styled-components';



const SliderRoot = styled(Flex)`    
    flex-wrap: wrap;
    justify-content:space-around;
    overflow: hidden;

`

export default function Slider(props){
    const {images}=props;
   
    if (!images){
        return null
    }
    return(
        <SliderRoot>
        <GridList cols={2.5} style={{flexWrap: 'nowrap', transform: 'translateZ(0)', width: 500, height:120,   overflowY: "hidden"}}>
            {images.map((image, index)=> {
                return(
                    <GridListTile key={image}>
                        <Box width="150px" mx={2}>
                      <img style={{width:150, height:100}} src={image}/>
                        </Box>
                    </GridListTile>
                )
            })}
        </GridList>
        </SliderRoot>
    )
}