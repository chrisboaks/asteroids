(function () {
  window.Asteroids = window.Asteroids || {}

  var Asteroid = Asteroids.Asteroid = function (options) {

    var newOptions = {
      pos: options.pos,
      vel: Asteroids.Util.randomVectorOfLength(Asteroid.VELOCITY),
      color: Asteroid.brownGenerator(), //Asteroid.randomColor(),
      radius: Asteroid.RADIUS,
      game: options.game,
      wrappable: true
    }

    Asteroids.MovingObject.call(this, newOptions);
  };

  Asteroid.RADIUS = 60;
  Asteroid.VELOCITY = 4;
  Asteroid.COLORS = '3456789abc';

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.randomColor = function () {
    var char = Asteroid.COLORS[Math.floor(Math.random() * Asteroid.COLORS.length)];
    return '#' + char + char + char;
  };

  Asteroid.brownGenerator = function () {
    var g = Math.floor(Math.random() * 30) + 40;
    var r = 2 * g;
    return 'rgb(' + [r, g, 0].join(',') + ')';
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