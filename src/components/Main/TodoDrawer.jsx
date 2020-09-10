import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import CategoryIcon from "@material-ui/icons/Category";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import { apiURLs } from "../../api_services/urls";

import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import AddTodo from "../Todo/AddTodo";
import axios from "axios";
import SimpleCard from "./card";
import "./styles.css";

import AddCategory from "../Category/AddCategory";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "rgb(30,32,34,0.8)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
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
    position: "relative",
    // backgroundColor:"#212529"
  },
  loader: {
    display: "flex",
    marginTop: "20%",
    justifyContent: "center",
  },
}));

// const tempArrayTasks = [
//   {
//     name: "parth",
//     _id:"1",
//     category: "work",
//     date: "23-10-2020",
//     description:
//       "abcdefgh ijklmonfevhcghjvvjkjbvjkjvnkjvnk \
//                       jnvghjnbvcfghbvcfgyujvcftyujhvcfgujvcfyujhvcghjvcfyhbvcfghbvcfgujbvcfyujhbvcfghjvcf \
//                       ghjhbvghjvcfyujbvfyujbvcftyujbvcfyujbcfgujhvcftyuhgvhjgcgjiugfcguiugfhjkjgcvjkljgfdghljg \
//                       fhjkjcghkjfsfyuiufxkjcxjokjxhjkjcxkijckixghkjcxjgxvjkicxvhjkjvvjkjcxhjcvjkjcxcvhjbvjkjvcvk \
//                       lvc pqrstu vwxyz",
//     completeStatus: true,
//   },
//   {
//     name: "prateek",
//     _id:"2",
//     category: "work",
//     date: "23-10-2020",
//     description:
//       "abcdefgh ijklmonfevhcghjvvjkjbvjkjvnkjvnk \
//                       jnvghjnbvcfghbvcfgyujvcftyujhvcfgujvcfyujhvcghjvcfyhbvcfghbvcfgujbvcfyujhbvcfghjvcf \
//                       ghjhbvghjvcfyujbvfyujbvcftyujbvcfyujbcfgujhvcftyuhgvhjgcgjiugfcguiugfhjkjgcvjkljgfdghljg \
//                       fhjkjcghkjfsfyuiufxkjcxjokjxhjkjcxkijckixghkjcxjgxvjkicxvhjkjvvjkjcxhjcvjkjcxcvhjbvjkjvcvk \
//                       lvc pqrstu vwxyz",
//     completeStatus: false,
//   },
//   {
//     name: "swapnil",
//     _id:"3",
//     category: "shopping",
//     date: "23-10-2020",
//     description:
//       "abcdefgh ijklmonfevhcghjvvjkjbvjkjvnkjvnk \
//                       jnvghjnbvcfghbvcfgyujvcftyujhvcfgujvcfyujhvcghjvcfyhbvcfghbvcfgujbvcfyujhbvcfghjvcf \
//                       ghjhbvghjvcfyujbvfyujbvcftyujbvcfyujbcfgujhvcftyuhgvhjgcgjiugfcguiugfhjkjgcvjkljgfdghljg \
//                       fhjkjcghkjfsfyuiufxkjcxjokjxhjkjcxkijckixghkjcxjgxvjkicxvhjkjvvjkjcxhjcvjkjcxcvhjbvjkjvcvk \
//                       lvc pqrstu vwxyz",
//     completeStatus: true,
//   },
//   {
//     name: "unknown",
//     _id:"4",
//     category: "personal",
//     date: "23-10-2020",
//     description:
//       "abcdefgh ijklmonfevhcghjvvjkjbvjkjvnkjvnk \
//                       jnvghjnbvcfghbvcfgyujvcftyujhvcfgujvcfyujhvcghjvcfyhbvcfghbvcfgujbvcfyujhbvcfghjvcf \
//                       ghjhbvghjvcfyujbvfyujbvcftyujbvcfyujbcfgujhvcftyuhgvhjgcgjiugfcguiugfhjkjgcvjkljgfdghljg \
//                       fhjkjcghkjfsfyuiufxkjcxjokjxhjkjcxkijckixghkjcxjgxvjkicxvhjkjvvjkjcxhjcvjkjcxcvhjbvjkjvcvk \
//                       lvc pqrstu vwxyz",
//     completeStatus: false,
//   },
// ];
// const tempArrayCategory = [];

function TodoDrawer(props) {
  // const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openTodo, setOpenTodo] = React.useState(Boolean);
  const [categories, setcategories] = React.useState([]);
  const [allTasks, setAllTasks] = React.useState([]);
  const [userName, setUsername] = React.useState("");
  //above state will contain all data everytime
  const [loading, setLoading] = React.useState(true);

  const [tasks, setTasks] = React.useState([]);
  //above state will be responsible which tasks to display

  //fill  {tasks} and {alltasks} both in componentdidmount for the first time

  const [openCategory, setOpenCategory] = React.useState(Boolean);

  useEffect(() => {
    //to fetch categories
    axios
      .get(apiURLs.getUser(), {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        setUsername(res.data.user.name);
        setcategories(res.data.user.categories);
        setLoading(false);
      });
    //to fetch all tasks
    axios
      .get(apiURLs.getTasks(), {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        setTasks(res.data.data);
        setAllTasks(res.data.data);
      });
  }, []);

  const addTask = (task) => {
    let tempArray = [...tasks];
    tempArray.push(task);
    setTasks(tempArray);
    tempArray = [...allTasks];
    tempArray.push(task);
    setAllTasks(tempArray);
  };

  const handleCategory = () => {
    setOpenCategory(true);
  };

  const handleAddTodo = () => {
    setOpenTodo(true);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleSubmitCategory = (category) => {
    // setCategoryItem([...categoryItem,category])
    let tempArray = [...categories];
    tempArray.push(category);

    const params = JSON.stringify({
      category: category,
    });
    //to create a category
    axios
      .post(apiURLs.createCategory(), params, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "content-type": "application/json",
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setcategories([...tempArray]);
        }
        console.log(res);
      });

    // localStorage.setItem('category',categories)
  };

  // //Show Task Handlers
  // const handleShowAllTask = () => {
  //   setShowAllTask(true);
  //   setShowCompletedTask(false);
  //   setShowInCompletedTask(false);
  // };

  // const handleShowCompletedTask = () => {
  //   setShowCompletedTask(true);
  //   setShowAllTask(false);
  //   setShowInCompletedTask(false);
  // };
  // const handleShowInCompletedTask = () => {
  //   setShowInCompletedTask(true);
  //   setShowCompletedTask(false);
  //   setShowAllTask(false);
  // };
  const handleTask = (e) => {
    console.log(e.target.closest(".task-group").getAttribute("data-value"));
    let selectedElement = e.target
      .closest(".task-group")
      .getAttribute("data-value");

    if (selectedElement === "complete") {
      selectedElement = true;
    } else if (selectedElement === "incomplete") {
      selectedElement = false;
    }
    let tempArray = [...allTasks];
    tempArray = tempArray.filter((task) => {
      if (selectedElement === "all") {
        return true;
      }
      return selectedElement === task.completeStatus;
    });
    setTasks(tempArray);
  };

  const handleCategoryTasks = (e) => {
    console.log(e.target.closest(".category-group").getAttribute("data-value"));
    let selectedCategory = e.target
      .closest(".category-group")
      .getAttribute("data-value");

    let tempArray = [...allTasks];
    tempArray = tempArray.filter((task) => {
      return selectedCategory === task.category;
    });
    setTasks(tempArray);
  };

  const deleteTask = (id) => {
    let tempArray = [...tasks];
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i]._id === id) {
        tempArray.splice(i, 1);
        break;
      }
    }
    setTasks(tempArray);
    tempArray = [...allTasks];
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i]._id === id) {
        tempArray.splice(i, 1);
        break;
      }
    }
    setAllTasks(tempArray);
  };

  const toggleTaskState = (id) => {
    let tempArray = [...tasks];
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i]._id === id) {
        tempArray[i] = { ...tempArray[i] };
        tempArray[i].completeStatus = !tempArray[i].completeStatus;
        break;
      }
    }

    setTasks(tempArray);
    tempArray = [...allTasks];
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i]._id === id) {
        tempArray[i] = { ...tempArray[i] };
        tempArray[i].completeStatus = !tempArray[i].completeStatus;
        break;
      }
    }
    setAllTasks(tempArray);
  };

  const drawer = (
    <div>
      <div className={`${classes.toolbar} toolbar-left`} />
      {/* <Divider /> */}
      <List className="toolbar-left">
        <ListItem>
          {/* <ListItemIcon><AddCircleIcon /></ListItemIcon> */}
          <ListItemText primary={userName} />
        </ListItem>

        <AddTodo
          open={openTodo}
          onClose={() => {
            setOpenTodo(!openTodo);
          }}
          addTask={addTask}
          categories={categories}
        />

        <ListItem
          button
          onClick={handleTask}
          data-value="all"
          className="task-group"
        >
          <ListItemIcon>
            <AllInboxIcon />
          </ListItemIcon>
          <ListItemText primary={"All"} />
        </ListItem>

        <ListItem
          button
          onClick={handleTask}
          data-value="complete"
          className="task-group"
        >
          <ListItemIcon>
            <SentimentVerySatisfiedIcon />
          </ListItemIcon>
          <ListItemText primary={"Completed Tasks"} data-value="incomplete" />
        </ListItem>

        <ListItem
          button
          onClick={handleTask}
          data-value="incomplete"
          className="task-group"
        >
          <ListItemIcon>
            <SentimentVeryDissatisfiedIcon />
          </ListItemIcon>
          <ListItemText primary={"Incomplete Tasks"} />
        </ListItem>
      </List>
      <Divider />
      <List className="toolbar-left">
        {categories.map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={handleCategoryTasks}
            data-value={text}
            className="category-group"
          >
            <ListItemIcon>
              {text !== "Personal" && text !== "Work" && text !== "Shopping" ? (
                <CategoryIcon />
              ) : null}
              {text === "Personal" ? (
                <i className="fa fa-user fa-lg" aria-hidden="true"></i>
              ) : null}
              {text === "Work" ? (
                <i className="fa fa-briefcase fa-lg" aria-hidden="true"></i>
              ) : null}
              {text === "Shopping" ? (
                <i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
              ) : null}
              {/* <CategoryIcon /> */}
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
      <ListItem
        button
        onClick={handleCategory}
        style={{ backgroundColor: "rgb(30,32,34,0.8)", color: "white" }}
      >
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary={"Add Category"} />
      </ListItem>

      <AddCategory
        handleSubmitCategory={handleSubmitCategory}
        open={openCategory}
        onClose={() => {
          setOpenCategory(!openCategory);
        }}
      />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Fragment>
      {loading ? (
        <div className={classes.loader}>
          {" "}
          <CircularProgress />
          <Typography
            variant={"subtitle2"}
            style={{ margin: "1%", color: "#0a6fb6" }}
          >
            Welcome to Todo App{" "}
          </Typography>
        </div>
      ) : (
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
                anchor={theme.direction === "rtl" ? "right" : "left"}
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

            {
              //show tasks
              tasks.map((task, index) => {
                return (
                  <Typography paragraph key={task._id}>
                    <SimpleCard
                      id={task._id}
                      name={task.name}
                      category={task.category}
                      // date={task.date}
                      date={task.date}
                      description={task.description}
                      completeStatus={task.completeStatus}
                      deleteTask={deleteTask}
                      toggleTaskState={toggleTaskState}
                    />
                  </Typography>
                );
              })
            }

            <div button onClick={handleAddTodo} className="add-button">
              <ListItemIcon>
                <AddCircleIcon
                  style={{ width: "100%", height: "100%", color: "#408CAA" }}
                />
              </ListItemIcon>
            </div>
          </main>
        </div>
      )}
    </Fragment>
  );
}

export default TodoDrawer;
