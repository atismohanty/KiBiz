'use strict';

/**
 * @ngdoc overview
 * @name kibizApp
 * @description
 * # kibizApp
 *
 * Main module of the application.
 */
angular
  .module('kibizApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs:'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/',
        controller: 'MainCtrl',
        controllerAs:'main'
      })
  });
