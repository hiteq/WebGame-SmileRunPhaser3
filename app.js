// import Phaser from "phaser";

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
  backgroundColor: "#87CEEB",
  parent: "gameframe",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: GRAVITY },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// 에셋 로딩
function preload() {
  console.log("에셋 로딩 시작");
  
  // 배경 이미지 로딩
  this.load.image("bg1", "assets/bg1.png");
  this.load.image("bg2", "assets/bg2.png");
  this.load.image("bg3", "assets/bg3.png");
  
  // 게임 요소 로딩
  this.load.image("player", "assets/smile_jump_14.png");
  this.load.image("box_g", "assets/box_g_1.png");
  this.load.image("box_a", "assets/box_a_1.png");
  this.load.image("box_g9", "assets/box_g9_1.png");
  this.load.image("box_smile", "assets/box_smile_1.png");
  this.load.image("heart", "assets/heart.png");
  
  // 로딩 이벤트 리스너
  this.load.on('complete', () => {
    console.log('모든 에셋 로딩 완료');
  });
  
  this.load.on('loaderror', (error) => {
    console.error('에셋 로딩 에러:', error);
  });
}

// 게임 생성
function create() {
  console.log("게임 생성 시작");
  
  // 배경 이미지 추가
  bg1 = this.add.image(0, 0, "bg1").setOrigin(0, 0);
  bg2 = this.add.image(0, 0, "bg2").setOrigin(0, 0);
  bg3 = this.add.image(0, 0, "bg3").setOrigin(0, 0);
  
  // 배경 크기 조정
  bg1.setDisplaySize(config.width, config.height);
  bg2.setDisplaySize(config.width, config.height);
  bg3.setDisplaySize(config.width, config.height);
  
  // 그룹 생성
  blocks = this.physics.add.staticGroup();
  boxes = this.physics.add.group();
  platforms = this.physics.add.staticGroup();
  hearts = this.physics.add.group();
  
  // 바닥 생성 (시각적으로 보이는 바닥)
  ground = this.add.rectangle(config.width / 2, config.height - 10, config.width, 20, 0x228B22);
  this.physics.add.existing(ground, true);
  
  // 플레이어 생성
  player = this.physics.add.sprite(72, config.height - 50, "player");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.setDisplaySize(32, 32);
  
  // 플레이어와 바닥 충돌 설정
  this.physics.add.collider(player, ground);
  
  // 데드라인 생성
  deadline = this.physics.add.staticGroup();
  var deadlineRect = this.add.rectangle(-50, config.height / 2, 20, config.height, 0xFF0000);
  deadline.add(deadlineRect);
  
  // 키보드 입력 설정
  this.input.keyboard.on('keydown', (event) => {
    if (event.code === 'Space' && player.body.touching.down) {
      player.setVelocityY(-JUMP);
    }
  });
  
  // 터치/클릭 입력 설정
  this.input.on('pointerdown', () => {
    if (player.body.touching.down) {
      player.setVelocityY(-JUMP);
    }
  });
  
  // 박스 생성 타이머
  this.time.addEvent({
    delay: box_rate,
    callback: createBox,
    callbackScope: this,
    loop: true
  });
  
  console.log("게임 생성 완료");
}

// 박스 생성 함수
function createBox() {
  var boxType = Phaser.Math.RND.pick(["box_g", "box_a", "box_g9", "box_smile"]);
  var boxSpeed = Phaser.Math.RND.pick(box_speed);
  var boxY = Phaser.Math.RND.pick(position_y);
  
  box = this.physics.add.sprite(config.width + 50, config.height - boxY, boxType);
  box.setVelocityX(-boxSpeed * speed);
  box.setDisplaySize(32, 32);
  boxes.add(box);
  
  // 박스와 플레이어 충돌
  this.physics.add.overlap(player, box, hitBox, null, this);
  
  // 박스와 바닥 충돌
  this.physics.add.collider(box, ground);
  
  // 박스가 데드라인을 지나면 제거
  this.physics.add.overlap(box, deadline, (box, deadline) => {
    box.destroy();
  }, null, this);
}

// 박스 충돌 함수
function hitBox(player, box) {
  console.log("박스 충돌!");
  box.destroy();
  // 여기에 점수 증가나 다른 효과 추가 가능
}

// 게임 업데이트
function update() {
  // 플레이어 이동
  player.setVelocityX(speed);
  
  // 배경 스크롤링
  bg1.x -= 0.5;
  bg2.x -= 1;
  bg3.x -= 1.5;
  
  // 배경이 화면을 벗어나면 리셋
  if (bg1.x <= -config.width) bg1.x = 0;
  if (bg2.x <= -config.width) bg2.x = 0;
  if (bg3.x <= -config.width) bg3.x = 0;
}

// 게임 시작
console.log("게임 초기화 시작");
const game = new Phaser.Game(config);
console.log("게임 생성 완료:", game);
