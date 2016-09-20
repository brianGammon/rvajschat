(function () {
  'use strict';

  angular
    .module('user')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'user/signin.tpl.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'user/signup.tpl.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      });
  }
}());
