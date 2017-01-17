'use strict';

describe('Service: stationFinder', function () {

  // load the service's module
  beforeEach(module('publicTransportationApp'));

  // instantiate service
  var stationFinder;
  beforeEach(inject(function (_stationFinder_) {
    stationFinder = _stationFinder_;
  }));

  it('should do something', function () {
    expect(!!stationFinder).toBe(true);
  });

});
