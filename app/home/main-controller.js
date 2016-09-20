(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:MainCtrl
   *
   * @description handles monitoring authorization state and routing to proper views
   *
   */
  angular
    .module('home')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl(User, $state) {
    var vm = this;
    vm.currentUser = User.currentUser;

    // Set observer for auth changed
    User.onAuth(function (user) {
      vm.currentUser = user;
      if (!user) {
        $state.go('signup');
      } else {
        $state.go('home');
      }
    });

    vm.logout = function () {
      User.signOut();
    };
  }
}());
