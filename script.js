// Player's money
let money = 0;
// amount of spam in storage (that hasn't gone into a conveyer belt)
let spam_storage = [];
// The speed of the belt
let belt_speed = 10;
// Workers that are working
let workers = [];
// Spam money multiplier
let multiplier = 1;
// fps
let fps = 2400;
// amount of spam unlocked ???
let spam_Unlocked = 1;
// The speed of workers
let worker_speed = 10;
// how much the spam moves
let conveyor_move = 80

// list of recruiters
let recruiters = []

let conveyor_cooldown = 200;
let c_cDelay = 40;

// shows how much spam is in storage
let spam_display = document.getElementById("spam");

// the class of spam and its attributes
class Spam {
  constructor(name, worth) {
    this.name = name;
    this.worth = worth;
    this.cost = (Math.pow(10, worth));
    console.log("cost:" + this.cost + " worth:" + this.worth);
  }
}

// The class of workers and its attributes
class Worker {
  constructor(name,type,speed) {
    this.name = name
    this.type = type
    this.speed = speed
  }
}
// Recruiters
class Recruiter {
  constructor(name,type,speed) {
    this.name = name
    this.type = type
    this.speed = speed
  }
}
// The work function which makes workers work
function work(self) { // this isnt in class because setTimeout doesn't work with class functions
  spam_storage.push(self.type);
  console.log("work");
  setTimeout(work, self.speed, self);
}
function recruit(self) {
  hireWorker()
  console.log("recruit")
  setTimeout(recruit, self.speed, self);
}
// list of workers
workers = [];

// The function that hires new workers
function hireWorker() {
  workers.push(new Worker("worker" + (workers.length + 1), spam_selected, 2000));
  work(workers[workers.length - 1]);
}
function hire_recruiter() {
  recruiters.push(new Recruiter("recruiter" + (workers.length + 1), spam_selected, 2000));
  recruit(recruiters[workers.length - 1]);
}

// displays of conveyer and spam on conveyer
let conveyorDisplay = document.getElementById("conveyor");
let conveyorSpam = document.getElementById("conveyorSpam");

// conveyer speed and spam on conveyer
let conveyorSpeed = 0.02;
let conveyorSpams = [];

// a function that slows down conveyer
function speedDownConveyor() {
  conveyorDisplay.style.background = "black";
  conveyorSpeed -= 2;
}

// Speeds up the conveyer
function speedUpConveyor() { // so that when you click conveyor it goes faster
  conveyorDisplay.style.background = "#242424";
  conveyorSpeed += 2;
  setTimeout(speedDownConveyor, 200);
}
function conveyor_upgrade() {
  conveyorSpeed -= 0.001;
  conveyor_cooldown -= 5;
  console.log("ajidfjoiajsdfoija")
}
// The conveyer that conveys conveyer yeah work ORANE EXPLAIN
function conveyor(spamType) {
  // Adds an image to the conveyerSpams list
  conveyorSpams.push(document.createElement("img"));
  
  conveyorSpams[conveyorSpams.length - 1].setAttribute("src", "assets/" + spamType.name + ".png");  
  conveyorSpams[conveyorSpams.length - 1].setAttribute("class", "conveyorSpam");
  conveyorDisplay.appendChild(conveyorSpams[conveyorSpams.length - 1]);
  
  moveConveyor(80, 80, spam_selected, conveyorSpams[conveyorSpams.length - 1]);
}

// I think there is a better way to do this that like looks better and is more smooth. I don't know tho but like yeah

// your variable names are horrible why a, not something that acutally tells you what you said
function moveConveyor(a, b, selected, element) {
  if (a > 0) {
    // element.style.top = parseInt(element.style.top) + a + "px";
    // element.style.marginTop = (b - a) + "vh"; 
    // element.style.top = `${parseInt(element.style.top) + a}px`;
    element.style.marginTop = (b - a) + "vh";
     // element.style.top = parseInt(element.style.top) + 5 + "vh";
    // this works
    // It works but it isn't smooth and looks bad, it also glitches out sometimes and looks bad when all of the spam spawn at the bottom
    // my only problem iwht it id that it glitches and looks realy bad
    setTimeout(moveConveyor, 30 / (conveyorSpeed * 200), a - 1, b, selected, element);
  }
  else {
    money += selected.worth;
    element.remove();
  }
}

let types = [new Spam("classic", 1), new Spam("bacon", 2), new Spam("hickorySmoke", 3), new Spam("hotSpicy", 4), new Spam("jalapeno", 5), new Spam("sausage", 6), new Spam("teriyaki", 7), new Spam("tocino", 8), new Spam("turkey", 9)]; // spam types
let spam_selected = types[0];

function selectSpam(self) {
  spam_display.setAttribute("src", self.getAttribute("src"));
  spam_selected = types[spamSelectButtons.indexOf(self)];
  console.log(spam_selected.name);
}

let spamSelectButtons = [];

for (let i = 0; i < types.length; i++) { // Creating buttons to buy workers, one for every spam type.
  spamSelectButtons.push(document.createElement("img"));
  spamSelectButtons[i].setAttribute("class", "spamButton");
  spamSelectButtons[i].setAttribute("src", "assets/" + types[i].name + ".png");
  spamSelectButtons[i].setAttribute("onclick", "selectSpam(this)");
  spamSelectButtons[i].setAttribute("title", "cost:" + types[i].cost);

  console.log(spamSelectButtons[i]);

  document.getElementById("spamSelectDiv").appendChild(spamSelectButtons[i]);
}

worker1 = new Worker("worker1",types[0],10)
workers.push(worker1)

function update() {
  for (let i = 0; i < spamSelectButtons.length; i++) { //greying out spam that you can't buy
    if (spam_Unlocked < types[i].worth) {
      spamSelectButtons[i].style.filter = "grayscale(100%)";
      spamSelectButtons[i].style.cursor = "no-drop";
      spamSelectButtons[i].setAttribute("onclick", "");
    }
    else {
      spamSelectButtons[i].style.filter = "grayscale(0%)";
      spamSelectButtons[i].style.cursor = "pointer";
      spamSelectButtons[i].setAttribute("onclick", "selectSpam(this, " + i + ")");
    }
  }

  if (c_cDelay > 0) {
    c_cDelay -= 1;
  }
  else {
    c_cDelay = conveyor_cooldown;
    if (spam_storage.length > 0) {
      conveyor(spam_storage[0]);
      spam_storage.shift();
    }
  }
  
  document.getElementById("nextUnlockButton").innerText = "Next Unlock $" + number_simplify(types[spam_Unlocked - 1].cost);
  document.getElementById("money").innerText = "$" + money;

  document.getElementById("storageDisplay").innerText = spam_storage.length;
  
  console.log("update");
  setTimeout(update, 1000 / fps);
}

function unlockSpam() {
  if (money >= types[spam_Unlocked - 1].cost) {
    money -= types[spam_Unlocked - 1].cost;
    spam_Unlocked += 1
  }
  if (spam_Unlocked >= 9) {
    document.getElementById("nextUnlockButton").style.display = "none";
  }
}

function spamClick() {
  spam_storage.push(spam_selected);
  console.log(spam_storage);
}

function number_simplify(num) {
  let fixed = 0;
  if (num === null) { return null; } // terminate early
  if (num === 0) { return '0'; } // terminate early
  fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
  var b = (num).toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ["", "K", "M", "B", "t", "q", "Q", "s", "S", "o", "n", "d", "U", "D", "T", "Qt", "Qd", "Sd", "St"][k]; // append power
  return e;
}

function deal(random) {
  if (random == 1) {
    
  }
}

update();

// THIS NEEDS TO BE IN UPDATE.
// work();
// function work() {
//   for (let i = 0; i < workers.length; i++) {
//     workers[i].make_spam();
//   }
//   setTimeout(work(),10000 - worker_speed * 10);
// }

