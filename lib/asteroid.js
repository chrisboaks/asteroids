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
    this.craters = [];
    Asteroids.MovingObject.call(this, newOptions);
    this.craterize();

  };

  var Crater = Asteroids.Crater = function (baseRadius) {
    var craterRadius = baseRadius / (Math.random() * 2 + 3);
    var offset = (baseRadius - craterRadius - 15) * Math.random() + 13;

    this.pos = Asteroids.Util.randomVectorOfLength(offset);
    this.radius = craterRadius;
    this.color = Asteroid.randomGray();
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

  Asteroid.prototype.craterize = function () {
    var numCraters = Math.floor(Math.random() * 3 + 3);
    var baseRadius = this.radius;
    for (var i = 0; i < numCraters; i++) {

      this.craters.push(new Crater(baseRadius));
    }
  };

  Asteroid.prototype.draw = function (ctx, translation) {
    var trans = translation || [0, 0]
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(
      this.pos[0] + trans[0],
      this.pos[1] + trans[1],
      this.radius,
      0,
      2 * Math.PI,
      false);

    ctx.fill();
    ctx.stroke();

    this.craters.forEach(function(crater) {

      var coords = Asteroids.Util.transformCoords([crater.pos], this.pos, this.theta)[0];
      ctx.fillStyle = crater.color;
      ctx.strokeStyle = "#555555";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(
        coords[0],
        coords[1],
        crater.radius,
        0,
        2 * Math.PI,
        false);

      ctx.fill();
      ctx.stroke();
    }.bind(this));

  };

})();
