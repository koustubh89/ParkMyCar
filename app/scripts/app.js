'use strict';

/**
 * @ngdoc overview
 * @name newEagleApp
 * @description
 * # newEagleApp
 *
 * Main module of the application.
 */
angular
  .module('newEagleApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/',              {templateUrl: 'views/main.html',      controller: 'MainCtrl'  })
      .when('/about',         {templateUrl: 'views/about.html',     controller: 'AboutCtrl' })
      .when('/suggestions',   {templateUrl: 'views/freeUser.html',  controller: 'freeUserCtrl' })

      .otherwise({redirectTo: '/'});
  });
