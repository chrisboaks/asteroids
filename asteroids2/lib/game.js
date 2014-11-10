(function () {
  window.Asteroids = window.Asteroids || {}

  var Game = Asteroids.Game = function() {
    this.asteroids = this.addDebris(Asteroids.Asteroid, Game.NUM_ASTEROIDS);
    this.bgstars = this.addDebris(Asteroids.BGStar, Game.NUM_BGSTARS);
    this.bullets = [];
    this.ship = new Asteroids.Ship({game: this});

  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 800;
  Game.NUM_ASTEROIDS = 4;
  Game.NUM_BGSTARS = 20;



  //  ANIMATION //

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkAsteroidCollisions(this.bullets);
    this.checkAsteroidCollisions([this.ship]);
  };

  Game.prototype.moveObjects = function () {
    var game = this;
    this.allObjects().forEach(function (obj) {
      obj.move();
      if (game.isOutOfBounds(obj.pos) && obj.wrappable) {
        game.wrap(obj);
      }
    });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    var game = this;
    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
      if (game.isNearEdge(obj)) {
        game.drawFourMore(obj, ctx);
      }
    });
    // var bulletsToRemove = []
    // this.allObjects().forEach(function (obj) {
    //   if (obj instanceof Asteroids.Bullet && Game.isOutOfBounds([obj.posX, obj.posY])) {
    //     bulletsToRemove.push(obj);
    //   } else {
    //     obj.draw(ctx);
    //   }
    // });
    // if (bulletsToRemove.length > 0) {
    //   game.removeBullets(bulletsToRemove)
    // };
  };

  Game.prototype.drawFourMore = function (obj, ctx) {
    obj.draw(ctx, [-Game.DIM_X, 0]);
    obj.draw(ctx, [Game.DIM_X, 0]);
    obj.draw(ctx, [0, Game.DIM_Y]);
    obj.draw(ctx, [0, -Game.DIM_Y]);
  };


  //  UTILITY  //

  Game.prototype.allObjects = function () {
    return this.bgstars.concat(this.asteroids).concat(this.ship).concat(this.bullets);
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * Game.DIM_X;
    var y = Math.random() * Game.DIM_Y;
    return [x, y];
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] <= 0 || pos[1] <= 0 || pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y);
  };

  Game.prototype.wrap = function (obj) {
    var x = ((obj.pos[0] % Game.DIM_X) + Game.DIM_X) % Game.DIM_X;
    var y = ((obj.pos[1] % Game.DIM_Y) + Game.DIM_Y) % Game.DIM_Y;
    obj.pos = [x, y];
  };

  Game.prototype.canvasMidpoint = function () {
    return [Game.DIM_X / 2, Game.DIM_Y / 2];
  };

  Game.prototype.isNearEdge = function (obj) {
    if (obj.wrappable && obj.radius > 5) {
      return (obj.pos[0] < obj.radius || obj.pos[0] > Game.DIM_X - obj.radius ||
              obj.pos[1] < obj.radius || obj.pos[1] > Game.DIM_Y - obj.radius);
    }
    return false;
  };


  //  SETUP  //

  Game.prototype.addDebris = function (objType, quantity) {
    var result = [];
    for (var i = 0; i < quantity; i++) {
      result.push(new objType({pos: this.randomPosition(), game: this}));
    };
    return result;
  };

  Game.prototype.checkAsteroidCollisions = function (ary) {
    for (var i = 0; i < this.asteroids.length; i++) {
      for (var j = 0; j < ary.length; j++) {
        if (this.asteroids[i].isCollidedWith(ary[j])) {
          this.asteroids[i].collideWith(ary[j]);
        }
      }
    }
  };


//
//   Game.prototype.checkCollisions = function () {
//     var allObjects = this.allObjects();
//     var numObjects = allObjects.length;
//     for (var i = 0; i < numObjects - 1; i++) {
//       for (var j = i + 1; j < numObjects; j++) {
//         if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
//           this.allObjects()[i].collideWith(this.allObjects()[j]);
//         }
//       }
//     };
//   };



  Game.prototype.removeAsteroid = function (asteroid) {
    var i = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(i, 1);
  };

  Game.prototype.removeBullet = function (bullet) {
    var i = this.bullets.indexOf(bullet);
    this.bullets.splice(i, 1);
  };
//
//   Game.prototype.allObjects = function () {
//     return this.asteroids.concat([this.ship]).concat(this.bullets);
//   };
//
  Game.prototype.addBullet = function (bullet) {
    this.bullets.push(bullet);
  };
//
//   Game.prototype.removeBullets = function (bulletsToRemove) {
//     var that = this;
//     bulletsToRemove.forEach(function (bullet) {
  //     var i = that.bullets.indexOf(bullet);
  //     that.bullets.splice(i, 1);
  //   });
  // };
  //


})();
