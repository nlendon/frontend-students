import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Home from './Pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  return (

      <BrowserRouter>
        <Switch>
          <Route exact path="/login"  component={Login}/>
          <Route exact path='/admin' component={Admin}/>
          <Route exact path='/' component={Home}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
