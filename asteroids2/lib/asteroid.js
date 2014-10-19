(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {

    var newOptions = {
      pos: options.pos,
      vel: Asteroids.Util.randomVectorOfLength(Asteroid.VELOCITY),
      color: Asteroid.randomColor(),
      radius: Asteroid.RADIUS,
      game: options.game,
      wrappable: true
    }

    Asteroids.MovingObject.call(this, newOptions);

  };

  Asteroid.COLOR = 'gray';
  Asteroid.RADIUS = 20;
  Asteroid.VELOCITY = 5;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLORS = '3456789abc';

  Asteroid.randomColor = function () {
    var char = Asteroid.COLORS[Math.floor(Math.random() * Asteroid.COLORS.length)];
    return '#' + char + char + char;
  }

  // Asteroid.prototype.collideWith = function (otherObj) {
//     if (otherObj instanceof Asteroids.Ship) {
//       otherObj.relocate();
//     } else if (otherObj instanceof Asteroids.Bullet) {
//       this.game.removeAsteroid(this);
//       this.game.removeBullet(otherObj);
//     }
//   };

})();