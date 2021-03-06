import { isEqual } from "lodash";

class Board {
  constructor() {
    this.grid = this.newGrid();
    this.resetGrid.bind(this);
  }

  newGrid() {
    return [
      ["", "", "", "", "", "", "", "", 3],
      ["", 5, 8, 6, "", "", "", "", 2],
      ["", "", 4, "", 7, "", "", "", ""],
      ["", "", "", "", 5, 8, 6, "", 1],
      ["", "", "", 4, "", 9, "", "", ""],
      [4, "", 2, 7, 3, "", "", "", ""],
      ["", "", "", "", 8, "", 9, "", ""],
      [6, "", "", "", "", 3, 8, 7, ""],
      [7, "", "", "", "", "", "", "", ""]
    ];
  }

  resetGrid() {
    this.grid = this.newGrid();
  }
  answer() {
    return [
      [1, 7, 6, 8, 9, 2, 4, 5, 3],
      [3, 5, 8, 6, 1, 4, 7, 9, 2],
      [2, 9, 4, 3, 7, 5, 1, 6, 8],
      [9, 3, 7, 2, 5, 8, 6, 4, 1],
      [8, 1, 5, 4, 6, 9, 2, 3, 7],
      [4, 6, 2, 7, 3, 1, 5, 8, 9],
      [5, 4, 3, 1, 8, 7, 9, 2, 6],
      [6, 2, 1, 9, 4, 3, 8, 7, 5],
      [7, 8, 9, 5, 2, 6, 3, 1, 4]
    ];
  }

  solved() {
    return isEqual(this.grid, this.answer());
  }
}

export default Board;
