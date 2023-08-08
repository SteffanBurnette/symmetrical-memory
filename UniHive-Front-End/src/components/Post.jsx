import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Toolbar from '@mui/material/Toolbar';
import AvatarLogo from './AvatarLogo';
import { Avatar } from '@mui/material';
import CommentBox from './CommentPost';
import CommentPost from './CommentPost';
import ChatIcon from '../assets/ChatIcon.png';
import Box from '@mui/material/Box';
import EmojiNatureTwoToneIcon from '@mui/icons-material/EmojiNatureTwoTone';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  // transition: theme.transitions.create('transform', {
  //   duration: theme.transitions.duration.shortest,
  // }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [count, setCount] = React.useState(0)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Toolbar
  disableGutters
  sx={{
    display: 'flex',           // Use flexbox layout
    justifyContent: 'center',  // Center-align horizontally
    alignContent:'center',
    marginTop:'0px',
    marginLeft:'100px'
  }}
>
  
    <Card sx={{ maxWidth: '500px', margin:10}}>
      <CardHeader
        avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        <AvatarLogo/>
        }
        

        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title="Testing"
        subheader="August 32, 2023"
      />
      <CardMedia
        component="img"
        height="194"
        image="/src/assets/Logo.svg"
        alt="Logo"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            Testing the caption was successful if you see this
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing> */}
        <IconButton aria-label="Like">
        <EmojiNatureTwoToneIcon onClick={() => setCount((count) => count + 1)}/>
        {count}
        </IconButton>
       {/* <ExpandMore>
       <img
            src={ChatIcon}
            alt="ChatIcon"
            style={{ display: { xs: 'none', md: 'flex' },width: '95px', height: 'auto',}} 
            
          />  
        </ExpandMore>  */}
          
        {/**change this to comment section */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        <img
            src={ChatIcon}
            alt="ChatIcon"
            style={{ display: { xs: 'none', md: 'flex' },width: '95px', height: 'auto',}} 
            
          />            
          </ExpandMore>
        
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph><CommentPost/></Typography>
          {/* <AvatarLogo/>
          <Typography paragraph >
            Test
          </Typography> */}
        </CardContent>
      </Collapse>
      {/* </CardActions> */}
    </Card>
    <Card sx={{ maxWidth: '500px', margin:10}}>
      <CardHeader
        avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        <AvatarLogo/>
        }
        

        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title="Testing"
        subheader="August 32, 2023"
      />
      <CardMedia
        component="img"
        height="194"
        image="/src/assets/Logo.svg"
        alt="Logo"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            Testing the caption was successful if you see this
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing> */}
        <IconButton aria-label="Like">
        <EmojiNatureTwoToneIcon onClick={() => setCount((count) => count + 1)}/>
        {count}
        </IconButton>
       {/* <ExpandMore>
       <img
            src={ChatIcon}
            alt="ChatIcon"
            style={{ display: { xs: 'none', md: 'flex' },width: '95px', height: 'auto',}} 
            
          />  
        </ExpandMore>  */}
          
        {/**change this to comment section */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        <img
            src={ChatIcon}
            alt="ChatIcon"
            style={{ display: { xs: 'none', md: 'flex' },width: '95px', height: 'auto',}} 
            
          />            
          </ExpandMore>
        
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph><CommentPost/></Typography>
          {/* <AvatarLogo/>
          <Typography paragraph >
            Test
          </Typography> */}
        </CardContent>
      </Collapse>
      {/* </CardActions> */}
    </Card>
</Toolbar>
  );
}
