import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Cars from './pages/Cars';
import Clients from './pages/Clients';
import Borrows from './pages/Borrows';
import { Container, makeStyles } from "@material-ui/core";
import { BrowserRouter, Route } from 'react-router-dom'
import BootstrapNavbar from './components/BootstrapNavbar';
import { Paper } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    height: '85vh'
  }
}));



function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>

      <BrowserRouter>
        <BootstrapNavbar />
        <Paper className={classes.paper} elevation={3}>
          <Route exact path="/Cars" component={Cars}></Route>
          <Route exact path="/Clients" component={Clients}></Route>
          <Route exact path="/Borrows" component={Borrows}></Route>
        </Paper>
      </BrowserRouter>
    </Provider>


    /*<Provider store={store}>
      <Container maxWidth="lg">
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Cars} />
        <Route exact path="/Clients" component={Clients} />
        <Route exact path="/Borrows" component={Borrows} />
      </BrowserRouter>
      </Container>
    </Provider>*/
  );
}

export default App;
