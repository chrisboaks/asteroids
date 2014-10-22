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

  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.COLOR = 'rgb(0,128,0)';
  Ship.RADIUS = 20;
  Ship.MAX_V = 12;
  Ship.IMPULSE = 2;
  Ship.OMEGA = 0.15;

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
    var direction = Asteroids.Util.unitize(this.theta + Math.PI * 3 / 2); //correction for theta

    var possVx = this.vel[0] + direction[0] * Ship.IMPULSE * impulse;
    var possVy = this.vel[1] + direction[1] * Ship.IMPULSE * impulse;

    if (Asteroids.Util.magnitude([0,0], [possVx, possVy]) < Ship.MAX_V ) {
      this.vel = [possVx, possVy];
    }
  };

  Ship.prototype.draw = function(ctx) {

    var coords = Asteroids.Util.transformCoords(Ship.COORDS, this.pos, this.theta)

    ctx.fillStyle = Ship.COLOR;
    ctx.strokeStyle = '#ccddff';

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

  //
  // Ship.prototype.fireBullet = function () {
  //   bullet = new Asteroids.Bullet([this.posX, this.posY], this.dirNormal(), this.game);
  //   this.game.addBullet(bullet);
  // };



})();