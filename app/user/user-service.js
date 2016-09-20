(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name user.factory:User
   *
   * @description
   *
   */
  angular
    .module('user')
    .factory('User', User);

  function User() {
    var UserBase = {},
        callbacks = [],
        currentUser = null;

    // instance member to track logged in user
    UserBase.currentUser = currentUser;

    UserBase.onAuth = function (cb) {
      callbacks.push(cb);
    };

    UserBase.signIn = function (credentials) {
      authChanged({
        userName: credentials.userName
      });
    };

    UserBase.signUp = function (credentials) {
      authChanged({
        userName: credentials.userName
      });
    };

    UserBase.signOut = function () {
      authChanged(null);
    };

    return UserBase;

    function authChanged(user) {
      UserBase.currentUser = user;
      angular.forEach(callbacks, function (callback) {
        callback(user);
      });
    }
  }
}());
