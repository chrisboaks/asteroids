(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (pos, dirNormal, game) {
    Asteroids.MovingObject.call(
      this,
      pos,
      [dirNormal[0] * Bullet.VELOCITY, dirNormal[1] * Bullet.VELOCITY],
      Bullet.COLOR,
      Bullet.RADIUS,
      game
    );
  };

  Bullet.VELOCITY = 10;
  Bullet.COLOR = 'black';
  Bullet.RADIUS = 2;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObj) {
    if (otherObj instanceof Asteroids.Asteroid) {
      this.game.removeAsteroid(otherObj);
      this.game.removeBullet(this);
    }
  };

})();