(function () {
  window.Asteroids = window.Asteroids || {};

  var Util = Asteroids.Util = function () {};

  var inherits = Asteroids.Util.inherits = function (childClass, parentClass) {
    function Surrogate () {}
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
  };

  var randomUnitVector = Asteroids.Util.randomUnitVector = function() {
    var randomTheta = Math.random() * 2 * Math.PI;
    var x = Math.cos(randomTheta);
    var y = Math.sin(randomTheta);
    return [x, y];
  };

  var randomVectorOfLength = Asteroids.Util.randomVectorOfLength = function(length) {
    var unitVector = Util.randomUnitVector();
    var x = unitVector[0];
    var y = unitVector[1];
    return [x * length, y * length];
  };

  var magnitude = Asteroids.Util.magnitude = function(vec1, vec2) {
    dx = vec1[0] - vec2[0];
    dy = vec1[1] - vec2[1];
    return Math.sqrt(dx * dx + dy * dy);
  };

  var normalize = Asteroids.Util.normalize = function (vec) {
    var thisLength = Util.magnitude([0, 0], vec);
    return [vec[0] / thisLength, vec[1] / thisLength];
  };

  var getTheta = Asteroids.Util.getTheta = function (vec) {
    return Math.atan(vec[1] / vec[0]);
  };

  var unitize = Asteroids.Util.unitize = function (angle) {
    return [Math.cos(angle), Math.sin(angle)];
  };

  var transformCoords = Asteroids.Util.transformCoords = function (coords, pos, theta) {
    var results = [];
    var ship = this;
    var sin = Math.sin(theta);
    var cos = Math.cos(theta);
    coords.forEach(function (crd) {
      var x = crd[0] * cos - crd[1] * sin + pos[0];
      var y = crd[0] * sin + crd[1] * cos + pos[1];
      results.push([x, y]);
    });
    return results;
  };

  var perpendicularUnitVels = Asteroids.Util.perpendicularUnitVels = function (vel) {
    var theta = getTheta(vel);
    return [unitize(theta + Math.PI / 2), unitize(theta - Math.PI / 2)];
  };

  var scalarMultiply = Asteroids.Util.scalarMultiply = function (vector, scalar) {
    var x = vector[0];
    var y = vector[1];
    return [x * scalar, y * scalar];
  };

})();
