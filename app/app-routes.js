(function () {
  'use strict';

  angular
    .module('rvajschat')
    .config(config);

  function config($urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/home');
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
}());
