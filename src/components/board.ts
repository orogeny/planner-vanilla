import { StraightSpec } from "../track/straight";
import { TrackManager } from "../track/track_manager";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let viewWidth: number;
let viewHeight: number;

let trackManager: TrackManager;

function setup(trackCatalog: StraightSpec[]) {
  setupCanvas();
  setupDragHandlers();
  setupMouseHandlers();

  trackManager = new TrackManager(trackCatalog);

  requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(0, 0, viewWidth, viewHeight);

  for (const track of trackManager.tracks) {
    track.render(ctx);
  }

  requestAnimationFrame(draw);
}

// Canvas Setup

function setupCanvas() {
  canvas = document.querySelector<HTMLCanvasElement>("canvas.board")!;
  ctx = canvas.getContext("2d")!;

  const { width, height } = canvas.parentElement!.getBoundingClientRect();

  viewWidth = width;
  viewHeight = height;

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
      const [_, id] = dropped.split("#");

      trackManager.add(id, { x: ev.offsetX, y: ev.offsetY });

      draw();
    }
  };
}

// Mouse Event handlers

function setupMouseHandlers() {
  canvas.onmousedown = (ev: MouseEvent) => {
    const mouseXY = { x: ev.offsetX, y: ev.offsetY };

    for (const track of trackManager.tracks) {
      track.onMouseDown(mouseXY);
    }
  };

  canvas.onmouseup = () => {
    for (const track of trackManager.tracks) {
      track.onMouseUp();
    }
  };

  canvas.onmousemove = (ev: MouseEvent) => {
    const mouseXY = { x: ev.offsetX, y: ev.offsetY };

    for (const track of trackManager.tracks) {
      track.dragGrabbed(mouseXY);
    }
  };
}

export { setup };
