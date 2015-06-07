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
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/registered/:parkingId', {templateUrl: 'views/main.html',          controller: 'MainCtrl'    })
      .when('/about',                 {templateUrl: 'views/about.html',         controller: 'AboutCtrl'   })
      .when('/suggestions/:search',   {templateUrl: 'views/freeUser.html',      controller: 'freeUserCtrl'})
      .when('/welcome',               {templateUrl: 'views/entryScreen.html',   controller: 'welcomeCtrl' })

      .otherwise({redirectTo: '/welcome'});

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  });
