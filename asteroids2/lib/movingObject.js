(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.color = options.color;
    this.radius = options.radius;
    this.game = options.game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false);

      ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var dist = Asteroids.Util.distance(this.pos, otherObject.pos);
    var maxDist = this.radius + otherObject.radius;
    return (dist <= maxDist);
  };



  // incorrectly deals with non-vecs and wrapping
  MovingObject.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
    // var possPos = this.game.wrap([this.posX += this.velX, this.posY += this.velY]);
    // if (this instanceof Asteroids.Bullet) {
//       this.posX += this.velX;
//       this.posY += this.velY;
//     } else {
//       this.posX = possPos[0];
//       this.posY = possPos[1];
//     }
  };


})();