import tilepad from "tilepad-sdk";

tilepad.on("properties", ({ properties }) => {
  console.debug("Got properties", properties);
});

tilepad.on("inspector_message", ({ inspector, message }) => {
  console.debug("Got inspector message", inspector.ctx, message);

  switch (message.type) {
    case "PING": {
      inspector.send({ type: "PONG", message: "Got your ping" });
      break;
    }
  }
});

tilepad.on("deep_link", ({ ctx }) => {
  console.debug("got deep link", ctx);
});

tilepad.connect();
