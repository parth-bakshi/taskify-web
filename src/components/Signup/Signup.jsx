import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        color: "gray",
        marginTop: '5%',
        marginLeft: "25%",
        width: "50%",
        justifyContent: "center"
    },
    title: {
        display: "flex",
        marginTop: '2%',
        color: "#408CAA ",
        width: '100%',
        justifyContent: "center"

    }
})
)

function Signup() {
    const classes = useStyles();
    const [name, setName] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        let data = { name ,email, password }
        console.log("data", data)
    }
    return (
        <Fragment >
            <Grid container spacing={3} m={5} className={classes.title}>
                <Typography variant={"h3"} m={5}> Todo App </Typography>
            </Grid>


            <Grid container spacing={3}  className={classes.root}>

                <Typography variant={"h4"} > Sign Up</Typography>
                <Grid item xs={12} sm={12}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        onChange={(e) => {
                            setName(e.target.value)
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
                            setEmail(e.target.value)
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
                            setPassword(e.target.value)
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                        Submit
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography variant="contained" color="primary" onClick={handleSubmit}>
                    Already a User? <Link to="/login"><span style={{color: "#408CAA "}}>Login </span>  </Link>

                   </Typography>
                </Grid>

            </Grid>
        </Fragment>
    )
}


export default Signup;