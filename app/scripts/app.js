'use strict';

/**
 * @ngdoc overview
 * @name publicTransportationApp
 * @description
 * # publicTransportationApp
 *
 * Main module of the application.
 */
angular
  .module('publicTransportationApp', ['ui.router','leaflet-directive','picardy.fontawesome'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/train.html',
        controller: 'TrainCtrl as train'
      });
  }])
  .run(function(){
    //register of serviceWorker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(function(reg) {
        
        if(reg.installing) {
          console.log('Service worker installing');
        } else if(reg.waiting) {
          console.log('Service worker installed');
        } else if(reg.active) {
          console.log('Service worker active');
        }
        
      }).catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + error);
      });
    }

  });
