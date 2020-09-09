import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        // display: "flex",
        color: "gray",
        height: '100vh',
        justifyContent: "center",
        backgroundImage: `URL("todoBack.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    signup:{
        display:'flex',
        justifyContent:"center",
        textDecoration:"none",
        paddingTop:"1%"

    },
    login:{
        display:'flex',
        justifyContent:"center",
        paddingTop:"35%",

    }


})
)

function Landing() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid item xs={12} sm={12}>
            <Box  className={classes.login}>
                    <Link to="/login" style={{textDecoration:"none"}}>
                        <Button variant="outlined" color="primary">Login </Button>
                    </Link>

                </Box>

                <Box className={classes.signup}>
                    <Link to="/signup" style={{textDecoration:"none"}}>
                        <Button variant="outlined" color="primary">Signup</Button>
                    </Link>
                </Box>

            </Grid>
        </div>
    )
}


export default Landing;