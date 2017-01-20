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
  .module('publicTransportationApp', ['ui.router','leaflet-directive','picardy.fontawesome','indexedDB'])
  .config(['$stateProvider', '$urlRouterProvider','$indexedDBProvider', function($stateProvider, $urlRouterProvider, $indexedDBProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/train.html',
        controller: 'TrainCtrl as train'
      });

    $indexedDBProvider
      .connection('station-app')
      .upgradeDatabase(1, function(event, db, tx){
        console.log(db);
        var objStore = db.createObjectStore('stations', {autoIncrement: true});
        objStore.createIndex('code_idx', 'station_code', {unique: true});

        db.createObjectStore('trains', {keyPath: 'station_code'});

      });
  }])
  .run(['$rootScope', function($rootScope){
    //register of serviceWorker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(function(reg) {
        $rootScope.installing = false;
        $rootScope.waiting = false;
        $rootScope.active = false;

        if(reg.installing) {
          $rootScope.installing = true;
          console.log('Service worker installing');
        } else if(reg.waiting) {
          $rootScope.waiting = true;
          console.log('Service worker installed');
        } else if(reg.active) {
          $rootScope.active = true;
          console.log('Service worker active');
        }

        $rootScope.updateWorker = function(){
          console.log(reg.waiting);
          reg.waiting.postMessage({action: 'skipWaiting'});
        }
        
      }).catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + error);
      });

      navigator.serviceWorker.addEventListener('controllerchange', function(){
        window.location.reload();
      });
    }

  }]);
