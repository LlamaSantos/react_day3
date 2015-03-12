import React from 'react';
import firebaseUtils from '../../utils/firebaseUtils';

export default React.createClass({

  componentWillMount(){
    firebaseUtils.logout();
  },

  render() {
    return(
      <p>
        You are now logged out
      </p>
    );
  },
});
