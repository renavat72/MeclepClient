import React, {useState} from 'react';
import { Button, Link, Collapse} from '@material-ui/core';
import {Text, Box, Flex} from 'rebass'
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// import {panTo} from '../Map'
import LikeButton from '../Buttons/LikeButton'
import Slider from '../Slider';


const WrapperCard = styled(Flex)`
box-sizing: border-box;
background: #fff;
box-shadow: 0 0 6px rgba(0,0,0,0.2);
`

export default function ParserEvent (props){
    const {post,handleOpen } = props;
    const { t } = useTranslation();
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
        );handleOpen()}

      return (
        <Text fontSize={[12,14]}
          onClick={()=>handleLocate()}
        >
         {post.address}
         </Text>
      );
    }
    return(
          <WrapperCard maxWidth="500px">
                <Flex  m={3} flexDirection="column"  width={[null, 500]}>
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
                     <Slider images={post.images}/>
                  </Flex>
                  {post.description!== 0 ?  <Flex mr="auto" width="320px">
                    {open ? <Button onClick={handleModal}>{t('common.hide')}</Button>:<Button onClick={handleModal}>{t('common.showMore')}</Button>  }
                    </Flex>  : null }
                        <Collapse in={open} timeout="auto" unmountOnExit  >
                            <Flex my={1} flexDirection="column">
                                <Text color="textSecondary" textAlign="left" fontSize={[14,16]}>
                                {post.description}
                                </Text>
                            </Flex>
                        </Collapse>
                   <Flex my={1}flexDirection="row">
                      <LikeButton user={props.user} postId={post.id} post={post} />
                      <Flex my="auto" ml="auto">
                        <Text  textAlign="right" fontSize={14}>{post.period}</Text>
                      </Flex>
                   </Flex>
                    <Box ml="auto" mt="auto" >
                    <Text fontSize={16}><Link href={post.urlContent}> {post.website}</Link></Text>
                    </Box>
             </Flex>
       </WrapperCard>
    )
}
