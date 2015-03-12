'use strict';

import firebaseUtils from './firebaseUtils';
import Login from '../components/login-register/Login';

export default {
  statics: {
    willTransitionTo (transition) {
      if (!firebaseUtils.isLoggedIn()) {
        Login.attemptedTransition = transition;
        transition.redirect('login');
      }
    }
  }
};
