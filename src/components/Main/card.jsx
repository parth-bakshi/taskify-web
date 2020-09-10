import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./styles.css";
import classNames from "classnames";
import axios from "axios";
import { apiURLs } from "../../api_services/urls";
import Cookies from "js-cookie";
import { useSnackbar } from 'notistack';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment";
import {
  red,
  pink,
  blue,
  green,
  yellow,
  orange,
  deepOrange,
  purple,
  deepPurple,
  cyan,
} from "@material-ui/core/colors";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: "100%",
    borderRadius: "18px",
    backgroundColor: "rgb(30,32,34,0.8)",
    backgroundColor: "#22375a",
    color: "lightgray",
    transition: "0.5s",
    "&:hover": {
      opacity: "0.9"
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  flexcol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    margin: "15px 0px 35px 0px",
  },
  description: {
    textAlign: "left",
    width: "90%",
    wordBreak: "break-all"
  },
  descriptionTop: {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
  },
  align: {
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
    "&:hover": {
      color: "lightblue",
      cursor: "pointer",
      transition: "0.5s",
    },
  },
  deleteButton: {
    width: "10%",
    padding: "2% 0 0 4%",

  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  //   const bull = <span className={classes.bullet}>•</span>;
  const [completeStatus, changeCompleteStatus] = React.useState(props.completeStatus);
  const { enqueueSnackbar } = useSnackbar();

  function toggleComplete() {
    changeCompleteStatus(!completeStatus);
    const params = JSON.stringify({
      "id": props.id,
    });
    axios
      .post(apiURLs.toggleTask(), params, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "content-type": "application/json",
        },
      })
      .then((res) => {
        if (res.status != 200) {
          changeCompleteStatus(!completeStatus);
          enqueueSnackbar("Failed to mark as complete", { variant: "error" });
        } else {
          props.toggleTaskState(props.id);
          if (props.completeStatus) enqueueSnackbar("Mark as a Incompleted", { variant: "error" });
          if (!props.completeStatus) enqueueSnackbar("Mark as a Completed", { variant: "success" });
        }
        // console.log(res);
      });

    //api call for toggle status
  }

  function deleteTask() {
    const params = JSON.stringify({
      "id": props.id,
    });
    axios
      .post(apiURLs.deleteTask(), params, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "content-type": "application/json",
        },
      })
      .then((res) => {
        if (res.status == 200) {
          props.deleteTask(props.id);
          enqueueSnackbar("Task Deleted Successfully", { variant: "success" });
        }
        // console.log(res);
      }).catch((e) => {
        enqueueSnackbar("Failed to Delete the Task", { variant: "error" });

      })
      ;
  }
  return (
    <Card className={`${classes.root} ${completeStatus ? "check" : null}`}
      onClick={toggleComplete}>
      <CardContent className={classes.flexcol}>
        <div className={classes.content}>
          <div className={classes.align}>
            <i className="fa fa-check-circle-o fa-lg blue" aria-hidden="true"></i>
            {props.name}
          </div>
          <div> {props.category} </div>
          <div> {moment(props.date).format("MM-DD-YYYY || hh:mm a")} </div>
          <div><input type="checkbox" className="checkbox" checked={completeStatus} /></div>
        </div>
        <div className={classes.descriptionTop}>
          <div className={classes.description}> {props.description} </div>
          <div className={classes.deleteButton}>
            <Button p={5}>

              <DeleteIcon fontSize={"large"} color={"secondary"} onClick={deleteTask} />

            </Button>
          </div>
        </div>
      </CardContent>

    </Card>
  );
}
