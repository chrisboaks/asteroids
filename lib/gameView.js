(function () {
  window.Asteroids = window.Asteroids || {}

  var GameView = Asteroids.GameView = function GameView(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };


  //add more bindings!
  GameView.prototype.bindKeyHandlers = function () {
    key('w', function () {
      this.game.ship.power(1);
    }.bind(this));

    key('a', function () {
      this.game.ship.turn(-1);
    }.bind(this));

    key('s', function () {
      this.game.ship.power(-Math.sqrt(2)/2);
    }.bind(this));

    key('d', function () {
      this.game.ship.turn(1);
    }.bind(this));

    key('j, space', function () {
      if (!window.weaponSound.paused) {
        window.weaponSound.pause();
        window.weaponSound.currentTime = 0;
      }
      window.weaponSound.play();
      this.game.ship.fireBullet();
    }.bind(this));

    key('esc', function () {
      this.game.paused = !this.game.paused;
    }.bind(this));


  };

  GameView.prototype.start = function () {
    var music = new Audio('assets/xi.mp3');
    $(music).bind('ended', function () {
      music.currentTime = 0;
      music.play();
    });
    music.play();

    window.weaponSound = new Audio('assets/bullet2.mp3')
    window.explosionSound = new Audio('assets/explosion.mp3');
    window.weaponSound.volume = 0.4;
    window.explosionSound.volume = 0.7;

    this.bindKeyHandlers();

    window.setInterval((function () {
      if (!this.game.paused) {
        this.game.draw(this.ctx);
        this.game.step();
      }
    }).bind(this), 15);
  };
})();
