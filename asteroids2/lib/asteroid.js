(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {

    var newOptions = {
      pos: options.pos,
      vel: Asteroids.Util.randomVectorOfLength(Asteroid.VELOCITY),
      color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      game: options.game
    }

    Asteroids.MovingObject.call(this, newOptions);

    this.wrappable = true;

  };

  Asteroid.COLOR = 'gray';
  Asteroid.RADIUS = 20;
  Asteroid.VELOCITY = 5;
  Asteroid.prototype.wrappable = true;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  // Asteroid.prototype.collideWith = function (otherObj) {
//     if (otherObj instanceof Asteroids.Ship) {
//       otherObj.relocate();
//     } else if (otherObj instanceof Asteroids.Bullet) {
//       this.game.removeAsteroid(this);
//       this.game.removeBullet(otherObj);
//     }
//   };

})();