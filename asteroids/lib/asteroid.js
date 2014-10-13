(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    Asteroids.MovingObject.call(
      this,
      pos,
      Asteroids.Util.randomVec(Asteroid.VELOCITY),
      Asteroid.COLOR,
      Asteroid.RADIUS,
      game
    );
  };

  Asteroid.COLOR = 'gray';
  Asteroid.RADIUS = 20;
  Asteroid.VELOCITY = 5;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObj) {
    if (otherObj instanceof Asteroids.Ship) {
      otherObj.relocate();
    } else if (otherObj instanceof Asteroids.Bullet) {
      this.game.removeAsteroid(this);
      this.game.removeBullet(otherObj);
    }
  };

})();