(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name home.directive:focus-on
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="home">
       <file name="index.html">
        <focus></focus>
       </file>
     </example>
   *
   */
  angular
    .module('home')
    .directive('focusOn', focusOn);

  function focusOn() {
    return function (scope, elem, attr) {
      scope.$on(attr.focusOn, function () {
        elem[0].focus();
      });
    };
  }
}());
