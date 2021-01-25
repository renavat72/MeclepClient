import React from 'react';
import { Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }));


export default  function AvatarUser(props){
    const classes = useStyles();
    console.log(props)

    if(!props) return null
    const altFirstName = props.followers? props.props.followerFirstName: props.following ? props.props.userFirstName: props.props.firstName
    const altSecondName =props.followers? props.props.followerSecondName: props.following ? props.props.userSecondName: props.props.secondName
    const altAvatar = props.followers? props.props.followerCoverImage: props.following ? props.props.userCoverImage: props.props.coverImage ;
 
    const InitialsWords = altFirstName[0] + altSecondName[0] ;
    if(!InitialsWords) return null 

    return (
        <div>
        {altAvatar? 
                        <Avatar src={altAvatar} className={classes.size}/> :<Avatar className={classes.sizeAvatar}>{InitialsWords}</Avatar>}
        </div>
    )
}