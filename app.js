console.clear();
import Phaser from "phaser";

//game balance
var GRAVITY = 0.6;
var JUMP = 10;
var speed = 2;
var box_rate = 20;
var box_weight = 0.4;
var box_speed = [2, 3.5, 5];
var rotate_angle = [180];
var position_y = [40, 60, 120];

//usage
var player;
var ground;
var block;
var box_0, box_1, box_2, box_3;
var bg1, bg2, bg3;
var heart;

// groups
var blocks;
var boxes;
var platforms;
var hearts;

const config = {
  type: Phaser.AUTO,
  width: Math.min(Math.max(320, window.screen.width), 640),
  height: 208,
  backgroundColor: "#fafafa",
  parent: "gameframe",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

//Data URI image
var image_box_a_1 = "assets/box_a_1.png";
var image_box_g_1 = "assets/box_g_1.png";
var image_box_g9_1 = "assets/box_g9_1.png";
var image_box_smile_1 = "assets/box_smile_1.png";
var image_heart = "assets/heart.png";
var image_bg1 = "assets/bg1.png";
var image_bg2 = "assets/bg2.png";
var image_bg3 = "assets/bg3.png";
var image_smile_walk1 = "assets/smile_walk1.png";
var image_smile_walk2 = "assets/smile_walk2.png";
var image_smile_walk3 = "assets/smile_walk3.png";
var image_smile_walk4 = "assets/smile_walk4.png";
var image_smile_jump1 = "assets/smile_jump1.png";
var image_smile_jump2 = "assets/smile_jump2.png";
var image_smile_jump3 = "assets/smile_jump3.png";
var image_smile_jump4 = "assets/smile_jump4.png";
var image_smile_jump5 = "assets/smile_jump5.png";
var image_smile_jump6 = "assets/smile_jump6.png";
var image_smile_jump7 = "assets/smile_jump7.png";

function preload() {
  // 'this' === Phaser.Scene
  this.load.image("box_0", image_box_a_1);
  this.load.image("box_1", image_box_g_1);
  this.load.image("box_2", image_box_g9_1);
  this.load.image("box_3", image_box_smile_1);
  this.load.image("heart", image_heart);
  this.load.image("bg1", image_bg1);
  this.load.image("bg2", image_bg2);
  this.load.image("bg3", image_bg3);
  this.load.image("walk1", image_smile_walk1);
  this.load.image("walk2", image_smile_walk2);
  this.load.image("walk3", image_smile_walk3);
  this.load.image("walk4", image_smile_walk4);
  this.load.image("jump1", image_smile_jump1);
  this.load.image("jump2", image_smile_jump2);
  this.load.image("jump3", image_smile_jump3);
  this.load.image("jump4", image_smile_jump4);
  this.load.image("jump5", image_smile_jump5);
  this.load.image("jump6", image_smile_jump6);
  this.load.image("jump7", image_smile_jump7);
}

function create() {
  // You can access the game's config to read the width & height
  const { width, height } = this.sys.game.config;

  //make group
  // blocks = this.add.group();
  // boxes = this.add.group();
  // platforms = this.add.group();
  // hearts = this.add.group();

  this.anims.create({
    key: "walk",
    frames: [
      { key: "walk1" },
      { key: "walk2" },
      { key: "walk3" },
      { key: "walk4" }
    ],
    frameRate: 12,
    repeat: -1
  });

  this.anims.create({
    key: "jump",
    frames: [
      { key: "jump1" },
      { key: "jump2" },
      { key: "jump3" },
      { key: "jump4" },
      { key: "jump5" },
      { key: "jump6" },
      { key: "jump7" }
    ],
    frameRate: 12,
    repeat: 0
  });

  player = this.physics.add.sprite(72, 20, "jump7").play("jump");
  ground = this.add.zone(width / 2, height - 20).setSize(width, 20);
  this.physics.world.enable(ground, 1); // (0) DYNAMIC (1) STATIC

  this.input.mouse.disableContextMenu();
}

function update(time, delta) {
  // var touching = zone.body.touching;
  // var wasTouching = zone.body.wasTouching;

  // if (touching.none && !wasTouching.none) {
  //   zone.emit("leavezone");
  // } else if (!touching.none && wasTouching.none) {
  //   zone.emit("enterzone");
  // }
  // We aren't using this in the current example, but here is where you can run logic that you need
  // to check over time, e.g. updating a player sprite's position based on keyboard input
  // zone.body.debugBodyColor = zone.body.touching.none ? 0x00ffff : 0xffff00;
  this.physics.world.collide(player, ground, function() {});

  this.input.on(
    "pointerup",
    function(pointer) {
      // console.log("up");
    },
    this
  );
}
