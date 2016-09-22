(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl(User, Chat, $mdSidenav, $anchorScroll, $timeout, $scope, $state) {
    var vm = this,
        currentUser = User.currentUser;

    // Redirect to login if not signed in
    if (!currentUser) {
      $state.go('signup');
    }
    // Initialize base state
    vm.currentMessage = '';
    vm.localUser = currentUser;
    vm.selected = null;
    vm.users = Chat.getChatUsers();
    $mdSidenav('left').then(function (left) {
      left.open();
    });

    // Set observer for auth changed
    User.onAuth(function (user) {
      vm.currentUser = user;
      if (!user) {
        $state.go('signup');
      }
    });

    // Register visitor for scrolling on msg received
    Chat.onMessageReceived(scrollToBottom);

    // Methods called from views
    vm.selectUser = function (user) {
      vm.selected = angular.isNumber(user) ? vm.users[user] : user;
      vm.chats = Chat.getChats(vm.localUser.userName, vm.selected.name);
      scrollToBottom();
      $timeout(function () {
        $scope.$broadcast('setFocus');
      }, 750);
    };

    vm.submit = function () {
      if (vm.newMessage) {
        Chat.sendMessage(vm.localUser.userName, vm.selected.name, vm.newMessage);
        vm.newMessage = '';
        scrollToBottom();
      }
    };

    vm.toggleList = function () {
      $mdSidenav('left').toggle();
    };

    vm.logout = function () {
      User.signOut();
    };

    // Internal methods
    function scrollToBottom() {
      $timeout(function () {
        $anchorScroll('bottom');
      }, 0);
    }
  }
}());
