import React, { Component } from "react";
import shuffle from "lodash.shuffle";
import "./App.css";

const NB = 6;
const numbers = shuffle(
  [...Array(NB).fill(0), ...Array(NB).fill(0)].map((num, i) => i % 6)
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: numbers,
      turnedCards: [],
      winCards: [],
      counterCard: 0,
      hideCard: false
    };
    this.timeoutId = null;
  }

  checkCombinaison = () => {
    const { grid, turnedCards, winCards, counterCard } = this.state;
    console.log(turnedCards);

    if (turnedCards.length === 2) {
      const [index1, index2] = turnedCards;
      if (grid[index1] === grid[index2])
        return this.setState({
          winCards: [...winCards, ...turnedCards],
          turnedCards: [],
          counterCard: counterCard + 1
        });
      else {
        this.timeoutId = setTimeout(() => {
          this.setState({
            turnedCards: []
          });
        }, 1000);
      }
    }
  };

  showCard = index => {
    clearTimeout(this.timeoutId);
    this.setState(({ turnedCards, winCards, counterCard }) => {
      if (turnedCards.includes(index) || winCards.includes(index)) return null;

      if (turnedCards.length === 2) {
        return {
          turnedCards: [index]
        };
      }

      return { turnedCards: [...turnedCards, index] };
    }, this.checkCombinaison);
  };

  render() {
    const { turnedCards, winCards } = this.state;
    return (
      <div className="App">
        {this.state.grid.map((row, index) => (
          <div className="App-map" onClick={this.showCard.bind(null, index)}>
            <a
              className={`App-a ${
                [...winCards, ...turnedCards].includes(index)
                  ? "App-visible"
                  : ""
              }`}
            >
              {row}
            </a>
          </div>
        ))}

        <h2 style={{ "text-transform": "uppercase" }}>
          carte trouvé :{" "}
          <span style={{ color: "red" }}>{this.state.counterCard}</span>{" "}
        </h2>
        <h1 style={{ color: "red", "text-transform": "uppercase" }}>
          {this.state.counterCard === 6 ? "gagné" : ""}
        </h1>
      </div>
    );
  }
}

export default App;
