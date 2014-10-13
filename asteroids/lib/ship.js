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

})();