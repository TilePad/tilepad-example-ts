import tilepad, { Inspector } from "@tilepad/sdk";

interface Properties {
  counter?: number;
}

let currentInspector: Inspector | null = null;

let counter = 0;

function increase(amount: number) {
  counter += amount;
  if (currentInspector) {
    currentInspector.send({ type: "COUNTER", value: counter });
  }
}

function decrease(amount: number) {
  counter -= amount;
  if (currentInspector) {
    currentInspector.send({ type: "COUNTER", value: counter });
  }
}

tilepad.getProperties<Properties>().then((properties) => {
  counter = Number(properties.counter ?? 0);
});

tilepad.on("inspector_open", ({ inspector }) => {
  currentInspector = inspector;
});

tilepad.on("inspector_message", ({ inspector, message }) => {
  console.debug("Got inspector message", inspector.ctx, message);

  switch (message.type) {
    case "GET_COUNTER": {
      inspector.send({ type: "COUNTER", value: counter });
      break;
    }
  }
});

tilepad.on("tile_clicked", ({ ctx, properties }) => {
  switch (ctx.action_id) {
    case "increase": {
      increase(Number(properties.amount ?? 1));
      break;
    }
    case "decrease": {
      decrease(Number(properties.amount ?? 1));
      break;
    }
  }
});

tilepad.on("deep_link", ({ ctx }) => {
  console.debug("got deep link", ctx);
});

tilepad.connect();
