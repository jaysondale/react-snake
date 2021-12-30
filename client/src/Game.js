import React from "react";
import config from 'react-global-configuration';
import { SnakeBlock, FoodBlock } from "./GameBlocks";


class Game extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.getWindowSize = this.getWindowSize.bind(this);

    const frameSize = {
      width: Math.floor(window.innerWidth / this.props.blockSize),
      height: Math.floor(window.innerHeight / this.props.blockSize)
    };
    this.state = {
      snake: [{x: 0, y: 0}, {x: 0, y: 1}],
      frameSize: frameSize,
      snakeStep: {x: 0, y: 1},
      food: {
        x: Math.floor(Math.random() * frameSize.width),
        y: Math.floor(Math.random() * frameSize.height)
      },
      foodCollision: false
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.setDirection);
    window.addEventListener("resize", this.getWindowSize);
    this.gameInterval = setInterval(this.gameLoop, config.get('gameDelay'));
  }

  componentWillUnmount() {
    clearInterval(this.gameInterval);
    document.removeEventListener("keydown", this.setDirection);
    window.removeEventListener("resize", this.getWindowSize);
  }

  gameLoop = () => {
    var snake = this.state.snake;
    const snakeHead = snake[snake.length - 1];
    const nextBlock = this.getNextBlock(snakeHead);
    const newSnake = [
      ...snake.slice(this.state.foodCollision ? 0 : 1, snake.length),
      nextBlock
    ]
    this.setState({
      snake: newSnake,
      foodCollision: false
    });
  }

  setDirection = e => {
    switch (e.key) {
      case "ArrowUp":
      case "w":
        this.setState({snakeStep: {x: 0, y: -1}});
        break;
      case "ArrowRight":
      case "d":
        this.setState({snakeStep: {x: 1, y: 0}});
        break;
      case "ArrowDown":
      case "s":
        this.setState({snakeStep: {x: 0, y: 1}});
        break;
      case "ArrowLeft":
      case "a":
        this.setState({snakeStep: {x: -1, y: 0}});
    }
  }

  getWindowSize() {
    this.setState({frameSize: {
      width: Math.floor(window.innerWidth / this.props.blockSize),
      height: Math.floor(window.innerHeight / this.props.blockSize)
    }});
  }

  generateFoodLocation() {
    this.setState({food: {
      x: Math.floor(Math.random() * this.state.frameSize.width),
      y: Math.floor(Math.random() * this.state.frameSize.height)
    }});
  }

  getNextBlock(head) {
    var next_x = head.x + this.state.snakeStep.x;
    var next_y = head.y + this.state.snakeStep.y;

    // Validate that next block position is within bounds
    if (next_x > this.state.frameSize.width - 1) {
      next_x = 0
    } else if (next_x < 0){
      next_x = this.state.frameSize.width - 1
    }
    if (next_y > this.state.frameSize.height - 1) {
      next_y = 0
    } else if (next_y < 0) {
      next_y = this.state.frameSize.height - 1
    }

    // Check collision with self
    for (let block of this.state.snake) {
      if (block.x === next_x && block.y === next_y) {
        // Handle collision
        console.log("Collision detected!");
      }
    }

    // Check collision with food
    if (next_x == this.state.food.x && next_y == this.state.food.y) {
      this.setState({
        foodCollision: true
      });
      this.generateFoodLocation();
    }

    return {
      x: next_x,
      y: next_y
    }
  }

  render() {
    return (
      <div id="game-frame">
        <FoodBlock x={this.state.food.x} y={this.state.food.y}></FoodBlock>
        {this.state.snake.map((coords, i) => {
          return (<SnakeBlock key={i} x={coords.x} y={coords.y}></SnakeBlock>)
        })}
      </div>
    )
  }
}

export default Game;