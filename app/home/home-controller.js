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
    Chat.getChatUsers()
      .then(function (data) {
        vm.users = data;
      });

    getChatMessages();

    // Set observer for auth changed
    User.onAuth(function (user) {
      vm.currentUser = user;
      if (!user) {
        $state.go('signup');
      }
    });

    // Register visitor for scrolling on msg received
    Chat.onMessageReceived(scrollToBottom);

    vm.refreshChats = function () {
      getChatMessages();
    };

    vm.submit = function () {
      var chat;
      if (vm.newMessage) {
        chat = {
          senderUser: vm.localUser.id,
          message: vm.newMessage
        };

        Chat.sendMessageApi(chat).then(function (result) {
          console.log(result);
          vm.newMessage = '';
          getChatMessages();
        });
      }
    };

    vm.toggleList = function () {
      $mdSidenav('left').toggle();
    };

    vm.logout = function () {
      User.signOut();
    };

    function getChatMessages() {
      Chat.getChatsApi().then(function (chats) {
        vm.chats = chats;
        scrollToBottom();
        $timeout(function () {
          $scope.$broadcast('setFocus');
        }, 750);
      });
    }

    // Internal methods
    function scrollToBottom() {
      $timeout(function () {
        $anchorScroll('bottom');
      }, 0);
    }
  }
}());
