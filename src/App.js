// import logo from './logo.svg';
import './App.css';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import "antd/dist/antd.css";

function App () {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={ logo } className="App-logo" alt="logo" />
    //     <p>
    //       Edit!!! !@<code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>




    // <div style={ { padding: 20 } }>
    //   <Users />
    // </div>


    <Switch>
      <Route exact path="/" component={ Users } />
      <Route exact path="/users/:id" component={ UserDetails } />
      {/* <Redirect to="/login" /> */ }
    </Switch>

  );
}

export default withRouter( App );
