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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Toolbar
  disableGutters
  sx={{
    display: 'flex',           // Use flexbox layout
    justifyContent: 'center',  // Center-align horizontally
    marginTop:'100px'
  }}
>
    {/* <div style={{ width: '100%', maxWidth: '500px'}}> */}
    <Card sx={{width:'200%'}}>
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
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/src/assets/Logo.svg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            Testing
            {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}

        </button>
        <FavoriteIcon onClick={() => setCount((count) => count + 1)}/>
        {count} */}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          
        

 

        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comments:</Typography>
          <AvatarLogo/>
          <Typography paragraph >
            Test
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    
</Toolbar>
  );
}
