(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Particle = Asteroids.Particle = function (pos) {
    var particleOptions = {
      pos: pos,
      vel: this.particleVelocity(),
      color: Particle.COLOR,
      radius: Particle.RADIUS,
      game: window.game,
      wrappable: false,
    }
    Asteroids.MovingObject.call(this, particleOptions);
  };

  Particle.COLOR = 'yellow';
  Particle.RADIUS = 2;

  Asteroids.Util.inherits(Particle, Asteroids.MovingObject);

  Particle.prototype.particleVelocity = function () {
    var randomTheta = Math.random() * 1/2 * Math.PI;
    var speed = 8 + 2* Math.sin(randomTheta);
    return Asteroids.Util.randomVectorOfLength(speed);
  };

  Particle.prototype.remove = function () {
    var i = this.game.particles.indexOf(this);
    this.game.particles.splice(i, 1);
  };

})();
