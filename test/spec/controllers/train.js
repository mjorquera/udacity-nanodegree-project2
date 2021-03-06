'use strict';

describe('Controller: TrainCtrl', function () {

  // load the controller's module
  beforeEach(module('publicTransportationApp'));

  var TrainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrainCtrl = $controller('TrainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TrainCtrl.awesomeThings.length).toBe(3);
  });
});
