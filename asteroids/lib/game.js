(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.asteroids = this.addAsteroids();
    this.ship = new Asteroids.Ship(this);
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 4;

  Game.prototype.addAsteroids = function () {
    var result = [];
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      result.push(new Asteroids.Asteroid(this.randomPosition(), this));
    };
    return result;
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * Game.DIM_X;
    var y = Math.random() * Game.DIM_Y;
    return [x, y];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (obj) {
      obj.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var x = pos[0] % Game.DIM_X;
    var y = pos[1] % Game.DIM_Y;
    if (x < 0) {
      x += Game.DIM_X;
    }
    if (y < 0) {
      y += Game.DIM_Y
    }
    return [x, y]
  };

  Game.prototype.checkCollisions = function () {
    var allObjects = this.allObjects();
    var numObjects = allObjects.length;
    for (var i = 0; i < numObjects - 1; i++) {
      for (var j = i + 1; j < numObjects; j++) {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    };
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid) {
    var i = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(i, 1);
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]);
  };


})();