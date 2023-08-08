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
//import CommentBox from './CommentPost';
import CommentPost from '../components/CommentPost';
import ChatIcon from '../assets/ChatIcon.png'; 
import io from "socket.io-client";
import EmojiNatureTwoToneIcon from '@mui/icons-material/EmojiNatureTwoTone';


const socket= io("http://localhost:3010");

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

let genericCard=[{post_content:"This is a generic post",id:0, },{post_content:"This is a generic #2 post",id:101, }];

/*
export const postLoader = async () => {
  try {
    const response = await fetch('http://localhost:3011/posts');
    if (!response.ok) {
      throw new Error('Data was not properly fetched');
    }
    return response.json();
  } catch (error) {
    throw new Error('Error fetching data');
  }
};
*/

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [postdata, setPostData]=React.useState([]); //[genericCard]
  const [postform, setPostForm]=React.useState(''); //[genericCard]
  const [count, setCount] = React.useState(0)


  const handleExpandClick = () => {
    setExpanded(!expanded);
    //socket.emit("clickedPost",postId);//Emits the id of the currently clicked post
    socket.emit("getPostComments");
  };

  

   React.useEffect(()=>{
     socket.on("getHivePost", (data) => {
      try {
      
        if(postdata!==data){
        setPostData(data);} // Update state using setPostData
        //setLoading(false); // Set loading to false once data is received
       // socket.emit("test",data);
      } catch (error) {
        console.error("Error updating postdata:", error);
      }
    });
  }, [postdata]); //postform caused to many rerenders, need to experiment
 


//const thePostsData=postdata;




return (
  <div>

  {postdata.map((post)=>{ 
   
    return(
  <Toolbar
  key={post.id} 
disableGutters
sx={{
  display: 'flex',           // Use flexbox layout
  justifyContent: 'center',  // Center-align horizontally
  alignContent:'center',
  marginTop:'0px',
  marginLeft:'100px'
  
}}
>
  <Card sx={{ maxWidth: 345, margin:10 }}>
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
      title={post.id}
      subheader={post.id}
    />
    <CardMedia
      component="img"
      height="194"
      image="/src/assets/Logo.svg"
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
          {post.post_content}
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
        <Typography paragraph><CommentPost postId={post.id}/></Typography>
        {/* <AvatarLogo/>
        <Typography paragraph >
          Test
        </Typography> */}  
      </CardContent>
    </Collapse>
    {/* </CardActions> */}
  </Card>
</Toolbar>
)  
  })}

</div>
);

} 






/**
 * // Post component accepts a post object prop
function Post({ post }) {

  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <CardHeader 
        title={post.title}
        subheader={post.date}
        avatar={<Avatar />} 
      />

      <CardContent>
        <Typography>{post.content}</Typography>
      </CardContent>

      <CardActions>
        <IconButton>
          <FavoriteIcon />  
        </IconButton>

        <ExpandMore
          onClick={() => setExpanded(!expanded)}
        >
           <ChatBubbleIcon />
        </ExpandMore>
      </CardActions>
      
      <Collapse in={expanded}>
        <CommentSection post={post} />
      </Collapse>

    </Card>
  );

}

// Usage:

{posts.map(post => (
  <Post key={post.id} post={post} /> 
))}
 */

