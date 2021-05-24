var bg,bgImg;

var booster,boosterImg;

var youwin,youwinImg;

var fire,fireImg,fireGroup,firesound;

var dragonLife=15;

var burstImg;

var startbooster,startboosterImg;

var Time=0;

var warning,warningImg,warningsound;

var invisible1,invisible2;

var dragon,dragonImg;

var startsound;

var flag=1;

var gamestart,startImg;

var spaceship,spaceshipImg;

var startspaceship,startspaceImg;

var bullet,bulletImg,bulletGroup;

var bullets,bulletsImg;

var rocketsound;

var bee,beeImg;

var bulletsound;

var spideralien,spiImg,SpiderGroup;

var burstsound;

var life=20;

var gameoversound;
    
var score=0,scoresound;

var LEVEL=0;

var PLAY;

var END;

var gameState="START";

function preload()
{
 bgImg=loadImage("space.webp");
 spaceshipImg=loadImage("spaceship.png");
 startspaceImg=loadImage("spaceship2.png"); 
 bulletImg=loadImage("bullet.png");
 bulletsImg=loadImage("bullet1.png");
 bulletsound=loadSound("shootsound.wav");
 beeImg=loadImage("bee.png"); 
 UFOImg=loadImage("UFO.png");
 spiImg=loadImage("spideralien.png");
 burstsound=loadSound("burst.wav");
 startImg=loadImage("start.png");
 startsound=loadSound("gamestart.wav");
 dragonImg=loadImage("dragon.png"); 
 warningImg=loadImage("warning.png");
 startboosterImg=loadImage("start booster.png"); 
 rocketsound=loadSound("rocketsound.wav");
 fireImg=loadImage("fire.png");
 firesound=loadSound("firesound.wav");
 warningsound=loadSound("warningsound.wav");
 gameoversound=loadSound("gameoversound.wav");
 boosterImg=loadImage("booster.png");
 youwinImg=loadImage("you won.png"); 
}

function setup() 
{
  createCanvas(600,600)
  
  bg=createSprite(10,400);
  bg.addImage(bgImg);
  bg.scale=1.7;
     
  spaceship=createSprite(100,300);
  spaceship.addImage(spaceshipImg);
  spaceship.visible=false;
  spaceship.setCollider("rectangle",0,0,300,300,0)
  spaceship.scale=0.3;
  
  booster=createSprite(spaceship.x-65,spaceship.y);
  booster.visible=false;

  bulletGroup = createGroup();
  bulletsGroup = createGroup();
  beeGroup = createGroup();
  fireGroup= createGroup();
  SpiderGroup=createGroup();
  
  startspaceship=createSprite(300,300);
  
  startbooster=createSprite(300,startspaceship.y+100);
  startbooster.visible=false;
  
  gamestart=createSprite(300,500);
  gamestart.scale=0.5;
  gamestart.addImage(startImg);
  gamestart.visible=true;
  
  warning=createSprite(300,300);
  warning.addImage(warningImg);
  warning.visible=false;

  dragon=createSprite(600,-300);
  dragon.setCollider("rectangle",0,0,150,225);
  dragon.visible=false;
  dragon.depth=bg.depth
  dragon.depth=dragon.depth+1;
  
  invisible1=createSprite(300,20,600,3);
  invisible1.visible=false;
  invisible2=createSprite(300,580,600,3);
  invisible2.visible=false;
  
  youwin=createSprite(300,300);
  youwin.addImage(youwinImg);
  youwin.visible=false;
}

function draw() 
{
  background("black");
  
  if(gameState==="START")
   {
      startspaceship.addImage(startspaceImg);
      startspaceship.scale=0.5;
     
     if(mousePressedOver(gamestart))
      {
        gamestart.destroy();
        
        startbooster.addImage(startboosterImg);
        startbooster.visible=true;
        startbooster.velocityY=-10;
        
        startspaceship.velocityY=-10; 
        
        rocketsound.play();
      } 
     
     if(startspaceship.y < -100)
      {
        gameState="PLAY";
        LEVEL=1;
      } 
     
   } 
  
  if(gameState==="PLAY")
   {
     
  if(LEVEL===1)
   {
     spaceship.visible=true;
     spaceship.velocityY=0;
     spaceship.collide(invisible1);
     spaceship.collide(invisible2);
     
     if(keyDown(UP_ARROW))
       {
         spaceship.velocityY=-6;
       }
     
     if(keyDown(DOWN_ARROW))
       {
         spaceship.velocityY=6;
       }
     
       if(keyDown("space"))
        {
          if(frameCount%3==0)
           {
             bullet=createSprite(spaceship.x,spaceship.y-30);
             bullet1=createSprite(spaceship.x,spaceship.y+30);
             bullet1.addImage(bulletsImg);
             bullet1.scale=0.4;
             bullet1.velocityX=3;
             bullet.addImage(bulletImg);
             bullet.scale=0.4;
             bullet.y=spaceship.y-30;
             bullet.x=spaceship.x;
             bullet.velocityX=3;
             bullet.lifetime=1000;
             bullet1.lifetime=1000;
             bulletsound.play();
             bulletGroup.add(bullet);
             bulletsGroup.add(bullet1);
           } 
        }
  
      if(life<=0)
       {
         spaceship.destroy();
         bulletsound.stop();
         bg.x=10000;
         bulletGroup.destroyEach();
         bulletsGroup.destroyEach();
         SpiderGroup.destroyEach();
         beeGroup.destroyEach();
         dragon.destroy();
         firesound.stop();
         fireGroup.destroyEach();
         textFont("BOLD");
         fill("red");
         textSize(30);
         text("You Lose",260,300);
        } 
     
     if(life<=0 && flag===1)
       {
         burst.play();
         flag=0;
       }
  
  if(frameCount%25===0)
   {
     spideralien=createSprite(800);
     spideralien.y=Math.round(random(50,550));
     spideralien.addImage(spiImg);
     spideralien.velocityX=-3;
     spideralien.scale=0.2;
     spideralien.lifetime=1000;
     SpiderGroup.add(spideralien);
   } 
  
  if(frameCount%22===0)
   {
     bee=createSprite(800);
     bee.y=Math.round(random(50,550));
     bee.addImage(beeImg);
     bee.scale=0.1;
     bee.velocityX=-4;
     beeGroup.add(bee);
   } 
  
  if(spaceship.isTouching(SpiderGroup))
   {
     life=life-2;
     SpiderGroup.destroyEach();
     burstsound.play();
   }

  if(spaceship.isTouching(beeGroup))
   {
     life=life-1;
     beeGroup.destroyEach();
     burstsound.play();
   } 
  
  if(bulletGroup.isTouching(beeGroup))
   {
     bulletGroup.destroyEach();
     beeGroup.destroyEach();
     score=score+1
     burstsound.play();
   } 
  
  if(bulletsGroup.isTouching(beeGroup))
   {
     bulletsGroup.destroyEach();
     beeGroup.destroyEach();
     score=score+1
     burstsound.play();
   }
     
  if(bulletGroup.isTouching(SpiderGroup))
    {
      bulletGroup.destroyEach();
      SpiderGroup.destroyEach();
      burstsound.play();
      score=score+1
    }
     
  if(bulletsGroup.isTouching(SpiderGroup))
    {
      bulletsGroup.destroyEach();
      SpiderGroup.destroyEach();
      burstsound.play();
      score=score+1
    }
       
  if(score>=30)
   {
     SpiderGroup.setLifetimeEach(0);
     beeGroup.setLifetimeEach(0);
     
     Time=Time+1;
     
     if(frameCount%5===0)
       {
         warning.visible=false;
       }
     
     if(Time<=10)
       {
         warning.visible=true;
         
         if(frameCount%10==0)
           { 
            dragon.visible=true;
            dragon.addImage(dragonImg);
            dragon.y=300; 
            dragon.velocityX=-3;
            dragon.scale=0.7;
           }
       } 
     
     if(Time>=40)
       {
         if(frameCount%55===0)
           {
            fire=createSprite(dragon.x-50,dragon.y-8);
            fire.addImage(fireImg);
            fire.velocityX=-15;
            fire.scale=0.1; 
            firesound.play();
            fireGroup.add(fire); 
           }
       }
      
    if(dragon.x<=450)
      {
        dragon.velocityY=-9
        dragon.velocityX=0.1;
      }
     
    if(dragon.y<=30)
      {
        dragon.velocityY=9
        dragon.velocityX=0;
      }
     
     if(dragon.y>=570)
      {
        dragon.velocityY=-9
        dragon.velocityX=0;
      }
     
   }  
     
  if(dragonLife<=0 || dragonLife<=0 && life<=0)
    {
      bulletGroup.destroyEach();
      bulletsGroup.destroyEach();
      SpiderGroup.setLifetimeEach(0);
      beeGroup.setLifetimeEach(0);
      booster.y=mouseY;
      burstsound.stop();
      firesound.stop();
      dragon.destroy();
      fireGroup.destroyEach();
      booster.addImage(boosterImg);
      booster.visible=true;
      booster.velocityX=4;
      spaceship.velocityX=4;
      youwin.visible=true;
    }  
     
  if(spaceship.isTouching(fireGroup))
    {
      life=life-19;
      fireGroup.destroyEach();
    }
     
  if(dragon.isTouching(bulletGroup))
    {
      dragonLife=dragonLife-1;
      bulletGroup.destroyEach();
    }
     
  if(dragon.isTouching(bulletsGroup))
    {
      dragonLife=dragonLife-1;
      bulletsGroup.destroyEach();
    }   
     
 }
     
   }  
  
  if(LEVEL===1 && flag==1)
    {
      startsound.play();
      flag=0;
    } 
     
   
  
  drawSprites();
  
  textFont("BOLD");
  fill("blue");
  textSize(15);
  text("MyLife:"+life,5,15);
  
  textFont("BOLD");
  fill("yellow");
  textSize(15);
  text("Score:"+score,545,15);
  
  fill("red");
  text("LEVEL:"+LEVEL,270,20);
  
  fill("black");
  text("Time:"+Time,100,20);
  
  fill("red");
  textSize(15);
  text("Bosslife:" + dragonLife,400,20)
}
