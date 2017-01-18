'use strict';

/**
 * @ngdoc function
 * @name publicTransportationApp.controller:TrainCtrl
 * @description
 * # TrainCtrl
 * Controller of the publicTransportationApp
 */
angular.module('publicTransportationApp')
  .controller('TrainCtrl', ['stationFinder', function (station) {
    var vm = this;

    vm.mapcenter = {
      lat: 51.498395,
      lng: -0.120857,
      zoom: 11
    };

    vm.getStatusClass = function(status){
      switch (status) {
        case "LATE":
          return "label-danger";
          break;
        case "ON TIME":
          return "label-success";
          break;
        case "STARTS HERE":
          return "label-primary";
          break;
        case "EARLY":
          return "label-success";
          break;
        default:
          return "label-default";
          break;
      }
    };

    vm.selectDeparture = function(){
      console.log(vm.departure);
      var marker = vm.markers.filter(function ( obj ) {
            return obj.id === vm.departure_id;
        })[0];
        
      if(typeof marker !== "undefined"){
        marker.focus = true;
      };

      vm.departure = vm.departure_stations.filter(function ( obj ) {
            return obj.station_code === vm.departure_id;
        })[0];
      
      if (vm.departure_id !== null && vm.arrival_id !== vm.departure_id) {
        station.getRouteInfo(vm.departure_id, vm.arrival_id).then(function(data){
          console.log(data);
          vm.routeInfo = data;
        });
      };
    };

    vm.selectArrival = function(){
      var marker = vm.markers.filter(function ( obj ) {
            return obj.id === vm.arrival_id;
        })[0];
        
      if(typeof marker !== "undefined"){
        marker.focus = true;
      };

      vm.arrival = vm.arrival_stations.filter(function ( obj ) {
            return obj.station_code === vm.arrival_id;
        })[0];
      
      if (vm.arrival_id !== null && vm.departure_id !== null && vm.arrival_id !== vm.departure_id) {
        station.getRouteInfo(vm.departure_id, vm.arrival_id).then(function(data){
          console.log(data);
          vm.routeInfo = data;
        });
      };
    };

    station.getStations().then(function(data){
      vm.stations = data;
      var stations_markers = [];
      vm.departure_stations = data;
      vm.arrival_stations = data;

      $.each(data, function (key, value) {
        var marker = {
          id: value.station_code,
          lat: value.latitude,
          lng: value.longitude,
          message: value.name + ". Code: " + value.station_code,
          draggable: false,
          focus: false
        };

        if (key == 0 ) { marker.focus = true; }
        stations_markers.push(marker);
      });

      angular.extend(vm,{
        markers: stations_markers
          });
    });
  }]);
