import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import { apiURLs } from "../../api_services/urls";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    color: "gray",
    marginTop: "8%",
    marginLeft: "25%",
    width: "50%",
    justifyContent: "center",
  },
  title: {
    display: "flex",
    marginTop: "2%",
    color: "#408CAA ",
    width: "100%",
    justifyContent: "center",
  },
}));

function Login(props) {
  console.log("props", props);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  if (!!Cookies.get("is_login")) {
    return <Redirect to="/todo" />;
  }

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleSubmit = async () => {
    try {
      let data = { email, password };
      console.log("data", data);
      const response = await axios.post(apiURLs.login(), data);

      if (response.status === 200) {
        Cookies.set("token", response.data.token);
        Cookies.set("is_login", 1);
        return (window.location.href = "/todo");
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Fragment>
      <Grid container spacing={3} m={5} className={classes.title}>
        <Typography variant={"h3"} m={5}>
          {" "}
          Todo App{" "}
        </Typography>
      </Grid>

      <Grid container spacing={3} m={5} className={classes.root}>
        <Typography variant={"h4"}> Login</Typography>
        <Grid item xs={12} sm={12}>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            autoFocus
            margin="dense"
            name="pasword"
            label="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            New to User?{" "}
            <Link to="/signup">
              <span style={{ color: "#408CAA " }}>Sign Up </span>{" "}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Login;
