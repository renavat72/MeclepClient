import React, {useState} from 'react';
import Countdown from 'react-countdown'
import {IconButton, Button, Link, Collapse} from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import styled from 'styled-components';
import ShareIcon from '@material-ui/icons/Share';

import {panTo} from '../Map'
import LikeButton from '../Buttons/LikeButton'
import Slider from '../Slider';


const WrapperCard = styled(Flex)`
box-sizing: border-box;
background: #fff;
box-shadow: 0 0 6px rgba(0,0,0,0.2);
`

export default function ParserEvent (props){
    const {post,handleEventsWindow } = props;
    const [open, setOpen] = useState(false);
    const handleModal = () => {
      setOpen(!open);
    };
    function LocateToAddress({ panTo }) {
      function handleLocate(){
        navigator.geolocation.getCurrentPosition(
          () => {
            panTo({
              lat: post.lat,
              lng: post.lng,
            });
          },
        ),handleEventsWindow()}

      return (
        <Text fontSize={[12,14]}
          onClick={()=>handleLocate()}
        >
         {post.address}
         </Text>
      );
    }
    return(
          <WrapperCard>
                <Flex m={3} flexDirection="column"   maxWidth="500px">
                    {/* <Locate panTo={panTo}/> */}
                  <Flex flexDirection="column">
                    <Text fontWeight='bold' fontSize={[16,20]}>
                      {post.title}
                    </Text>
                    <Text fontSize={[14,18]}>
                      {post.headerDescription}
                    </Text>
                    <LocateToAddress panTo={props.panTo}/>
                    <Text my={1}>{post.time}</Text>
                    
                  </Flex>
                  <Flex my={3} flexDirection="row" >
                    {post.images != 0 ? <Slider images={post.images}/>: null}
                  </Flex>
                  <Flex mr="auto" width="320px">
                    {open ? <Button onClick={handleModal}>Hide</Button>:<Button onClick={handleModal}>Show more</Button>  }
                    </Flex>
                        <Collapse in={open} timeout="auto" unmountOnExit  >
                            <Flex my={1} flexDirection="column">
                                <Text color="textSecondary" textAlign="left" fontSize={[14,16]}>
                                {post.description}
                                </Text>
                            </Flex>
                        </Collapse>
                   <Flex my={1}flexDirection="row">
                      <LikeButton user={props.user} postId={post.id} post={post} />
                      <Flex my="auto">
                        <Text  textAlign="right" fontSize={14}>{post.period}</Text>
                      </Flex>
                   </Flex>
                   <Flex >
                  </Flex>
                    <Box ml="auto" mb="auto">
                    <Text fontSize={16}><Link href={post.urlContent}> {post.website}</Link></Text>
                    </Box>
             </Flex>
       </WrapperCard>
    )
}
