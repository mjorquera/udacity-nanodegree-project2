'use strict';

/**
 * @ngdoc service
 * @name publicTransportationApp.stationFinder
 * @description
 * # stationFinder
 * Service in the publicTransportationApp.
 */
angular.module('publicTransportationApp')
  .service('stationFinder', function () {
    var app_id = "03bf8009";
    var app_key = "d9307fd91b0247c607e098d5effedc97";
    var base_url = "https://transportapi.com/v3/uk/train/station/";

    this.getStations = function() {
      return $.get( '/data/stations.json' );
    };

    this.getRouteInfo = function(departure, arrival) {
      var urlRouteInfo = base_url + departure + "/live.json?app_id=" + app_id + "&app_key=" + app_key  + "&calling_at=" + arrival + "&darwin=false&train_status=passenger";
      return $.get( urlRouteInfo );
    };
  });
