import React, { useState } from 'react';
import { CardActions,IconButton,Link, Collapse, Button  } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

import {Text, Box, Flex} from 'rebass'
import LikeButton from '../../Buttons/LikeButton'


export default function AnotherEventWindow (props){
    // const {post} = props
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };
   
    return(
        <Box width="250px">
          <Flex flexDirection="column">
            <Flex flexDirection='column' mr="auto" mb={3}>
             <Text fontWeight='bold' fontSize={18} textAlign="left" width="250px" mb={2}>
              Я, Энди Уорхол
              </Text>
              <Text fontSize={14} textAlign="left" width="200px" mb={1}>
              Москва, Крымский Вал, 10
              </Text>
              <Flex my={1}  flexDirection="row" justifyContent="space-between" >
                  <Box>
                 <Text textAlign="left"  fontSize={14}>Выстовка</Text>
                </Box>
                <Flex flexDirection="column">
                 <Text textAlign="right"  fontSize={14}>пн-вс 9.00–22.00</Text>
                 <Text textAlign="right" fontSize={10}>до 10 января 2021</Text>
                </Flex>
              </Flex>
          </Flex>
          <Flex my={1} maxWidth="250px">
            <Text color="textSecondary" textAlign="left">
            Масштабная выставка работ легендарного художника
            </Text>
          </Flex>
          <Flex mr="auto">
          {open ? <Button onClick={handleClick}>Hide</Button>:<Button onClick={handleClick}>Show more</Button>  }
          </Flex>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Flex my={1} maxWidth="250px" flexDirection="column">
                    <Text color="textSecondary" textAlign="left">
                    В состав экспозиции вошли около 200 работ пионера поп-арта, включая ставшие хрестоматийными полные портфолио «Мэрилин», «Цветы», «Мао», «Банки с супом Кэмпбелл», «Камуфляж», «Дамы и господа», «Вымирающие виды», «Десять портретов евреев ХХ века» и другие. Помимо них на выставке будут представлены такие известные работы, как «Двойной автопортрет», «Везувий», «Череп», «Электрический стул», портреты Ленина и другие.  Кроме произведений самого Уорхола, организаторы представят публике работы известных фотографов из его окружения: Фреда В. Макдарра, Джерарда Маланги и Кристофера Макоса. Увенчает экспозицию воссозданная «Серебряная фабрика» — нью-йоркская арт-студия Уорхола, активно действовавшая с 1962 и ставшая центром притяжения мировой богемы.
                    </Text>

                </Flex>
            </Collapse>
          <Flex>
          <CardActions >
            <Flex my="auto">40</Flex>
            {/* <LikeButton post={post}postId={post.id}/> */}
            <IconButton>
              <FavoriteIcon />
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
            {/* <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
            >
              <ExpandMoreIcon />
            </IconButton> */}

          </CardActions>
            <Flex my="auto" ml="auto">
             <Box ml="auto" >
               <Text fontSize={16}><Link href="https://www.afisha.ru/exhibition/241354/">Афиша</Link></Text>
             </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    )
}