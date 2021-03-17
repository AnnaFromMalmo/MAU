const { Board, Servo } = require("johnny-five");
const board = new Board();

const express = require("express");

const app = express();

let servoOn = false;

// when the arduino is connected run the function
board.on("ready", () => {
  // set the servo to pin 10 and also set the starting position to 180 degrees
  const servo = new Servo({ pin: 10, startAt: 180 });

  // listen to local port 3001 using the express API to read the
  app.listen(3001, () => {});
  app.use(express.static("public"));
  app.use(express.json());

  // functions for setting the different movements for indicating soil moisture

  function thxFast() {
    servo.sweep({
      range: [180, 155],
      interval: 200,
    });
    setTimeout(function stop() {
      servo.stop();
      servo.home(180);
      servoOn = false;
    }, 750);
  }

  function thxSlow() {
    servo.sweep({
      range: [180, 150],
      interval: 600,
    });
    setTimeout(function stop() {
      servo.stop();
      servo.home(180);
      servoOn = false;
    }, 2500);
  }

  function fast() {
    servo.sweep({
      range: [180, 166],
      interval: 150,
    });
    setTimeout(function stop() {
      servo.stop();
      servo.home(180);
      servoOn = false;
    }, 5000);
  }
  function slow() {
    servo.sweep({
      range: [180, 150],
      interval: 600,
    });
    setTimeout(function stop() {
      servo.stop();
      servo.home(180);
      servoOn = false;
    }, 8000);
  }

  app.get("/plantMove/:type", (request, response) => {
    console.log(request.params.type);
    if (servoOn === false) {
      servoOn = true;
      if (request.params.type === "fast") {
        fast();
      }
      if (request.params.type === "slow") {
        slow();
      }
      if (request.params.type === "thxFast") {
        thxFast();
      }
      if (request.params.type === "thxSlow") {
        thxSlow();
      }
    }
    response.json({
      status: "success",
    });
  });
});
