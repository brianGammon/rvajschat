(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name user.controller:UserCtrl
   *
   * @description
   *
   */
  angular
    .module('user')
    .controller('UserCtrl', UserCtrl);

  function UserCtrl(User) {
    var vm = this;

    vm.signUp = function () {
      if (vm.loginForm.$valid) {
        User.signUp(vm.credentials);
      }
    };

    vm.signIn = function () {
      if (vm.loginForm.$valid) {
        User.signIn(vm.credentials);
      }
    };
  }
}());
