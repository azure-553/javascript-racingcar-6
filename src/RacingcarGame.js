import { Console } from "@woowacourse/mission-utils";
import { ERROR_MESSAGE, GAME_MESSAGE } from "./constants/index.js";
import Car from "./Car.js";
import Validation from "./Validation.js";

class RacingcarGame {
  async startGame() {
    try {
      const cars = await Console.readLineAsync(GAME_MESSAGE.START);
      const validation = new Validation();
      const carsArray = validation.validate(cars);

      const tryCount = await Console.readLineAsync(GAME_MESSAGE.TRY_COUNT);
      if (isNaN(tryCount)) throw new Error(ERROR_MESSAGE.IS_NUMBER);

      Console.print(GAME_MESSAGE.RESULT);
      let countForward = {};

      for (let i = 0; i < tryCount; i++) {
        carsArray.map((car) => {
          const racingCar = new Car(car);
          countForward = racingCar.moveForward(countForward);
        });
        Console.print("\n");
      }

      this.printWinner(countForward);
    } catch (error) {
      throw error;
    }
  }

  printWinner(countForward) {
    let winner = [];
    let winnerValue = 0;

    this.countForward = countForward;
    for (const car in this.countForward) {
      if (this.countForward[car].length > winnerValue) {
        winner = [car];
        winnerValue = this.countForward[car].length;
      } else if (this.countForward[car].length === winnerValue) {
        winner.push(car);
      }
    }

    Console.print(`${GAME_MESSAGE.WINNER}${winner.map((key) => key)}`);
  }
}

export default RacingcarGame;
