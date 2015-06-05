'use strict';

/**
 * @ngdoc function
 * @name newEagleApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the newEagleApp
 */
angular.module('newEagleApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
