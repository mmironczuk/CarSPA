import logo from './logo.svg';
import './App.css';
import {store} from "./actions/store";
import {Provider} from "react-redux";
import Cars from './components/Cars';
import Clients from './components/Clients';
import Borrows from './components/Borrows';
import {Container} from "@material-ui/core";
import { BrowserRouter, Route } from 'react-router-dom'
import BootstrapNavbar from './components/BootstrapNavbar';

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="lg">
        <BrowserRouter>
          <BootstrapNavbar/>
            <Route exact path="/Cars" component={Cars}></Route>
            <Route exact path="/Clients" component={Clients}></Route>
            <Route exact path="/Borrows" component={Borrows}></Route>
        </BrowserRouter>
      </Container>
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
