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

  function HomeCtrl(Chat, $mdSidenav, $anchorScroll, $timeout, $scope) {
    var vm = this;

    // Initialize base state
    vm.currentMessage = '';
    vm.localUser = 'Brian Gammon';
    vm.selected = null;
    vm.users = Chat.getChatUsers();
    $mdSidenav('left').then(function (left) {
      left.open();
    });

    // Register visitor for scrolling on msg received
    Chat.onMessageReceived(scrollToBottom);

    // Methods called from views
    vm.selectUser = function (user) {
      vm.selected = angular.isNumber(user) ? vm.users[user] : user;
      vm.chats = Chat.getChats(vm.localUser, vm.selected.name);
      scrollToBottom();
      $timeout(function () {
        $scope.$broadcast('setFocus');
      }, 1000);
    };

    vm.submit = function () {
      if (vm.newMessage) {
        Chat.sendMessage(vm.localUser, vm.selected.name, vm.newMessage);
        vm.newMessage = '';
        scrollToBottom();
      }
    };

    vm.toggleList = function () {
      $mdSidenav('left').toggle();
    };

    // Internal methods
    function scrollToBottom() {
      $timeout(function () {
        $anchorScroll('bottom');
      }, 0);
    }
  }
}());
