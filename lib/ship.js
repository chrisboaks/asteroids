(function () {
  window.Asteroids = window.Asteroids || {}

  var Ship = Asteroids.Ship = function (options) {

    var newOptions = {
      pos: options.game.canvasMidpoint(),
      vel: [0,0],
      color: Ship.COLOR,
      radius: Ship.RADIUS,
      game: options.game,
      wrappable: true
    }

    Asteroids.MovingObject.call(this, newOptions);
    this.turningLeft = false;
    this.turningRight = false;
    this.acceleratingForward = false;
    this.acceleratingBackward = false;
    this.shooting = false;
    this.reloading = false;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.COLOR = '#25307D';
  Ship.RADIUS = 20;
  Ship.MAX_V = 12;
  Ship.IMPULSE = 0.5;
  Ship.OMEGA = 0.07;
  Ship.RELOAD = 130;

  // Drawing constants //
  Ship.SPREAD = Math.PI / 4;
  Ship.SPREAD_X = Math.sin(Ship.SPREAD);
  Ship.SPREAD_Y = Math.cos(Ship.SPREAD);
  Ship.P1 = [0, -Ship.RADIUS];
  Ship.P2 = [-Ship.SPREAD_X * Ship.RADIUS, Ship.SPREAD_Y * Ship.RADIUS];
  Ship.P3 = [0, Ship.RADIUS / 3];
  Ship.P4 = [Ship.SPREAD_X * Ship.RADIUS, Ship.SPREAD_Y * Ship.RADIUS];
  Ship.COORDS = [Ship.P1, Ship.P2, Ship.P3, Ship.P4];

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    var direction = this.direction()

    var possVx = this.vel[0] + direction[0] * Ship.IMPULSE * impulse;
    var possVy = this.vel[1] + direction[1] * Ship.IMPULSE * impulse;

    if (Asteroids.Util.magnitude([0,0], [possVx, possVy]) < Ship.MAX_V ) {
      this.vel = [possVx, possVy];
    }
  };

  Ship.prototype.direction = function () {
    return Asteroids.Util.unitize(this.theta + Math.PI * 3 / 2);
  };

  Ship.prototype.draw = function(ctx, translation) {
    var trans = translation || [0,0];
    var coords = Asteroids.Util.transformCoords(Ship.COORDS, [this.pos[0] + trans[0], this.pos[1] + trans[1]], this.theta)

    ctx.fillStyle = Ship.COLOR;
    ctx.strokeStyle = '#257D28';

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(coords[0][0], coords[0][1]);
    ctx.lineTo(coords[1][0], coords[1][1]);
    ctx.lineTo(coords[2][0], coords[2][1]);
    ctx.lineTo(coords[3][0], coords[3][1]);
    ctx.lineTo(coords[0][0], coords[0][1]);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(coords[0][0], coords[0][1]);
    ctx.lineTo(coords[2][0], coords[2][1]);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'red';
    ctx.fillRect(coords[0][0] - 1, coords[0][1] -1 , 3, 3);

  };

  Ship.prototype.turn = function (dir) {
    this.theta += dir * Ship.OMEGA;
  };

  Ship.prototype.fireBullet = function () {
    if (!window.weaponSound.paused) {
      window.weaponSound.pause();
      window.weaponSound.currentTime = 0;
    }
    window.weaponSound.play();
    bullet = new Asteroids.Bullet(this.pos, this.direction(), this.game);
    this.game.addBullet(bullet);
    this.reloading = true;
    setTimeout(function () {
      this.reloading = false;
    }.bind(this), Ship.RELOAD)
  };

  Ship.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if (this.turningLeft) {
      this.theta -= Ship.OMEGA;
    }

    if (this.turningRight) {
      this.theta += Ship.OMEGA;
    }

    if (this.acceleratingForward) {
      this.power(1);
    }

    if (this.acceleratingBackward) {
      this.power(-Math.sqrt(2)/2);
    }

    if (this.shooting && !this.reloading) {
      this.fireBullet();
    }

  };

})();
