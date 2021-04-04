import './App.css';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import { Switch, Route, withRouter } from 'react-router-dom';
import "antd/dist/antd.css";

function App () {
  return (
    <Switch>
      <Route exact path="/" component={ Users } />
      <Route exact path="/users/:id" component={ UserDetails } />
    </Switch>
  );
}

export default withRouter( App );
