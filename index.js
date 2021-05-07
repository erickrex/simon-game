const startButton = document.getElementById("startButton");

const blueish = document.getElementById("blueish");
const purpleish = document.getElementById("purpleish");
const orangish = document.getElementById("orangish");
const greenish = document.getElementById("greenish");
const LAST_LEVEL = 2;

class Game {
  constructor() {
    this.initializeGame();
    this.createSequence();
    setTimeout(() => this.nextLevel(), 500);
  }
  //wongame -> startgame is not defined
  initializeGame() {
    this.nextLevel = this.nextLevel.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    this.toggleStart();
    this.level = 1;
    this.colors = {
      blueish,
      purpleish,
      orangish,
      greenish,
    };
  }

  toggleStart() {
    startButton.classList.add("hide");
  }

  createSequence() {
    this.sequence = new Array(LAST_LEVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  nextLevel() {
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
    if (numberColor === this.sequence[this.subLevel]) {
      this.subLevel++;
      if (this.subLevel === this.level) {
        this.level++;
        this.deleteClickEventsFromSimon();
        if (this.level === LAST_LEVEL + 1) {
          this.wonTheGame();
        } else {
          setTimeout(this.nextLevel, 1500);
        }
      }
    } else {
      this.lostTheGame();
    }
  }

  wonTheGame() {
    Swal.fire({
      icon: "success",
      title: "YES!!",
      text: "You have won buddy!",
      footer: "<a href>Nice one</a>",
    }).then(this.initializeGame.bind(this));
  }

  lostTheGame() {
    Swal.fire({
      icon: "error",
      title: "NEIN!!",
      text: "You have LOST buddy!",
      footer: "<a href>Try again</a>",
    }).then(() => {
      this.deleteClickEventsFromSimon();
      this.initializeGame();
    });
  }
}

function startGame() {
  window.game = new Game();
}
