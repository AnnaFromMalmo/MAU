const { Board, Led } = require("johnny-five");
const board = new Board({port: "COM9"});

const express = require("express");
const { request } = require("http");
const { response } = require("express");
const app = express();

let isLightOn = false;

board.on("ready", () => {
  const led = new Led(13);

  app.listem(3001, () => {console.log('listening at 3001')});
  app.use(express.static("public"));

  app.post("/arduino", (request, response) => {

    console.log("post received");

      const data = request.body;
      console.log("data:")
        console.log(request);

      if(isLightOn == false) {
          led.blink(500);
      }

      response.json({
          status: "success",
          data: JSON.stringify(data)
      })
  })

});