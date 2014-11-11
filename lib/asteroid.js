(function () {
  window.Asteroids = window.Asteroids || {}

  var Asteroid = Asteroids.Asteroid = function (options) {

    var newOptions = {
      pos: options.pos,
      vel: options.vel || Asteroids.Util.randomVectorOfLength(Asteroid.VELOCITY),
      color: Asteroid.randomGray(), //Asteroid.brownGenerator(),
      radius: Asteroid.RADIUS,
      game: options.game,
      wrappable: true,
      driftOmega: 0.15
    }

    Asteroids.MovingObject.call(this, newOptions);
  };

  Asteroid.RADIUS = 60;
  Asteroid.VELOCITY = 2;

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
    var vels = Asteroids.Util.perpendicularUnitVels(this.vel);
    var opts1 = {
      pos: this.pos,
      vel: vels[0],
      color: Asteroid.randomGray(),
      radius: Asteroid.RADIUS,
      game: window.game,
      wrappable: true,
      driftOmega: 0.15
    };
    var opts2 = {
      pos: this.pos,
      vel: vels[1],
      color: Asteroid.randomGray(),
      radius: Asteroid.RADIUS,
      game: window.game,
      wrappable: true,
      driftOmega: 0.15
    };
    window.game.asteroids.push(new Asteroid(opts1));
    window.game.asteroids.push(new Asteroid(opts2));

  };

  Asteroid.prototype.remove = function () {
    var i = this.game.asteroids.indexOf(this);
    this.game.asteroids.splice(i, 1);
  };

  Asteroid.prototype.explode = function (pos) {
    Asteroids.Explosion.explode(pos);
  };

})();
