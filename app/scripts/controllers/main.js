'use strict';

/**
 * @ngdoc function
 * @name newEagleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newEagleApp
 */
angular.module('newEagleApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
