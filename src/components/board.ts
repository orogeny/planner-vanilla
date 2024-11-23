import { TRACK_CATALOG } from "../constants";
import { TrackManager } from "../track/track_manager";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let trackManager: TrackManager;

function setup() {
  setupCanvas();
  setupDragHandlers();

  trackManager = new TrackManager(TRACK_CATALOG);

  drawStraight();
}

function drawStraight() {
  const tt8002 = trackManager.add("1");

  if (tt8002 !== undefined) {
    tt8002.setPosition(216, 50);
    tt8002.render(ctx);
  }

  const tt8039 = trackManager.add("2");

  if (tt8039 !== undefined) {
    tt8039.setPosition(50, 100);
    tt8039.render(ctx);
  }
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
