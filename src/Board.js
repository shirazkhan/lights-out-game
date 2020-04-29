import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  state = {
    win: false,
    cellState: {}
  }

  cellList = new Set();
  extractedLetters = new Set();
  extractedNums = new Set();


  extractLetters = () => {
    
    this.cellList.forEach((cell) => { // Loop through the 'cellList',
      this.extractedLetters.add(cell[0]); // & add a letter to the 'extractedLetters' Set,
      this.extractedNums.add(cell[1]); // & add a number to the 'extractedNums' Set
    });

  }

  generateCoordinates = (uid) => {

    this.extractLetters();

    let extractedLetters = ["a","b","c","d","e"];
    let extractedNums = [...this.extractedNums];
    let coords = {};

    let up;
    for(let i = 0; i < extractedLetters.length; i++){
      if(uid[0] !== extractedLetters[0] && uid[0] === extractedLetters[i]){
        up = extractedLetters[i-1] + uid[1];
        coords.up = up;
        break;
      }
    }

    let down;
    for(let i = 0; i < extractedLetters.length; i++){
      if(uid[0] !== extractedLetters[extractedLetters.length-1] && uid[0] === extractedLetters[i]){
        down = extractedLetters[i+1] + uid[1];
        coords.down = down;
        break;
      }
    }

    let left;
    for(let i = 0; i < extractedLetters.length; i++){
      if(uid[1] !== "1"){
        left = uid[0] + (uid[1] - 1);
        coords.left = left;
        break;
      }
    }

    let right;
    for(let i = 0; i < extractedLetters.length; i++){
      if(uid[1] !== extractedNums[extractedNums.length-1]){
        right = uid[0] + (parseInt(uid[1]) + 1);
        coords.right = right;
        break;
      }
    }

    return coords
  }

  generateCells = (char) => {
    let ids = [];
    [...Array(5)].forEach((x,i) => {
      ids.push(char + (i + 1));
      this.cellList.add(ids[i]);
    });
    let temp = [...Array(5)].map((x,i) => {
      return <Cell toggle={this.toggleCells} coords={this.generateCoordinates(ids[i])} id={ids[i]} key={ids[i]} on={this.state.cellState[ids[i]]} />
    });
    return temp
    
  }

  toggleCells = (cell,coords) => {
    /* Change the state of cellState: */
    this.setState(st => {
      st.cellState[cell] = !st.cellState[cell]; // Main Cell
      if(coords.hasOwnProperty("up")) {st.cellState[coords.up] = !st.cellState[coords.up];}  // Up Cell
      if(coords.hasOwnProperty("right")) {st.cellState[coords.right] = !st.cellState[coords.right];}  // Right Cell
      if(coords.hasOwnProperty("down")) {st.cellState[coords.down] = !st.cellState[coords.down];}  // Down Cell
      if(coords.hasOwnProperty("left")) {st.cellState[coords.left] = !st.cellState[coords.left];} // Left Cell
      st.win = (Object.values(st.cellState).every(cell => cell === false)) // Check Win
      return st
    });
  }

  componentDidMount = () => {
    this.newGame();
    this.forceUpdate();
  }

  newGame = () => {
    /* Randomize the state of cells on initialization */
    this.setState((st) => {
      this.cellList.forEach((cell) => {
        let random = Math.floor(Math.random() * 2);
        st.cellState[cell] = (random ? true : false);
        return st
      });
    });
  }



  render() {
    return(
      <div>
        <h1>{this.state.win ? "You Win!" : "Lights Out"}</h1>
        <table className="Board-grid">
          <tbody>
            <tr>
              {this.generateCells("a")}
            </tr>
            <tr>
              {this.generateCells("b")}
            </tr>
            <tr>
              {this.generateCells("c")}
            </tr>
            <tr>
              {this.generateCells("d")}
            </tr>
            <tr>
              {this.generateCells("e")}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}


export default Board;
