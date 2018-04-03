import Board from "./board.js";

const WEATHER_KEYS = {
  2: "thunderstorm",
  3: "drizzle",
  5: "rain",
  6: "snow",
  800: "clear",
  7: "hazy",
  8: "cloudy",
  90: "extreme",
  9: "breezy"
};

class Game {
  constructor() {
    this.board = new Board();
    this.selected = null;
    this.setListeners();
    this.mapGrid();
    this.weatherBackground = this.weatherBackground.bind(this);
  }

  setListeners() {
    $r(".add-num").on("click", e => {
      $r(".solved-status").empty();
      const node = $r(`.${this.selected}`);
      node.removeClass("selected");
      node.html(e.target.value);
      this.board.grid[this.selected[7]][this.selected[5]] = e.target.value;
      this.selected = null;
    });

    $r(".cell").on("click", e => {
      if (
        $r(e.currentTarget)
          .attr("class")
          .split(" ")
          .indexOf("fixed") === -1
      ) {
        if (this.selected) {
          $r(`.${this.selected}`).removeClass("selected");
        }
        $r(e.currentTarget).addClass("selected");
        this.selected = e.currentTarget.attributes.value.value;
      }
    });

    $r(".reset").on("click", e => {
      this.board.resetGrid();
      this.mapGrid();
    });

    $r(".check").on("click", e => {
      const $solved = $r(".solved-status");
      if (this.board.solved()) {
        $solved.html("You Solved it!");
      } else {
        $solved.html("Not Yet Solved");
      }
    });

    $r(".weather").on("click", e => {
      const weatherBackground = this.weatherBackground;
      $r.ajax({
        type: "GET",
        url:
          "https://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bcb83c4b54aee8418983c2aff3073b3b",
        success(data) {
          weatherBackground(data.weather[0].id);
        },
        error() {
          console.error("An error occurred.");
        }
      });
    });
  }

  weatherBackground(code) {
    let weather;
    if (code === 800) {
      weather = WEATHER_KEYS[code];
    } else if (Math.floor(code / 10) === 90) {
      weather = WEATHER_KEYS[Math.floor(code / 10)];
    } else {
      weather = WEATHER_KEYS[Math.floor(code / 100)];
    }
    $r("body").addClass(weather);
  }

  mapGrid() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cellFillValue = this.board.grid[row][col];
        const $cellToFill = $r(`.cell-${row}-${col}`);
        if (cellFillValue !== "") {
          $cellToFill.addClass("fixed");
        } else {
          $cellToFill.addClass("mutable");
        }
        $cellToFill.html(`${cellFillValue}`);
      }
    }
  }
}

export default Game;
