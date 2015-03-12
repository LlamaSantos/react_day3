import React from 'react';
import Router from 'react-router';
import firebaseUtils from '../utils/firebaseUtils';

let { RouteHandler, Link } = Router;

export default React.createClass({

  getInitialState() {
    return {
      loggedIn: firebaseUtils.isLoggedIn()
    };
  },

  handleChange(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentWillMount() {
    firebaseUtils.onChange = this.handleChange;
  },

  render() {
    let isLoggedIn = firebaseUtils.isLoggedIn();
    let register = isLoggedIn ? null :
        (<li>
          <Link className="navbar-brand" to='register'> Register </Link>
        </li>);
    let loginOrOut = isLoggedIn ?
        (<li>
          <Link className="navbar-brand" to='logout'> Logout </Link>
        </li>) :
        (<li>
          <Link className="navbar-brand" to='login'> Login </Link>
        </li>);

    return (
      <span>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <Link to="home" className="navbar-brand"> NBA Routes </Link>
            </div>
            <ul className="nav navbar-nav pull-right">
              <li><Link to="home" className="navbar-brand"> Home </Link></li>
              {register}
              {loginOrOut}
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <RouteHandler />
          </div>
        </div>
      </span>
    );
  }
});
