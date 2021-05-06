const startButton = document.getElementById("startButton");

const blueish = document.getElementById("blueish");
const purpleish = document.getElementById("purpleish");
const orangish = document.getElementById("orangish");
const greenish = document.getElementById("greenish");
const LAST_LEVEL = 10;

class Game {
  constructor() {
    this.initializeGame();
    this.createSequence();
    this.nextLevel();
  }

  initializeGame() {
    this.nextLevel = this.nextLevel.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    startButton.classList.add("hide");
    this.level = 1;

    this.colors = {
      blueish,
      purpleish,
      orangish,
      greenish,
    };
  }

  createSequence() {
    this.sequence = new Array(LAST_LEVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  nextLevel() {
    console.log("siguiente nivel");
    this.subLevel = 0;
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

  colorOfIndex(color) {
    switch (color) {
      case "blueish":
        return 0;
      case "purpleish":
        return 1;
      case "orangish":
        return 2;
      case "greenish":
        return 3;
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

  deleteClickEventsFromSimon() {
    this.colors.blueish.removeEventListener("click", this.chooseColor);
    this.colors.orangish.removeEventListener("click", this.chooseColor);
    this.colors.purpleish.removeEventListener("click", this.chooseColor);
    this.colors.greenish.removeEventListener("click", this.chooseColor);
  }

  chooseColor(e) {
    const nameColor = e.target.dataset.color;
    const numberColor = this.colorOfIndex(nameColor);
    this.turnOnSingle(nameColor);
    console.log(this.sequence);
    console.log("sequence " + this.sequence[this.subLevel]);
    console.log("numberColor " + numberColor);
    console.log("level " + this.level);
    console.log("sublevel " + this.subLevel);
    if (numberColor === this.sequence[this.subLevel]) {
      console.log("ko");
      this.subLevel++;
      console.log("sublevel again  " + this.subLevel);

      if (this.subLevel === this.level) {
        this.level++;
        this.deleteClickEventsFromSimon();
        console.log("sigamos");
        if (this.level === LAST_LEVEL + 1) {
          //won
        } else {
          setTimeout(this.nextLevel, 1500);
        }
      }
    } else {
      //lost
    }
  }
}

function startGame() {
  window.game = new Game();
}
