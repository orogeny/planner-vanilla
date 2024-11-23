import { TRACK_CATALOG } from "../constants";
import { TrackManager } from "../track/track_manager";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let trackManager: TrackManager;

function setup() {
  setupCanvas();
  setupDragHandlers();

  trackManager = new TrackManager(TRACK_CATALOG);

  draw();
}

function draw() {
  for (const track of trackManager.tracks) {
    track.render(ctx);
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

      console.log(`dropped ${kind} id: ${id} @ (${ev.offsetX}, ${ev.offsetY})`);

      trackManager.add(id, { x: ev.offsetX, y: ev.offsetY });

      draw();
    }
  };
}

export { setup };
