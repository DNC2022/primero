# primerovar ball;
var score = 0;
var lives = 3;
var gamestate = "serve";
ball = createSprite(200,200,10,10);
ball.setAnimation("golfball_1");
ball.scale = 0.05;

var paddle = createSprite(200, 350, 120, 10);
paddle.shapeColor = color(0,0,255);

createEdgeSprites();

var bricks = createGroup();

function createBrickRow(y, color) {
  for(c=0; c<6; c++)
  {
    var brick = createSprite(65+54*c,y,50, 25);
    brick.shapeColor = color;
    bricks.add(brick);
  }
}

createBrickRow(65, "white");
createBrickRow(65+29, "green");
createBrickRow(65+29+29, "blue");
createBrickRow(65+29+29+29, "yellow");

function draw() {
  background("black");
  
  textSize(20);
  text("Puntuación: "+score,40,25);
  text("Vidas: "+lives, 40, 45);
  
  if(gamestate == "serve"){
    text("Clic para servir la pelota.", 120,250);
    ball.velocityX =0;
    ball.velocityY =0;
    ball.x = 200;
    ball.y = 200;
  }
  else if(gamestate =="over") {
    text("¡Fin del Juego!", 150, 250);
    ball.remove;
  }
  else {
    gameplay();
  }
  
  drawSprites();
}

function mousePressed()
{
  ball.velocityX = 10;
  ball.velocityY = 6;
  
  if(gamestate == "serve"){
    gamestate = "play";
    ball.velocityY = -7;
    ball.velocityX = -7;
  }
  
}

function brickHit(ball, brick) {
 playSound("sound://category_hits/puzzle_game_button_04.mp3");
 brick.remove();
 score = score+5;
  
}

function lifeover(){
  lives = lives - 1;
  if(lives>=1) {
    gamestate = "serve";
  }
  else {
    gamestate = "end";
  }
}

function gameplay(){
  paddle.x = World.mouseX;
  
  if(paddle.x < 60)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 340)
  {
    paddle.x = 340;
  }
  //rotation = rotation + 5;
  ball.bounceOff(topEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
  //ball.bounceOff(paddle);
  ball.bounceOff(bricks, brickHit);
  if(ball.bounceOff(paddle))
  {
    playSound("sound://category_tap/puzzle_game_organic_wood_block_tone_tap_1.mp3");
  }
  if(!bricks[0])
  {
    //console.log("Won");
    ball.velocityX = 0;
    ball.velocityY = 0;
    text("¡Bien hecho!",150,200);
  }
  if(ball.isTouching(bottomEdge)) {
    lifeover();
  }
}