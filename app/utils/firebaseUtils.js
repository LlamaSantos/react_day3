'use strict';

import Firebase from 'firebase';

var forge = "https://react3.firebaseio.com"; /* Your Firebase URL Goes Here */
var ref = new Firebase(forge);
var cachedUser = null;

var formatEmail =  function(email){
  var key = email.replace('@', '^');
  if(key.indexOf('.') !== -1){
    return key.split('.').join('*');
  }
  return key;
};

var addUser = function(newUser){
  var key = formatEmail(newUser.email);
  ref.child('user').child(key).set(newUser);
};


export default {
  getRef() {
    return ref;
  },

  createUser(info, cb) {
    let user = { email: info.email, password: info.pw };

    ref.createUser(user, (error, data) => {
      error ?
        cb({ message: 'Create user failed.', error}) :
        this.loginWithPw(info, cb);
    });
  },

  loginWithPw(info, callback) {
    let user = { email: info.email, password: info.pw };
    ref.authWithPassword(user, (error, data) => {
      if (error) {
        console.info(error);
        callback(error);
        this.onChange || this.onChange(false);
      } else {
        data.email = info.email;
        cachedUser = data;
        callback(null, data);
        this.onChange || this.onChange(true);
      }
    });
  },

  isLoggedIn() {
    return (!!cachedUser) && (!!this.getRef());
  },

  logout() {
    ref.unauth();
    cachedUser = null;
    this.onChange(false);
  },

  toArray(obj) {
    return Object.keys(obj).map((key) => { return {key, val: obj[key]}; });
  }
}
