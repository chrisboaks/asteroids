(function () {
  window.Asteroids = window.Asteroids || {};

  var GameView = Asteroids.GameView = function GameView(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.bindKeyHandlers = function () {
    var game = this.game;
    var ship = game.ship;

    $(window).on('keydown', function (event) {
      var keyval = event.which;

      switch(event.which) {
        case 87:  //w
        case 38:  //up arrow
          ship.acceleratingForward = true;
          break;
        case 65:  //a
        case 37:  //left arrow
          ship.turningLeft = true;
          break;
        case 83:  //s
        case 40:  //down arrow
          ship.acceleratingBackward = true;
          break;
        case 68:  //d
        case 39:  //right arrow
          ship.turningRight = true;
          break;
        case 74:  //j
        case 32:  //space
          ship.shooting = true;
          break;
        case 27:  //esc
          game.paused = !game.paused;
          break;
        default:
          console.log(keyval);
      }
    });

    $(window).on('keyup', function (event) {
      var keyval = event.which;

      switch(event.which) {
        case 87:  //w
        case 38:  //up arrow
          ship.acceleratingForward = false;
          break;
        case 65:  //a
        case 37:  //left arrow
          ship.turningLeft = false;
          break;
        case 83:  //s
        case 40:  //down arrow
          ship.acceleratingBackward = false;
          break;
        case 68:  //d
        case 39:  //right arrow
          ship.turningRight = false;
          break;
        case 74:  //j
        case 32:  //space
          ship.shooting = false;
          break;
      }
    });
  };

  GameView.prototype.start = function () {
    var music = new Audio('assets/xi.mp3');
    $(music).bind('ended', function () {
      music.currentTime = 0;
      music.play();
    });
    music.play();

    window.weaponSound = new Audio('assets/bullet2.mp3');
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
