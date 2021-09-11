  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var invisFloor;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,windowHeight);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

  invisFloor = createSprite(width/2,height,width,20);
}


function draw() {
  background(255);
  
  if (gameState === "play") {
    
    if(keyDown("left_arrow")){
      ghost.x-=8
    }
    if(keyDown("right_arrow")){
      ghost.x+=8
    }
    if(keyDown("space")){
      ghost.velocityY=-8
    }
    ghost.velocityY+=0.5

    invisFloor.visible=false;
    ghost.collide(invisFloor)

  
    tower.velocityY=1;
      //write a condition for infinte scrolling tower
    if(tower.y>height/2){
      tower.y=height/4;
    }
    if(frameCount%200===0){
      spawnDoors();
    }
  
      //write a code to make climbersGroup collide with ghost change the ghost velocity  
//write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.

  if(ghost.isTouching(climbersGroup)){
    ghost.collide(climbersGroup);
  }

  if(ghost.isTouching(invisibleBlockGroup)){
    gameState="end"
  }

  
}
drawSprites();
  if (gameState === "end"){
    stroke("red");
    fill("red");
    textSize(30);
    text("Press Space To Restart!",(width/2)-150,(height/2)+50)
    text("Game Over", (width/2)-50,height/2);
    ghost.velocityY=0;
    tower.velocityY=0;
    climbersGroup.setVelocityYEach(0);
    doorsGroup.setVelocityYEach(0);
    if(keyDown("space")){
      gameState="play";
      doorsGroup.destroyEach();
      climbersGroup.destroyEach();
      invisibleBlockGroup.destroyEach();
      ghost.x=(300);
      ghost.y=(height-200);
    }
  }
}

function spawnDoors(){
  door=createSprite(Math.round(random(20,width-20)),0,20,20);
  door.addImage("dr",doorImg);
  door.velocityY=1;
  door.depth=ghost.depth;
  doorsGroup.add(door);
  climber=createSprite(door.x,door.y+70,20,20);
  climber.addImage("cl",climberImg);
  climber.velocityY=1;
  climbersGroup.add(climber);
  invisibleBlock=createSprite(climber.x,climber.y+15,100,10);
  invisibleBlock.velocityY=1;
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.visible=false;
  door.lifetime=(height+40);
  climber.lifetime=(height+20);
  invisibleBlock.lifetime=(height+20);
  ghost.depth+=2;
}



