var BackImage, BACKGROUND;
var Player, PlayerRunning;
var Ground, GroundImage;

var FoodGroup, BananaImage;
var ObstacleGroup, ObstacleImage;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var gameOver;
var Score = 0;
var Attempts = 3;

function preload() {
  BackImage = loadImage('jungle.jpg');
  PlayerRunning = loadAnimation('Monkey_01.png', 'Monkey_02.png', 'Monkey_03.png', 'Monkey_04.png', 'Monkey_05.png', 'Monkey_06.png', 'Monkey_07.png', 'Monkey_08.png', 'Monkey_09.png', 'Monkey_10.png');
  BananaImage = loadImage('banana.png');
  ObstacleImage = loadImage('obstacle.png');
}

function setup() {
  createCanvas(800, 400);

  BACKGROUND = createSprite(0, 0, 800, 400);
  BACKGROUND.addImage(BackImage);
  BACKGROUND.x = BACKGROUND.width / 2;
  BACKGROUND.velocityX = -4;

  Player = createSprite(100, 340, 20, 50);
  Player.addAnimation('Player', PlayerRunning);
  Player.scale = 0.07;

  Ground = createSprite(400, 350, 800, 10);
  Ground.visible = false;
  Ground.x = Ground.width / 2;

  FoodGroup = new Group();
  ObstacleGroup = new Group();

  Score = 0;
}

function draw() {
  drawSprites();

  stroke(10);
  fill('white');
  text('Score' + ': ' + Score, 550, 50);

  if (gameState === PLAY) {
    if(Ground.x < 0){
      Ground.x = Ground.width / 2;
    }
    if (BACKGROUND.x < 300){
      BACKGROUND.x = BACKGROUND.width / 2;
    }

    if (FoodGroup.isTouching(Player)) {
      Score += 2;
      Player.scale += 0.05;
      FoodGroup.destroyEach();
    }

    if (keyDown('SPACE')) {
      Player.velocityY = -12;
    }

    Player.velocityY += 0.8;

    Player.collide(Ground);

    spawnFood();
    spawnObstacles();

    if (ObstacleGroup.isTouching(Player)) {
      gameState = END;
    }
  } else if(gameState === END) {
    Player.visible = false;
    BACKGROUND.velocityX = 0;

    FoodGroup.destroyEach();

    ObstacleGroup.destroyEach();

    fill('white')
    text('Game Over!', 400, 200);
  }
}


function spawnFood() {
  if (frameCount % 80 === 0) {
    var Banana = createSprite(600, 250, 40, 10);
    Banana.addImage(BananaImage);

    Banana.y = random(120, 150);
    Banana.velocityX = -5;
    Banana.lifetime = 200;
    Banana.scale = 0.05

    FoodGroup.add(Banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var Obstacle = createSprite(800, 350, 10, 40);
    Obstacle.addImage(ObstacleImage);

    Obstacle.velocityX = -(4 + 2 * Score / 4);
    Obstacle.scale = 0.2;
    Obstacle.lifetime = 200;

    ObstacleGroup.add(Obstacle);
  }
}