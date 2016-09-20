(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name home.factory:Chat
   *
   * @description
   *
   */
  angular
    .module('home')
    .factory('Chat', Chat);

  function Chat(User, $timeout) {
    var ChatBase = {},
        chatCache = {},
        callbacks = [];

    // Clear chats cached on sign in change
    User.onAuth(reset);

    ChatBase.onMessageReceived = function (cb) {
      callbacks.push(cb);
    };

    ChatBase.getChatUsers = function () {
      return getMockUsers();
    };

    ChatBase.getChats = function (localUser, chatUser) {
      if (!chatCache[chatUser]) {
        chatCache[chatUser] = getMockChats(localUser, chatUser);
      }
      return chatCache[chatUser];
    };

    ChatBase.sendMessage = function (localUser, chatUser, message) {
      chatCache[chatUser].push(
        {
          sender: localUser,
          text: message
        }
      );

      $timeout(function () {
        chatCache[chatUser].push(
          {
            sender: chatUser,
            text: 'Back at you dude!'
          }
        );
        angular.forEach(callbacks, function (callback) {
          callback();
        });
      }, 2000);
    };

    return ChatBase;

    // Internal methods to stub fake users and chats
    function reset() {
      chatCache = {};
    }

    function getMockUsers() {
      return [
        {
          name: 'Lia Lugo'
        },
        {
          name: 'George Duke'
        },
        {
          name: 'Gener Delosreyes'
        },
        {
          name: 'Lawrence Ray'
        },
        {
          name: 'Ernesto Urbina'
        },
        {
          name: 'Gani Ferrer'
        }
      ];
    }

    function getMockChats(localUser, chatUser) {
      if (chatUser === 'Gener Delosreyes') {
        return [];
      }

      return [
        {
          sender: localUser,
          text: 'Here come dat boi'
        },
        {
          sender: chatUser,
          text: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
        },
        {
          sender: localUser,
          text: 'Here come dat boi'
        },
        {
          sender: chatUser,
          text: 'O s*!t, whaddup!'
        },
        {
          sender: localUser,
          text: 'Here come dat boi'
        },
        {
          sender: chatUser,
          text: 'O s*!t, whaddup!'
        },
        {
          sender: chatUser,
          text: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
        },
        {
          sender: localUser,
          text: 'Here come dat boi'
        },
        {
          sender: chatUser,
          text: 'O s*!t, whaddup!'
        }
      ];
    }
  }
}());
