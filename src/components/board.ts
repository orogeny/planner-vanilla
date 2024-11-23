import { Straight } from "../track/straight";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

function setup() {
  setupCanvas();
  setupDragHandlers();

  drawStraight();
}

function drawStraight() {
  const straight = new Straight("ZTT001", 166);

  straight.render(ctx);
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
