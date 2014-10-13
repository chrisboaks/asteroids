(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = function () { }

  var inherits = Asteroids.Util.inherits = function (descendant, baseClass) {
    function Surrogate () {};
    Surrogate.prototype = baseClass.prototype;
    descendant.prototype = new Surrogate();
  };

  var randomVec = Asteroids.Util.randomVec = function (length) {
    var randomTheta = Math.random() * 2 * Math.PI;
    var velX = Math.cos(randomTheta) * length;
    var velY = Math.sin(randomTheta) * length;
    return [velX, velY];
  };



})();


// Util.inherits = Asteroids.Util.inherits??