(function () {
  'use strict';

  /* @ngdoc object
   * @name rvajschat
   * @description
   *
   */
  angular
    .module('rvajschat', [
      'ngMaterial',
      'ui.router',
      'home',
      'user',
      'ngMdIcons',
      'ngMessages'
    ])
    .constant('API', 'http://104.236.199.3:1337');
}());
