'use strict';

/**
 * @ngdoc service
 * @name publicTransportationApp.stationFinder
 * @description
 * # stationFinder
 * Service in the publicTransportationApp.
 */
angular.module('publicTransportationApp')
  .service('stationFinder',['$indexedDB', function ($indexedDB) {
    var app_id = "03bf8009";
    var app_key = "d9307fd91b0247c607e098d5effedc97";
    var base_url = "https://transportapi.com/v3/uk/train/station/";

    this.getCachedStations = function(){
      return $indexedDB.openStore('stations', function(store){
         return store.getAll();
      });
    };

    this.getStations = function() {
      return $.get( '/data/stations.json' );
    };

    this.getRouteInfo = function(departure, arrival) {
      var urlRouteInfo = base_url + departure + "/live.json?app_id=" + app_id + "&app_key=" + app_key;
      if (typeof arrival !== "undefined" && arrival !== null) {
        urlRouteInfo += "&calling_at=" + arrival;
      }
      urlRouteInfo += "&darwin=false&train_status=passenger";

      return $.get( urlRouteInfo );
    };

    this.saveTrainCache = function(train_data){
      return $indexedDB.openStore('trains', function(store){
          store.find(train_data.station_code).then(function(result){
            if (result){
              store.delete(train_data.station_code);
            }
            return store.insert(train_data);
          }).catch(function(){
            return store.insert(train_data);
          });
        });
    };

  }]);
