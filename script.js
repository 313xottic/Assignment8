var die1 = document.getElementById("die1");
var die2 = document.getElementById("die2");
var total = document.getElementById("total");
var times = document.getElementById("times");
var check = document.getElementById("check");
var result = document.getElementById("result");
var freq = document.getElementById("freq");
var graph = document.getElementById("graph");
var roll = document.getElementById("roll");
var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}
function rollDice() {
  var value1 = rollDie();
  var value2 = rollDie();
  die1.src = "dice" + value1 + ".png";
  die2.src = "dice" + value2 + ".png";
  var sum = value1 + value2;
  total.textContent = sum;
  counts[sum - 2]++;
  updateGraph();
  updateFreq();
}
var reset = document.getElementById("reset");

reset.addEventListener("click", function() {
counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
die1.src = "dice1.png";
die2.src = "dice1.png";
total.textContent = "2";
for (var i = 2; i <= 12; i++) {
var bar = document.getElementById("bar" + i);
bar.style.width = "0%";
bar.title = "Rolled 0 times";
}
updateGraph();
});

function updateGraph() {
var max = Math.max(...counts);
var adjustedMax = max;
var step;
if (max < 10) {
step = 1;
} else if (max < 20) {
step = 2;
if (max % 2 !== 0) { 
  adjustedMax = max + 1; 
}
} else if (max < 100) {
step = 5;
adjustedMax = 5 * Math.ceil(max / 5); 
} else {
step = 10;
adjustedMax = 10 * Math.ceil(max / 10); 
}
for (var i = 2; i <= 12; i++) {
var bar = document.getElementById("bar" + i);
var percent = counts[i - 2] / adjustedMax * 100;
bar.style.width = percent + "%";
bar.title = "Rolled " + counts[i - 2] + " times";
if (i === 2) {
  bar.style.borderRadius = percent === 100 ? '4px 4px 0px 0px' : '4px 0px 0px 0px';
}
if (i === 12) {
  bar.style.borderRadius = percent === 100 ? '0px 0px 4px 4px' : '0px 0px 0px 4px';
}
}
var xAxis = document.getElementById("xAxis");
xAxis.innerHTML = '';
for (var i = 0; i <= adjustedMax; i += step) { // Start from 0
var tickContainer = document.createElement('div');
tickContainer.style.flex = 1;
var tick = document.createElement('span');
tick.textContent = i;
tick.style.position = 'absolute';
tick.style.left = (i / adjustedMax * 100) + '%'; 
tick.style.transform = 'translateX(-50%)';
if (adjustedMax >= 10 && adjustedMax < 100) {
  tick.style.fontSize = '80%';
} else if (adjustedMax >= 100) {
  tick.style.fontSize = '60%'; 
}
tickContainer.appendChild(tick);
xAxis.appendChild(tickContainer);
}
}

updateGraph();


function checkTimes() {
  var value = times.value;
  if (value < 2 || value > 12 || isNaN(value)) {
    result.textContent = "ERR";
  } else {
    result.textContent = "The roll " + value + " has occurred " + counts[value - 2] + " times.";
  }
}
roll.addEventListener("click", rollDice);
check.addEventListener("click", checkTimes);