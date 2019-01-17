
"use strict";
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // make enemies begining after reaching canvas.width
    if (this.x >= 505) {
        this.x = -100;
    }
    // Collision with walls and enemies
    Collision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y, speed, lives) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.lives = lives;
    this.sprite = "images/char-horn-girl.png";
};
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function(dt) {
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(player.lives, score, Level);
};

// Draw handleInput
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= player.speed;
    }
    if (keyPress == 'up') {
        this.y -= player.speed;
    }
    if (keyPress == 'right') {
        this.x += player.speed;
    }
    if (keyPress == 'down') {
        this.y += player.speed;
    }
};

// Function to display score and Level
var displayScoreLevel = function(alives, aScore, aLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasElement = canvas[0];

    // add player score and level to div element created
    DataPlusDiv.innerHTML =
        'Lives: ' + alives + ' / '+'Score: ' + aScore + ' / ' + 'Level: ' + aLevel;
    document.body.insertBefore(DataPlusDiv, firstCanvasElement[0]);
};

var Collision = function() {
    // collision between enemy and player
    // if there is collision, player new start and lives -1
    allEnemies.forEach(function(enemy){
      if(player.x >= enemy.x-50 && player.x <= enemy.x +50){
        if(player.y >= enemy.y -50 && player.y <= enemy.y +50){
          player.x = 202;
          player.y = 404;
          player.lives=player.lives-1;
        }
      }
    });

  // Prevent the player from exceeding the limits wall boundaries
    //Player boundaries y
    if (player.y > 404 ) {
        player.y = 404;
    }
    //Player boundaries x
    if (player.x > 404) {
        player.x = 404;
    }
    if (player.x < 0) {
        player.x = 0;
    }

    // if player wins, pass the next Level, up score
    //
    if (player.y <= -40) {
        Level += 1;
        score += 10;
        resetnewLevel();
        startEnemies(Level);
    }
    gameOver();
};

// if pass the Level, reset Enemies and Player
var resetnewLevel = function(){
  player.x = 202;
  player.y = 404;
  allEnemies = [];
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 404, 50,3);

// Set score and level and insert them into the document
var score = 0;
var Level = 1;
var DataPlusDiv = document.createElement('div');

// Difficulty, every two levels more quickly
var startEnemies = function(v){
allEnemies.push(new Enemy(-100,60,Math.random() * 150 + 70*v));
allEnemies.push(new Enemy(-100,145,Math.random() * 150 + 70*v));
allEnemies.push(new Enemy(-100,230,Math.random() * 150 + 70*v));};

// Call enemies first Time, minimum difficulty
startEnemies(0);

// Game Over when lives = 0, If your score is < 30 game over, if score is < 30...Congratulation!
var gameOver = function(){
  if(player.lives<1 && score>=30){
    (function ConfirmDemo() {
      swal({
      title: "Congratulations",
      text: "Your Score is! " + score + " !",
      icon: "success",
      button: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        location.reload();
      }
    });
  })();
    window.cancelAnimationFrame(main);
  }
  if(player.lives<1 && score<30){
      (function ConfirmDemo() {
        swal({
        title: "Game Over",
        text: "Your Score is " + score + " !",
        icon: "error",
        button: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          location.reload();
        }
      });
    })();
      window.cancelAnimationFrame(main);
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//Choose your character
var src1 = 'images/char-horn-girl.png';
var src2 ='images/char-cat-girl.png';
var src3 = 'images/char-boy.png';
var src4 ='images/char-princess-girl.png';

function chooseCha1(c){
  player.sprite=c;
  $("img").removeClass("select");
  $("#character1").addClass("select");
};

function chooseCha2(c){
  player.sprite=c;
  $("img").removeClass("select");
  $("#character2").addClass("select");
};

function chooseCha3(c){
  player.sprite=c;
  $("img").removeClass("select");
  $("#character3").addClass("select");
};

function chooseCha4(c){
  player.sprite=c;
  $("img").removeClass("select");
  $("#character4").addClass("select");
};
