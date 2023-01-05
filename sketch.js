const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground, fruit, rope, fruit_con;

var bg_img;
var food;
var bunny_img;

var button;
var bunny;

function preload(){
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  bunny_img = loadImage('rabbit-01.png');
}

function setup() {
  createCanvas(600,700);
  frameRate(80);
  
  engine = Engine.create();
  world = engine.world;

  button = create = createImg('cut_btn.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);

  ground = new Ground(300, 680, 650, 20);

  bunny = createSprite(200,620,100,100);
  bunny.addImage(bunny_img);
  bunny.scale = 0.2;

  rope = new Rope(6, {x:220, y:30});

  fruit = Bodies.circle(300, 350, 20);
  Matter.Composite.add(rope.body, fruit);
  fruit_con = new Link(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

}

function draw() {
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!= null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  Engine.update(engine);

  ground.show();
  rope.show();
  drawSprites();

  
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}