import React, { useState } from 'react';
import './App.css';
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home';
import NavBar from './components/NavBar';
import ContactTable from './components/contactList/ContactTable';



function App() {

  const [state, setstate] = useState(false);
  const [title, setTitle] = useState('');

  const authenticate = (newToken) => {
    setstate(!!newToken);
  }

  const handleLogout = () => {
    setstate(false);
  }

  const checkAuth = () => {
    return !!window.localStorage.getItem('token');
  }

  const settingTitle = (title) => {
    setTitle(title);
  }

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={(props) => {
        return (
          (!!window.localStorage.getItem('token'))
            ? <Component {...props} authenticate={authenticate} settingTitle={settingTitle} />
            : <Redirect to='/login' />)
      }} />
    )
  }


  return (
    <div className="App">

      <Router>
        <section>
          <header>
            <Header token={state} handleLogout={handleLogout} checkAuth={checkAuth} />
          </header>

          {state && <NavBar title={title} />}
          <div className="containerBox">
            <div style={{ width: '96%' }}>
              <Switch>
                <Route path="/login" exact render={(props1) => {
                  return (<Login {...props1} authenticate={authenticate} />);
                }} />
                <PrivateRoute path="/home" exact component={Home} />
                <PrivateRoute path="/contactTable" exact component={ContactTable} />
                <Redirect path="/" exact to='/signup' />
                <Route path="/signup" component={Signup} />
                <Route path="*" render={() =>
                  <Redirect to='/signup' />
                } />
              </Switch>
            </div>
          </div>
        </section>
      </Router>
    </div>
  );
}

export default App;
