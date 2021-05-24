const COLORS = ["green", "red", "yellow", "blue"]; // Posible colors

function SimonGame() {
  const self = this; // This is a referencia to the values of the game, which it will create a variable to reuse its value in another object.
  this.sequence = []; // colors sequence
  this.userClickCount = 0; // amount of times user will click on it
  this.level = 1;

  this.init = function() { // initialize all the game sequence
    this.generateSequence();
    this.showSequence();
    document.querySelectorAll("button").forEach(function(button) { // Iniciate the botones and awaits for a respond from the user.
      button.addEventListener("click", self.checkUserInput);
    });
  };

  this.generateSequence = function() { // This function creates an array with de sequence of the random colors that the game will show.
    const randomColor = Math.floor(Math.random() * 4);
    this.sequence.push(COLORS[randomColor]);
  };

  this.showSequence = function() {
    let current = 0;

    const interval = setInterval(function() {
      if (!self.sequence[current]) { // if self sequence is not there...
        clearInterval(interval); // we clear the interval, and we exit the function
        return;
      }

      const button = document.getElementById(self.sequence[current]);
      button.classList.add("active");

      setTimeout(function() { // iluminates the buttons, and waits a while
        button.classList.remove("active"); //
      }, 1000); // time that setTimeOut waits
      current++; // ncrease the actual element and activates the interval
    }, 2000); // 2 Seconds interval that turns off 1 second after the interval set on the previous line.
  };

  this.checkUserInput = function() {
    const colorInput = this.getAttribute("id"); // Calls the attribute of a botton that we click. In this case, the id.
    const currentColor = self.sequence[self.userClickCount];

    if (currentColor !== colorInput) {
      self.gameOver(); //
      return;
    }

    self.userClickCount++;
    if (self.userClickCount === self.sequence.length) {
    //  finished round
      self.finishedRound();
    }
  };

  this.gameOver = function() {
    window.alert("GAME OVER ");
  };

  this.finishedRound = function() { //  This function increases the sequence with the level, consecutive.
    this.generateSequence();
    this.showSequence();
    this.userClickCount = 0;
    this.level++;
    document.getElementById("counter").innerHTML = self.level;
  };
}

const game = new SimonGame();
game.init();

// console.log(game.sequence);
// Would be great to add some more features like :

// Sounds
// Start botton, so it doesnt start as soon as we site loads
// Some nice title + background
// Some more extras