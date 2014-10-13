(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos) {
    Asteroids.MovingObject.call(
      this,
      pos,
      Asteroids.Util.randomVec(Asteroid.VELOCITY),
      Asteroid.COLOR,
      Asteroid.RADIUS
    );
  };

  Asteroid.COLOR = 'gray';
  Asteroid.RADIUS = 20;
  Asteroid.VELOCITY = 20;



  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();