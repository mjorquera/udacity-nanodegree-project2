'use strict';

/**
 * @ngdoc function
 * @name publicTransportationApp.controller:TrainCtrl
 * @description
 * # TrainCtrl
 * Controller of the publicTransportationApp
 */
angular.module('publicTransportationApp')
  .controller('TrainCtrl', ['stationFinder','$indexedDB', function (station, $indexedDB) {
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
      if(vm.departure_id !== null)
      {
          var marker = vm.markers.filter(function ( obj ) {
            return obj.id === vm.departure_id;
          })[0];
          
        if(typeof marker !== "undefined"){
          marker.focus = true;
        };

        vm.departure = vm.departure_stations.filter(function ( obj ) {
              return obj.station_code === vm.departure_id;
          })[0];
      };

      if (vm.departure_id !== null && vm.arrival_id !== vm.departure_id) {
        vm.routeInfo = null;

        $indexedDB.openStore('trains',function(store){
          store.find(vm.departure_id).then(function(result){
              if(result){
                console.log('Cached Data: ' + result)
                vm.routeInfo = result;
                vm.offline = true;
              }               
              return station.getRouteInfo(vm.departure_id, vm.arrival_id);
          }).catch(function(){
            return station.getRouteInfo(vm.departure_id, vm.arrival_id);
          }).then(function(onlineData){
              if(onlineData){
                console.log('New data avaliable: ' + onlineData);
                vm.routeInfo = onlineData;
                vm.offline = false;
                station.saveTrainCache(onlineData);
              };
          }).catch(function(){
            console.log("Cannot retrieve online data.");
          });
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
        vm.routeInfo = null;
        station.getRouteInfo(vm.departure_id, vm.arrival_id).then(function(data){
          console.log(data);
          vm.routeInfo = data;
        });
      };
    };

    var updateStations = function(data){
      vm.stations = data;
      var stations_markers = [];
      vm.departure_stations = data;
      vm.arrival_stations = data;

      $.each(data, function (key, value) {
        //Insert on indexeddb
        $indexedDB.openStore('stations',function(store){
          store.findBy('code_idx',value.station_code).then(function(result){
            if(!result){
              store.upsert(value).catch(function(e){
                console.log(e);
              });
            }
          });

        });

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

      vm.markers = stations_markers;
    };

    station.getCachedStations().then(function(data){
      updateStations(data);
      return station.getStations();
    }).then(function(data){
      updateStations(data);
    });

  }]);
