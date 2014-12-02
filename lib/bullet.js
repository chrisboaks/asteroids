(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (pos, dirNormal, game) {

    var bulletOptions = {
      pos: pos,
      vel: Asteroids.Util.scalarMultiply (dirNormal, Bullet.VELOCITY),
      color: Bullet.COLOR,
      radius: Bullet.RADIUS,
      game: game,
      wrappable: false,
    };
    Asteroids.MovingObject.call(this, bulletOptions);
  };

  Bullet.VELOCITY = 10;
  Bullet.COLOR = 'red';
  Bullet.RADIUS = 3;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.remove = function () {
    var i = this.game.bullets.indexOf(this);
    this.game.bullets.splice(i, 1);
  };

})();
