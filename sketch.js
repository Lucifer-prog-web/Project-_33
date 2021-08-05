const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground,leftWall,rightWall;
var bridge,bridges;
var jointPoint;
var stones = [];
var stone;
var jointLink,jointLink2;
var breakButton;
var zombie,zombie1,zombie2,zombie3,zombie4,backgroundImage;

function preload(){

zombie1 = loadImage("zombie.png");
zombie2 = loadImage("zombie(1).png");


backgroundImage = loadImage("background.png")



}

function setup() {
  createCanvas(600,600);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(300,580,600,20,"red");
  leftWall = new Base(100,300,200,50,"blue");
  rightWall = new Base(500,300,200,50,"blue");
   
  zombie = createSprite(300,500);
  zombie.addAnimation("lefttoright",zombie1, zombie2,zombie1);
  zombie.addAnimation("righttoleft",zombie2, zombie1,zombie2);
  zombie.scale = 0.1;
  


  breakButton = createButton("");
  breakButton.position(400,450);
  breakButton.class("breakButton");
  breakButton.mousePressed(handleButtonPress);

  bridges = new Bridge(7,{x:400,y:300});
  jointPoint = new Base(200,310,40,20,"yellow");
  Matter.Composite.add(bridges.body,jointPoint)
  jointLink2 = new Link(bridges,jointPoint);

  
  for(var i = 0;i <=8; i++){
     stone = new Stone(x,y,40,40)
    var x = Math.round(random(200,500));
    var y = Math.round(random(-10,140));
    stones.push(stone)
  }

}

function draw() {
  background(51);
  Engine.update(engine);

  ground.show();
  leftWall.show();
  rightWall.show();
  
  jointPoint.show();
  bridges.show();

  drawSprites();
  
  
  for(var stone of stones){
    stone.show();
  }

  handleButtonPress();

}

function handleButtonPress(){
  jointLink2 = detach;
  setTimeout(() => {
    bridges.break();
  },1500);
}
