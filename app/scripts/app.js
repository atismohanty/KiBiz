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
    'ngTouch',
    'LocalStorageModule'
  ]) 
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs:'main',
        caseInsensitiveMatch:true
      })
      .when('/about', {
       
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
        caseInsensitiveMatch:true
       
      })
      .when('/contacts', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact',
        caseInsensitiveMatch:true
      })
      .otherwise({
        redirectTo: '/',
        controller: 'MainCtrl',
        controllerAs:'main',
        caseInsensitiveMatch:true
      })

    })

      .config(function(localStorageServiceProvider)
      {
      localStorageServiceProvider
      .setPrefix('kibizApp')
      .setStorageType('localStorage')
      .setNotify(true,true)
      
      });
