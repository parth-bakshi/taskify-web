import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import CategoryIcon from '@material-ui/icons/Category';

import AddTodo from "../Todo/AddTodo";
import SimpleCard from './card';
import "./styles.css"

import AddCategory from "../Category/AddCategory"
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    color:"lightgray",
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor:"rgb(30,32,34,0.8)"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    position:"relative"
    // backgroundColor:"#212529"
  },
}));

const tempArrayTasks = [{
                      name:"abc",
                      category:"Home",
                      date:"23-10-2020",
                      description:"abcdefgh ijklmonfevhcghjvvjkjbvjkjvnkjvnk \
                      jnvghjnbvcfghbvcfgyujvcftyujhvcfgujvcfyujhvcghjvcfyhbvcfghbvcfgujbvcfyujhbvcfghjvcf \
                      ghjhbvghjvcfyujbvfyujbvcftyujbvcfyujbcfgujhvcftyuhgvhjgcgjiugfcguiugfhjkjgcvjkljgfdghljg \
                      fhjkjcghkjfsfyuiufxkjcxjokjxhjkjcxkijckixghkjcxjgxvjkicxvhjkjvvjkjcxhjcvjkjcxcvhjbvjkjvcvk \
                      lvc pqrstu vwxyz",
                      completeStatus:false
                    },
                    {
                      name:"abc",
                      category:"Home",
                      date:"23-10-2020",
                      description:"abcdefgh ijklmonfevhcghjvvjkjbvjkjvnkjvnk \
                      jnvghjnbvcfghbvcfgyujvcftyujhvcfgujvcfyujhvcghjvcfyhbvcfghbvcfgujbvcfyujhbvcfghjvcf \
                      ghjhbvghjvcfyujbvfyujbvcftyujbvcfyujbcfgujhvcftyuhgvhjgcgjiugfcguiugfhjkjgcvjkljgfdghljg \
                      fhjkjcghkjfsfyuiufxkjcxjokjxhjkjcxkijckixghkjcxjgxvjkicxvhjkjvvjkjcxhjcvjkjcxcvhjbvjkjvcvk \
                      lvc pqrstu vwxyz",
                      completeStatus:false
                    },
                    {
                      name:"abc",
                      category:"Home",
                      date:"23-10-2020",
                      description:"abcdefgh ijklmonfevhcghjvvjkjbvjkjvnkjvnk \
                      jnvghjnbvcfghbvcfgyujvcftyujhvcfgujvcfyujhvcghjvcfyhbvcfghbvcfgujbvcfyujhbvcfghjvcf \
                      ghjhbvghjvcfyujbvfyujbvcftyujbvcfyujbcfgujhvcftyuhgvhjgcgjiugfcguiugfhjkjgcvjkljgfdghljg \
                      fhjkjcghkjfsfyuiufxkjcxjokjxhjkjcxkijckixghkjcxjgxvjkicxvhjkjvvjkjcxhjcvjkjcxcvhjbvjkjvcvk \
                      lvc pqrstu vwxyz",
                      completeStatus:true
                    },
                    {
                      name:"abc",
                      category:"Home",
                      date:"23-10-2020",
                      description:"abcdefgh ijklmonfevhcghjvvjkjbvjkjvnkjvnk \
                      jnvghjnbvcfghbvcfgyujvcftyujhvcfgujvcfyujhvcghjvcfyhbvcfghbvcfgujbvcfyujhbvcfghjvcf \
                      ghjhbvghjvcfyujbvfyujbvcftyujbvcfyujbcfgujhvcftyuhgvhjgcgjiugfcguiugfhjkjgcvjkljgfdghljg \
                      fhjkjcghkjfsfyuiufxkjcxjokjxhjkjcxkijckixghkjcxjgxvjkicxvhjkjvvjkjcxhjcvjkjcxcvhjbvjkjvcvk \
                      lvc pqrstu vwxyz",
                      completeStatus:false
                    }
                  ]
const tempArrayCategory = ["personal", "Work", "Shopping", "custom"];

function TodoDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openTodo, setOpenTodo] = React.useState(Boolean);
  const [categories, setcategories] = React.useState(tempArrayCategory);
  const [tasks,setTasks] = React.useState(tempArrayTasks); 
  //need to fetch data for above 2 state in componentdidmount
  const [openCategory, setOpenCategory] = React.useState(Boolean);


  // const [categoryItem,setCategoryItem] = React.useState(["General"]);

  const handleCategory =()=>{
    setOpenCategory(true)
  }

  const handleAddTodo =()=>{
    setOpenTodo(true);
   }
 
   const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleSubmitCategory =(category)=>{
    // setCategoryItem([...categoryItem,category])
    tempArrayCategory.push(category)
    setcategories([...tempArrayCategory])
    // localStorage.setItem('category',categories)
  }

  const drawer = (
    <div>
      <div className={`${classes.toolbar} toolbar-left`} />
      {/* <Divider /> */}
      <List className="toolbar-left">
          
          <ListItem>
            {/* <ListItemIcon><AddCircleIcon /></ListItemIcon> */}
            <ListItemText primary="User's Name" />
          </ListItem>


          {/* <ListItem button onClick={handleAddTodo}>
            <ListItemIcon><AddCircleIcon /></ListItemIcon>
            <ListItemText primary={"Add Todo"} />
          </ListItem> */}
          <AddTodo open={openTodo} onClose={()=>{setOpenTodo(!openTodo)}} />

          <ListItem button>
            <ListItemIcon><AddCircleIcon /></ListItemIcon>
            <ListItemText primary={"All"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon><AddCircleIcon /></ListItemIcon>
            <ListItemText primary={"Completed Tasks"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon><AddCircleIcon /></ListItemIcon>
            <ListItemText primary={"Incomplete Tasks"} />
          </ListItem>


      </List>
      <Divider />
      <List className="toolbar-left">
        {categories.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {/* {(text !== "personal" && "Work"&&"Shopping" ) ) ?<CategoryIcon />:null}
              {text==="personal"?<i class="fa fa-user fa-lg" aria-hidden="true"></i>:null}
              {text==="Work"?<i class="fa fa-briefcase fa-lg" aria-hidden="true"></i>:null}
              {text==="Shopping"?<i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>:null} */}
            <CategoryIcon />
            </ListItemIcon>

            <ListItemText primary={text} />
          </ListItem>
        ))}
        {/* <ListItem input style={{backgroundColor:"rgb(30,32,34,0.8)"}}> */}
          {/* <ListItemIcon> <AddCircleIcon /> </ListItemIcon> */}
          {/* <ListItemText primary="Add your Category" /> */}
          {/* <input placeholder={"Add your own Category"} style={{border:"none",height:"30px",backgroundColor:"rgb(30,32,34,0.8)",color:"lightgray",":placeholder":{color:"lightgray"}}}/> */}
        {/* </ListItem> */}
      </List>

      {/* <Drawer /> */}
      <Divider />
      <ListItem button onClick={handleCategory} style={{backgroundColor:"rgb(30,32,34,0.8)", color:"white"}}>
            <ListItemIcon><AddCircleIcon /></ListItemIcon>
            <ListItemText primary={"Add Category"} />
      </ListItem>

      <AddCategory handleSubmitCategory={handleSubmitCategory} open={openCategory} onClose={()=>{setOpenCategory(!openCategory)}} />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            ToDo App 
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {tasks.map((task,index)=>{
          return <Typography paragraph>
            <SimpleCard 
              name={task.name}
              category={task.category}
              date={task.date}
              description={task.description}
              completeStatus={task.completeStatus}
            />
        </Typography>
        })}

        <Typography paragraph>
          {/* <SimpleCard 
            name="abc"
            category="Home"
            date="23-10-2020"
            description="abcdefgh ijklmonfevhcghjvvjkjbvjkjvnkjvnk
            jnvghjnbvcfghbvcfgyujvcftyujhvcfgujvcfyujhvcghjvcfyhbvcfghbvcfgujbvcfyujhbvcfghjvcf
            ghjhbvghjvcfyujbvfyujbvcftyujbvcfyujbcfgujhvcftyuhgvhjgcgjiugfcguiugfhjkjgcvjkljgfdghljg
            fhjkjcghkjfsfyuiufxkjcxjokjxhjkjcxkijckixghkjcxjgxvjkicxvhjkjvvjkjcxhjcvjkjcxcvhjbvjkjvcvk
            lvc pqrstu vwxyz"
            completeStatus={true}
          /> */}
       </Typography>

       <div button onClick={handleAddTodo} className="add-button">
          <ListItemIcon><AddCircleIcon style={{width:"100%",height:"100%"}}/></ListItemIcon>
        </div>
      </main>
    </div>
  );
}



export default TodoDrawer;
