import React, { Fragment, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link, Redirect } from "react-router-dom";
import { apiURLs } from "../../api_services/urls";
import Cookies from "js-cookie";
import { useSnackbar } from 'notistack';

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
  // console.log("props", props);
  const { enqueueSnackbar } = useSnackbar();

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
      if(!data.email) return enqueueSnackbar("Email is required",{variant:"warning"});
      if(!data.email.includes("@")) return enqueueSnackbar("Use valid email",{variant:"warning"});
      if(!data.password) return enqueueSnackbar("Password is required",{variant:"warning"});
      if(data.password.length< 8) return enqueueSnackbar("Password should contain 8 characters",{variant:"warning"});
     
      console.log("data", data);
      const response = await axios.post(apiURLs.login(), data);

      if (response.status === 200) {
        Cookies.set("token", response.data.token);
        Cookies.set("is_login", 1);
        enqueueSnackbar("Login Successful ",{variant:"success"});
        return (window.location.href = "/todo");
      } else {
      }
    } catch (e) {
      enqueueSnackbar("Login Failed Wrong User Credentials",{variant:"error"});
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
              setEmail(e.target.value.toLowerCase());
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
          
          >
            New to User?{" "}
            <Link to="/signup" style={{ color: "#408CAA ",textDecoration:"none" }}>
              <span ><strong> Sign Up</strong> </span>{" "}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Login;
