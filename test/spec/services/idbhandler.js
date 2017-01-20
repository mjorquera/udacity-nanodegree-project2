'use strict';

describe('Service: idbHandler', function () {

  // load the service's module
  beforeEach(module('publicTransportationApp'));

  // instantiate service
  var idbHandler;
  beforeEach(inject(function (_idbHandler_) {
    idbHandler = _idbHandler_;
  }));

  it('should do something', function () {
    expect(!!idbHandler).toBe(true);
  });

});
