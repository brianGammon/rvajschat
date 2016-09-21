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

  function User($q) {
    var UserBase = {},
        callbacks = [],
        currentUser = {
          userName: 'BrianG'
        };

    // instance member to track logged in user
    UserBase.currentUser = currentUser;

    // observer pattern to notify when auth changes
    UserBase.onAuth = function (cb) {
      callbacks.push(cb);
    };

    UserBase.signIn = function (credentials) {
      // stub for development
      // using $q to similate async request to API
      var deferred = $q.defer(),
          user = {
            userName: credentials.userName
          };

      authChanged(user);
      deferred.resolve(user);

      return deferred.promise;
    };

    UserBase.signUp = function (credentials) {
      // stub for development
      // using $q to similate async request to API
      var deferred = $q.defer(),
          user;

      // fake a common API error condition
      if (credentials.userName === 'Tester') {
        deferred.reject('User name is taken');
      } else {
        // hard code user and return
        user = {
          userName: credentials.userName
        };
        authChanged(user);
        deferred.resolve(user);
      }

      return deferred.promise;
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
