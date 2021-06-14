import React from 'react'
import {store} from "../actions/store";
import {Provider} from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Cars from './Cars';
import Clients from './Clients';
import Borrows from './Borrows';

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
             /*<div>
                <div className="row">
                    <div className="col-md-12">
                        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                        <Navbar.Brand>React Bootstrap Navbar</Navbar.Brand>
                            <Router>
                                <Nav>
                                <Link to="/Cars">Cars</Link>
                                        <Route exact path="/Cars" component={Cars}>
                                        </Route>
                                </Nav>
                                <Nav>
                                <Link to="/Clients">Clients</Link>
                                        <Route exact path="/Clients" component={Clients}>
                                        </Route>
                                </Nav>
                                <Nav>
                                <Link to="/Borrows">Borrows</Link>
                                        <Route exact path="/Borrows" component={Borrows}>
                                        </Route>
                                </Nav>


                                    <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                    </Form>
                            <br />
                        </Router>
                        </Navbar>
                    </div>
                </div>
            </div>*/
        )  
}

//export default BootstrapNavbar;