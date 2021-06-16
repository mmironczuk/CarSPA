import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%",
      margin:0
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    link:{
        textDecoration: "none",
        color: "white",
    },
    title: {
      flexGrow: 1,
    },
  }));
  

export default function BootstrapNavbar(){ 
        const classes = useStyles();
        return(
            <div className={classes.root}>
            <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Cars
                </Typography>
                    <Button className={classes.menuButton}><Link className={classes.link} to="/Cars">Cars</Link></Button>
                    <Button className={classes.menuButton}><Link className={classes.link} to="/Clients">Clients</Link></Button>
                    <Button className={classes.menuButton}><Link className={classes.link} to="/Borrows">Borrows</Link></Button>
                    <br />
            </Toolbar>
            </AppBar>
            </div>
        )  
}

//export default BootstrapNavbar;