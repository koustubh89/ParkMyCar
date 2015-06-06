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
      .when('/registered',            {templateUrl: 'views/main.html',          controller: 'MainCtrl'    })
      .when('/about',                 {templateUrl: 'views/about.html',         controller: 'AboutCtrl'   })
      .when('/suggestions',           {templateUrl: 'views/freeUser.html',      controller: 'freeUserCtrl'})
      .when('/welcome',               {templateUrl: 'views/entryScreen.html',   controller: 'welcomeCtrl' })

      .otherwise({redirectTo: '/welcome'});
  });
