// The spaghetti code masterpiece
var game = {
  canvas: document.getElementById("canvas"),
  context: this.canvas.getContext("2d", { alpha: false }),
  counter: document.getElementById("counter"),
  textures: new Image(),
  ninja: new Image(),
  knife: new Image(),
  fire: new Image(),
  fireKnife: new Image(),
  drawPending: false,
  backgrounds: {
    sky: {
      image: new Image(),
      loaded: false,
    },
    trees: {
      image: new Image(),
      loaded: false,
    },
  },
  sounds: {
    jump: new Audio("sounds/jump.wav"),
  },
  options: {
    texturesPath: "textures.png",
    ninjaPath: "ninja.png",
    knifePath: "knife.png",
    firePath: "fire.png",
    fireKnifePath: "fire-knife.png",
    tileWidth: 24,
    tileHeight: 24,
    canvasWidth: window.innerWidth / 3,
    canvasHeight: window.innerHeight / 3,
  },
  pressedKeys: {},
  init: function (onInit) {
    this.canvas.width = this.options.canvasWidth;
    this.canvas.height = this.options.canvasHeight;
    this.context.imageSmoothingEnabled = false;

    this.backgrounds["sky"].image.src = "background.png";
    this.backgrounds["trees"].image.src = "trees.png";

    for (var key in this.backgrounds) {
      this.backgrounds[key].image.onload = function (currentKey) {
        this.backgrounds[currentKey].loaded = true;
      }.bind(this, key);
    }

    this.textures.src = this.options.texturesPath;
    this.ninja.src = this.options.ninjaPath;
    this.knife.src = this.options.knifePath;
    this.fire.src = this.options.firePath;
    this.fireKnife.src = this.options.fireKnifePath;
    this.textures.onload = onInit;
  },
  map: {
    structures: [],
  },
  isOver: false,
};
