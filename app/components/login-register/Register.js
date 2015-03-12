import React from 'react';
import firebaseUtils from '../../utils/firebaseUtils';
import Router from 'react-router';

export default React.createClass({
  mixins: [ Router.Navigation ],

  handleSubmit(e) {
    e.preventDefault();

    var info = {
      email: this.refs.email.getDOMNode().value,
      pw: this.refs.pw.getDOMNode().value
    };

    firebaseUtils.createUser(info, (err) => {
      this.replaceWith('home');
    });
  },

  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label> Email </label>
            <input className="form-control" ref="email" placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input ref="pw" type="password" className="form-control" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    )
  }
});
