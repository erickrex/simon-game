const startButton = document.getElementById("startButton");

const blueish = document.getElementById("blueish");
const purpleish = document.getElementById("purpleish");
const orangish = document.getElementById("orangish");
const greenish = document.getElementById("greenish");

class Game {
  constructor() {
    this.initializeGame();
    this.createSequence();
    this.nextLevel();
  }

  initializeGame() {
    this.chooseColor = this.chooseColor.bind(this);
    startButton.classList.add("hide");
    this.level = 10;
    this.colors = {
      blueish,
      purpleish,
      orangish,
      greenish,
    };
  }

  createSequence() {
    this.sequence = new Array(10)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  nextLevel() {
    this.turnOnSequence();
    this.addClickEvents();
  }

  indexOfColor(number) {
    switch (number) {
      case 0:
        return "blueish";
      case 1:
        return "purpleish";
      case 2:
        return "orangish";
      case 3:
        return "greenish";
    }
  }

  turnOnSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.indexOfColor(this.sequence[i]);
      setTimeout(() => this.turnOnSingle(color), i * 500);
    }
  }

  turnOnSingle(color) {
    this.colors[color].classList.add("light");
    setTimeout(() => this.turnOffColor(color), 400);
  }

  turnOffColor(color) {
    this.colors[color].classList.remove("light");
  }

  addClickEvents() {
    this.colors.blueish.addEventListener("click", this.chooseColor);
    this.colors.orangish.addEventListener("click", this.chooseColor);
    this.colors.purpleish.addEventListener("click", this.chooseColor);
    this.colors.greenish.addEventListener("click", this.chooseColor);
  }

  chooseColor(e) {
    console.log(e);
    console.log(this);
  }
}

function startGame() {
  window.game = new Game();
}
