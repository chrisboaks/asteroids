(function () {
  window.Asteroids = window.Asteroids || {}

  var Asteroid = Asteroids.Asteroid = function (options) {
    this.sizeClass = options.sizeClass || 3;

    var newOptions = {
      pos: options.pos,
      vel: options.vel || Asteroids.Util.randomVectorOfLength(2),
      color: Asteroid.randomGray(),
      radius: Asteroid.RADII[this.sizeClass - 1],
      game: options.game,
      wrappable: true,
      driftOmega: 0.15
    }

    Asteroids.MovingObject.call(this, newOptions);
  };

  Asteroid.RADII = [40, 50, 60];
  Asteroid.VELOCITIES = [4, 3, 2];

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.randomGray = function () {
    var char = function(){
      return Math.floor(Math.random() * 7) + 60;
    };
    return '#' + char() + char() + char();
  };

  Asteroid.prototype.collideWith = function (otherObj) {
    if (otherObj instanceof Asteroids.Ship) {
      otherObj.relocate();
    } else if (otherObj instanceof Asteroids.Bullet) {
      this.split();
      this.explode(this.pos);
      this.remove();
      otherObj.remove();
    }
  };

  Asteroid.prototype.split = function () {
    if (this.sizeClass > 1) {
      var newSize = this.sizeClass - 1;
      var unitVels = Asteroids.Util.perpendicularUnitVels(this.vel);
      var vel1 = Asteroids.Util.scalarMultiply(unitVels[0], Asteroid.VELOCITIES[newSize]);
      var vel2 = Asteroids.Util.scalarMultiply(unitVels[1], Asteroid.VELOCITIES[newSize]);

      var opts1 = {
        sizeClass: newSize,
        pos: this.pos,
        vel: vel1,
        color: Asteroid.randomGray(),
        game: window.game,
        wrappable: true,
        driftOmega: 0.15
      };

      var opts2 = {
        sizeClass: newSize,
        vel: vel2,
        pos: this.pos,
        color: Asteroid.randomGray(),
        game: window.game,
        wrappable: true,
        driftOmega: 0.15
      };

      window.game.asteroids.push(new Asteroid(opts1));
      window.game.asteroids.push(new Asteroid(opts2));
    }
  };

  Asteroid.prototype.remove = function () {
    var i = this.game.asteroids.indexOf(this);
    this.game.asteroids.splice(i, 1);
  };

  Asteroid.prototype.explode = function (pos) {
    Asteroids.Explosion.explode(pos);
  };


})();
