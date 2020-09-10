import React, { Fragment, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { apiURLs } from "../../api_services/urls";
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    color: "gray",
    marginTop: "5%",
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

function Signup() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  if (!!Cookies.get("is_login")) {
    return <Redirect to="/todo" />;
  }

  const handleSubmit = async () => {

    try {
      let data = { email, password, name };
      if (!data.name) return enqueueSnackbar("Name is required", { variant: "warning" });
      if (!data.email) return enqueueSnackbar("Email is required", { variant: "warning" });
      if (!data.password) return enqueueSnackbar("Password is required", { variant: "warning" });
      if (data.password.length < 8) return enqueueSnackbar("Password should contain 8 characters", { variant: "warning" });

      const response = await axios.post(apiURLs.signup(), data);
      if (response.status === 201) {
        Cookies.set("token", response.data.token);
        Cookies.set("is_login", 1);
        enqueueSnackbar("Sign Up Successful ", { variant: "success" });
        return (window.location.href = "/todo");
      } else {
      }
    } catch (e) {
      enqueueSnackbar("Server Error, Please try again", { variant: "error" });
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

      <Grid container spacing={3} className={classes.root}>
        <Typography variant={"h4"}> Sign Up</Typography>
        <Grid item xs={12} sm={12}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            fullWidth
          />
        </Grid>
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

          >
            Already a User?{" "}
            <Link to="/login" style={{ color: "#408CAA ", textDecoration: "none" }}>
              <span style={{ color: "#408CAA " }}> <strong>Login</strong> </span>{" "}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Signup;
