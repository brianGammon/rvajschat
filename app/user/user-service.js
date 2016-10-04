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

  function User($http) {
    var UserBase = {},
        callbacks = [],
        // currentUser = {
        //   username: 'Brian',
        //   email: 'bgammon@gmail.com',
        //   id: 13,
        //   createdAt: '2016-10-02T22:31:59.554Z',
        //   updatedAt: '2016-10-02T22:31:59.554Z',
        //   accessToken: 'BybSGdqwyVUBWxQGt4xwGMDFVqFchMx5H+ZKOBg5ylJWXXHCxsbdi8l9V74AHx5o'
        // };
        currentUser = null;

    // instance member to track logged in user
    UserBase.currentUser = currentUser;

    // observer pattern to notify when auth changes
    UserBase.onAuth = function (cb) {
      callbacks.push(cb);
    };

    UserBase.signIn = function (credentials) {
      return $http.post('http://104.236.80.163:1337/api/v1/auth/local', credentials)
        .then(function (result) {
          var user = result.data.user;
          console.log(result);
          authChanged(user);
          return user;
        });
    };

    UserBase.signUp = function (credentials) {
      return $http.post('http://104.236.80.163:1337/api/v1/auth/local/register', credentials)
        .then(function (result) {
          var user = result.data.user;
          console.log(result);
          authChanged(user);
          return user;
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
