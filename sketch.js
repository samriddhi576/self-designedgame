var car1, car1Img;
var track, trackImg;
var bullet, bulletImg, bulletGroup;
var obstacle, obstacle1Img, obstacle2Img, obstaclesGroup;
var reward, rewardImg, rewardGroup;
var coinMaster = 0;
var obstaclesDestroy = 0;
var fire, fireImg;
var end, endImg;
var gameState = "start";
var life = 3;
var lifeImg;
var restart, restartImg;

function preload()
{
  car1Img = loadImage("images/car1.png");
  trackImg = loadImage("images/track_3.jpg");
  bulletImg = loadImage("images/bullet.jpg");
  obstacle1Img = loadImage("images/obstacle1.png");
  obstacle2Img = loadImage("images/obstacle2.png");
  rewardImg = loadImage("images/goldCoin.png");
  fireImg = loadImage("images/fire.jpg");
  endImg = loadImage("images/game.Over.jpg");
  lifeImg = loadImage("images/life.png");
  restartImg = loadImage("images/restart.jpg");
}

function setup() 
{
    createCanvas(displayWidth, displayHeight);

   track = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
   track.addImage(trackImg);
   //track.scale = 0.9;

   
   car1 = createSprite(displayWidth/2, displayHeight - 200, 45, 45);
   car1.addImage(car1Img);
   car1.scale = 1;

   end = createSprite(displayWidth/2,displayHeight/2-200);
   end.addImage(endImg);
   end.visible = false;

   restart = createSprite(displayWidth/2,displayHeight/2 -50);
   restart.addImage(restartImg);
   restart.scale = 0.08;
   restart.visible = false;

   rewardGroup = new Group();
   obstaclesGroup = new Group();
   bulletGroup = new Group();
}

function draw()
{
  background("white");

  textSize(25);
  fill("red");
  text("Coin Master:"+ coinMaster,130,200);
  text("Obstacles Destroyed:"+ obstaclesDestroy,100,250);
  text("Lives:"+ life,150,300);
  image(rewardImg,90,175,30,30);
  image(obstacle1Img,65,225,30,30);
  image(lifeImg,110,280,30,30);


  if(gameState === "start")
  {
    track.velocityY = 10;
    if(track.y > displayHeight)
    {
      track.y = displayHeight/2;
    }

    if(keyDown(LEFT_ARROW) && car1.x > displayWidth/2 - 300 )
   {
     car1.x = car1.x - 10;
   }
  
   if(keyDown(RIGHT_ARROW) && car1.x < displayWidth/2 + 300)
   {
     car1.x = car1.x + 10;
   }

   if(keyDown("SPACE"))
  {
      releaseBullets();
  }
  spawnObstacles();
  spawnRewards();
  spawnFire();
  collectCoins();
  destroyObstacle();

  car1.overlap(obstaclesGroup,function(collector,collected)
  {
    life = life - 1;
    collected.remove();
  });

  if(life === 0)
  {
    gameState = "end";
  }
}
   
  if(gameState === "end")
  {
    end.visible = true;
    restart.visible = true;
    track.velocityY = 0;
    obstaclesGroup.destroyEach();
    rewardGroup.destroyEach();

    if(mousePressedOver(restart))
    {
      restartGame();
    }
  }
  drawSprites();
  
}

function releaseBullets()
{
   bullet = createSprite(car1.x,car1.y,10,10);
   bullet.addImage(bulletImg);
   bullet.scale = 0.02;
   bullet.shapeColor = "red";
   bullet.velocityY = -5;
   bulletGroup.add(bullet);
}

function spawnObstacles()
{
  
 if(frameCount % 90 === 0)
 {
    obstacle = createSprite(Math.round(random(displayWidth/2 - 300,displayWidth/2 + 300)), -displayHeight/2 ,20,20);
    obstacle.velocityY = 5;
    var a = Math.round(random(1,2));
    switch(a)
    {
      case 1: obstacle.addImage(obstacle1Img);
              obstacle.scale = 0.03;
              break;
      case 2: obstacle.addImage(obstacle2Img);
              obstacle.scale = 0.03;
              break;
      default : break; 
    }
    obstaclesGroup.add(obstacle);
  }
}

function spawnRewards()
{
  if(frameCount % 60 === 0)
  {
  reward = createSprite(random([displayWidth/2-300, displayWidth/2-200, displayWidth/2-100, displayWidth/2, displayWidth/2+100, displayWidth/2 + 200, displayWidth/2 + 300]), -displayHeight/2 ,20,20);
  reward.velocityY = 8;
  reward.addImage(rewardImg);
  reward.scale = 0.05;
  rewardGroup.add(reward);
  }
}

function spawnFire()
{
  if(frameCount % 70 === 0)
  {
    fire = createSprite(random([displayWidth/2-300,displayWidth/2-200,displayWidth/2-100,displayWidth/2,displayWidth/2+100,displayWidth/2+200,displayWidth/2+300]),-displayHeight/2,20,20);
    fire.velocityY = 6;
    fire.addImage(fireImg);
    fire.scale=0.05;
    obstaclesGroup.add(fire);
  }
}

function collectCoins()
{
  car1.overlap(rewardGroup,function(collector,collected){
    coinMaster = coinMaster + 10;
    collected.remove();
  });
}

function destroyObstacle()
{
  bulletGroup.overlap(obstaclesGroup,function(collector,collected){
    obstaclesDestroy = obstaclesDestroy + 5;
    collected.remove();
  });

}

function restartGame()
{
  gameState = "start";
  end.visible = false;
  restart.visible = false;
  coinMaster = 0;
  obstaclesDestroy = 0;
  life = 3;

}



