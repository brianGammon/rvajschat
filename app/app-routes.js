(function () {
  'use strict';

  angular
    .module('rvajschat')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}());
