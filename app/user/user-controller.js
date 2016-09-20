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

  function UserCtrl(User, $state) {
    var vm = this;

    vm.signUp = function () {
      if (vm.loginForm.$valid) {
        User.signUp(vm.credentials)
          .then(onSuccess)
          .catch(onError);
      }
    };

    vm.signIn = function () {
      if (vm.loginForm.$valid) {
        User.signIn(vm.credentials)
          .then(onSuccess)
          .catch(onError);
      }
    };

    function onSuccess() {
      $state.go('home');
    }

    function onError(error) {
      vm.errorMessage = error;
    }
  }
}());
