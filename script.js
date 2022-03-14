var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;


var TIMEFRAME = 10000; 
var UPDATE_TIME = 100;


var WIDTH_CANDLE = 10; 
var last_price = 200;
var curr_price = 200;
var candle_counter = 0;
var max_price, min_price = 0;

createCandle();
var m = setInterval(createCandle, TIMEFRAME);

function createCandle() {
 candle_counter++;
 max_price = curr_price;
 min_price = curr_price;
 last_price = curr_price;

 intercode = setInterval(updatePriceCandle,UPDATE_TIME);
 setTimeout(() => clearInterval(intercode), TIMEFRAME);
}

function updatePriceCandle() {
  ctx.clearRect(candle_counter * WIDTH_CANDLE, 0, WIDTH_CANDLE, canvas.height)
  curr_price = curr_price + genPrice();
  if (curr_price < last_price) {
    ctx.fillStyle = "green";
    ctx.strokeStyle = "green";
  } else {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
  }

  if (curr_price > max_price) {
    max_price = curr_price;
  }
  if (curr_price < min_price) {
    min_price = curr_price;
  }

  
  ctx.beginPath();
  ctx.moveTo(candle_counter*WIDTH_CANDLE+WIDTH_CANDLE/2, min_price );
  ctx.lineTo(candle_counter*WIDTH_CANDLE+WIDTH_CANDLE/2, max_price);
  ctx.stroke();

  if (curr_price == last_price) {
  		curr_price+=1;
  }

  ctx.fillRect(candle_counter * WIDTH_CANDLE, last_price, WIDTH_CANDLE, curr_price - last_price);
 }

 function genPrice() { 		
   return Math.random() * 15 - 7;
 }
