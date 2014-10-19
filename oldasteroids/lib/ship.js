(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (game) {

    Asteroids.MovingObject.call(
      this,
      game.randomPosition(),
      Ship.INIT_VEL,
      Ship.COLOR,
      Ship.RADIUS,
      game
    );
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    var newPos = this.game.randomPosition();
    this.posX = newPos[0];
    this.posY = newPos[1];
    this.velX = 0;
    this.velY = 0;
  };

  Ship.INIT_VEL = [0,0];
  Ship.COLOR = 'green';
  Ship.RADIUS = 5;
  Ship.MAX_V = 15;

  Ship.prototype.power = function (impulse) {
    var possVx = this.velX + impulse[0];
    var possVy = this.velY + impulse[1];
    if (possVx * possVx + possVy * possVy < Ship.MAX_V * Ship.MAX_V) {
      this.velX = possVx;
      this.velY = possVy;
    }
  };

  Ship.prototype.fireBullet = function () {
    bullet = new Asteroids.Bullet([this.posX, this.posY], this.dirNormal(), this.game);
    this.game.addBullet(bullet);
  };

  Ship.prototype.dirNormal = function () {
    velMag = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
    return [this.velX / velMag, this.velY / velMag];
  };


})();