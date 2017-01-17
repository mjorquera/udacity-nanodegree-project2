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
  }]);
