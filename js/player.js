game.player = {
  x: 54,
  y: 0,
  height: 24,
  highestY: 0,
  direction: "default",
  isInAir: false,
  startedJump: false,
  doubleJump: false,
  jumpInterrupted: false,
  jumpCount: 0,
  moveInterval: null,
  fallTimeout: function (startingY, time, maxHeight) {
    setTimeout(
      function () {
        if (this.isInAir && !this.jumpInterrupted) {
          this.y = startingY - maxHeight + Math.pow(-time / 3 + 11, 2);
          if (this.y < this.highestY) {
            this.highestY = this.y;
          }
          if (time > 37) {
            this.startedJump = false;
            game.checkCollisions();
            if (game.checkCollisions()) {
              this.isInAir = false;
              this.doubleJump = false;
              this.jumpCount = 0;
            }
          }
          if (time < 500) {
            time++;
            this.fallTimeout(startingY, time, maxHeight);
          }
          if (this.y > 40) {
            game.isOver = true;
          }
          game.requestRedraw();
        }
      }.bind(this, startingY, time, maxHeight),
      12
    );
  },
  animationFrameNumber: 0,
  collidesWithGround: true,
  animations: {
    // Describe coordinates of consecutive animation frames of objects in textures
    left: [
      { tileColumn: 4, tileRow: 0 },
      { tileColumn: 5, tileRow: 0 },
      { tileColumn: 4, tileRow: 0 },
      { tileColumn: 6, tileRow: 0 },
    ],
    right: [
      { tileColumn: 9, tileRow: 0 },
      { tileColumn: 8, tileRow: 0 },
      { tileColumn: 9, tileRow: 0 },
      { tileColumn: 7, tileRow: 0 },
    ],
  },
  animations2: {
    sliceWidth: 83,
    sliceHeight: 87.5,
    frameX: 0,
    frameY: 0,
    left: [
      { Y: 1, X: 0 },
      { Y: 1, X: 1 },
      { Y: 1, X: 2 },
      { Y: 1, X: 3 },
      { Y: 1, X: 4 },
      { Y: 1, X: 5 },
      { Y: 1, X: 6 },
      { Y: 1, X: 7 },
      { Y: 1, X: 8 },
      { Y: 1, X: 9 },
    ],
    right: [
      { Y: 3, X: 0 },
      { Y: 3, X: 1 },
      { Y: 3, X: 2 },
      { Y: 3, X: 3 },
      { Y: 3, X: 4 },
      { Y: 3, X: 5 },
      { Y: 3, X: 6 },
      { Y: 3, X: 7 },
      { Y: 3, X: 8 },
      { Y: 3, X: 9 },
    ],
    default: [{ Y: 0, X: 0 }],
  },

  jump: function (type) {
    if (!this.isInAir) {
      clearInterval(this.fallInterval);
      this.jumpInterrupted = false;
      game.sounds.jump.play();
      this.isInAir = true;
      this.startedJump = true;
      var startingY = this.y;
      this.doubleJump = true;
      this.jumpCount = 1;
      var time = 1;
      maxHeight = 121;
      if (type == "fall") {
        time = 30;
        maxHeight = 0;
      }
      this.fallTimeout(startingY, time, maxHeight);
    } else if (this.isInAir && this.doubleJump && this.jumpCount < 2) {
      clearInterval(this.fallInterval);
      game.sounds.jump.play();
      this.jumpInterrupted = true;

      setTimeout(() => {
        this.jumpInterrupted = false;
        this.jumpCount++;

        var maxHeight = 70;
        var startingY = this.y - maxHeight;
        var time = 1;

        this.fallTimeout(startingY, time, maxHeight);
      }, 12);
    }
  },
};
