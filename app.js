import Phaser from "phaser";

console.clear();

//game balance
var GRAVITY = 2000;
var JUMP = 700;
var speed = 100;
var box_rate = 500;
var box_speed = [3.5, 5, 10];
var position_y = [55, 50, 60, 65];

//usage
var player;
var ground;
var ground_texture;
var bg1, bg2, bg3;
var box;
var box_0, box_1, box_2, box_3;
var heart;
var deadline;

// groups
var blocks;
var boxes;
var platforms;
var hearts;

var particles;
var emitter;
var tween;

// game engine setting
const config = {
  type: Phaser.AUTO,
  width: Math.min(Math.max(320, window.innerWidth), 640),
  height: 208,
  backgroundColor: "#fafafa",
  parent: "gameframe",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: GRAVITY },
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
var sprite_mouse = "assets/smile_jump_14.png";

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
  this.load.spritesheet("player", sprite_mouse, {
    frameWidth: 14,
    frameHeight: 14,
    endFrame: 11
  });
}

function create() {
  // You can access the game's config to read the width & height
  const { width, height } = this.sys.game.config;

  //make group
  blocks = this.add.group();
  boxes = this.add.group();
  platforms = this.add.group();
  hearts = this.add.group();

  this.anims.create({
    key: "walk",
    frames: this.anims.generateFrameNumbers("player", {
      start: 7,
      end: 10,
      first: 7
    }),
    frameRate: 20,
    repeat: -1
  });

  this.anims.create({
    key: "jump",
    frames: this.anims.generateFrameNumbers("player", {
      start: 0,
      end: 6,
      first: 0
    }),
    frameRate: 20,
    repeat: 0
  });

  //group of ground_texture
  platforms = this.add.group({
    maxSize: -1
  });

  //group of boxes
  boxes = this.physics.add.group({
    maxSize: 10
  });

  // player add
  player = this.physics.add
    .sprite(72, 20, "walk")
    .play("walk")
    .setSize(14, 14)
    .setScale(3);

  // ground add
  ground = this.add.zone(width, height - 20, width * 2, 20);
  this.physics.world.enable(ground, 1); // (0) DYNAMIC (1) STATIC

  //disable mouse optional input
  this.input.mouse.disableContextMenu();

  //collide event
  this.physics.add.collider(player, ground, function() {
    if (player.body.touching.down == true && player.anims.isPlaying == false) {
      player.anims.play("walk");
      // console.log("land");
    }
  });
  // this.physics.add.collider(boxes, ground);
  this.physics.add.collider(player, boxes, function() {
    emitter.active = true;
  });

  //dying zone
  deadline = this.add.zone(width / 2, height, 1280, 10);
  this.physics.world.enable(deadline, 1); // (0) DYNAMIC (1) STATIC

  // timer
  this.time.addEvent({
    delay: box_rate,
    callback: onEvent,
    callbackScope: this,
    loop: true
  });

  //emitter
  particles = this.add.particles("heart", null, {
    scale: { min: 0.1, max: 1 },
    x: player.x,
    y: player.y,
    alpha: 0
  });
  emitter = particles.createEmitter({
    frequency: 10,
    speed: 100,
    lifespan: 500,
    gravityY: -400,
    scale: 2,
    active: false,
    x: player.x + 10,
    y: player.y - 50
  });
}

function update(time, delta) {
  this.input.on(
    "pointerdown",
    function(pointer) {
      if (player.body.touching.down == true) {
        player.anims.play("jump");
        player.body.setVelocityY(-JUMP);
      }
    },
    this
  );
  // particles.y = player.y;
  // emitter.active = false;
  // var content = box_count.text;
  // var txt = this.add.text(150, 100, "hello", {
  //   color: "#000"
  // });
  // txt.setText(boxes.countActive(););
}

function onEvent() {
  //create random box to baxes
  box = this.physics.add
    .image(
      742,
      Phaser.Math.RND.pick(position_y),
      Phaser.Math.RND.pick(["box_0", "box_1", "box_2", "box_3"])
    )
    .setVelocityX(Phaser.Math.RND.pick(box_speed) * -speed)
    .setBounceY(1);
  //add collider to box with ground
  this.physics.add.collider(box, ground);
  //kill box when box hit deadline
  this.physics.add.overlap(box, deadline, function(a, b) {
    a.destroy();
  });
  boxes.add(box);

  //when box touch the player
  var tween_box = this.tweens.add({
    targets: box,
    scale: { from: 1, to: 0 },
    x: { from: this.x, to: player.x },
    y: { from: this.y, to: player.y },
    ease: "Cubic", // 'Cubic', 'Elastic', 'Bounce', 'Back'
    duration: 300,
    repeat: 0, // -1: infinity
    yoyo: false,
    paused: true,
    onComplete: function() {
      this.destroy();
      tween_box.stop();
    },
    onCompleteScope: box
  });

  this.physics.add.overlap(box, player, function(a, b) {
    a.body.stop();
    a.body.setAllowGravity(false);
    a.tint = 0xff00ff;
    tween_box.play();
    // this.physics.accelerateToObject(a.body, player, 60, 300, 300);
  });
}
