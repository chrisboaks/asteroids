(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Explosion = Asteroids.Explosion = function () {};

  var explode = Asteroids.Explosion.explode = function (pos) {
    for (var i = 0; i < 1000; i++) {
      particle = new Asteroids.Particle(pos);
      window.game.particles.push(particle);
    }
  };

})();
