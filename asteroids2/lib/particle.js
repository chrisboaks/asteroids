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
    this.green = 0;
  };

  Particle.COLOR = 'red';
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

  Particle.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    if (this.green < 251) {
      this.green += 4;
    }
    this.color = "#FF" + this.toHex(this.green) + "00";
  };

  Particle.prototype.toHex = function(val) {
    var hex = val.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

})();
