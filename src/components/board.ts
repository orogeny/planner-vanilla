import { Straight, StraightSpec } from "../track/straight";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

function setup() {
  setupCanvas();
  setupDragHandlers();

  drawStraight();
}

function drawStraight() {
  const specs: StraightSpec[] = [
    {
      id: "1",
      catno: "TT8002",
      label: "166mm",
      length: 166,
    },
    {
      id: "2",
      catno: "TT8039",
      label: "332mm",
      length: 332,
    },
  ];

  const tt8002 = new Straight(specs[0]);
  tt8002.setPosition(216, 50);

  const tt8039 = new Straight(specs[1]);
  tt8039.setPosition(50, 100);

  tt8002.render(ctx);
  tt8039.render(ctx);
}

// Canvas Setup

function setupCanvas() {
  canvas = document.querySelector<HTMLCanvasElement>("canvas.board")!;
  ctx = canvas.getContext("2d")!;

  const { width, height } = canvas.parentElement!.getBoundingClientRect();

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  canvas.width = width;
  canvas.height = height;
}

// Drag Event handlers

function setupDragHandlers() {
  canvas.ondragover = (ev: DragEvent) => {
    ev.preventDefault();

    ev.dataTransfer!.dropEffect = "copy";
  };

  canvas.ondrop = (ev: DragEvent) => {
    const dropped = ev.dataTransfer?.getData("text/plain");

    if (dropped) {
      const [kind, id] = dropped.split("#");

      console.log(`dropped kind: ${kind} id: ${id}`);
    }
  };
}

export { setup };
