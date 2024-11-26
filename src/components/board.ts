import { Coords } from "../lib/coords";
import { StraightSpec } from "../track/straight";
import { TrackManager } from "../track/track_manager";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let viewWidth: number;
let viewHeight: number;

let trackManager: TrackManager;

let zIndex = 0;
let selected: { id: string; coords: Coords } | undefined;

function setup(trackCatalog: StraightSpec[]) {
  setupCanvas();
  setupDragHandlers();
  setupMouseHandlers();

  trackManager = new TrackManager(trackCatalog);

  requestAnimationFrame(draw);
}

function draw() {
  const zIndexOrder = trackManager.tracks
    .slice()
    .sort((a, b) => a.zIndex - b.zIndex);

  ctx.clearRect(0, 0, viewWidth, viewHeight);

  for (const track of zIndexOrder) {
    track.render(ctx);
  }

  if (selected !== undefined) {
    const track = trackManager.tracks.find((t) => t.id === selected?.id);

    track?.render(ctx);
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

      const track = trackManager.add(id, { x: ev.offsetX, y: ev.offsetY });
      track?.setZIndex(zIndex++);

      draw();
    }
  };
}

// Mouse Event handlers

function setupMouseHandlers() {
  canvas.onmousedown = (ev: MouseEvent) => {
    const mouseXY = { x: ev.offsetX, y: ev.offsetY };

    const clicked = trackManager.getTrackAt(mouseXY);

    if (clicked.length === 0) {
      return;
    }

    const track = clicked.reduce((top, t) => (t.zIndex > top.zIndex ? t : top));

    selected = { id: track.id, coords: { x: track.x, y: track.y } };

    track.onMouseDown(mouseXY);
  };

  canvas.onmouseup = () => {
    const track = trackManager.tracks.find((t) => t.id === selected?.id);

    if (track !== undefined) {
      if (selected !== undefined) {
        if (selected.coords.x !== track.x || selected.coords.y !== track.y) {
          track.setZIndex(zIndex++);
        }
        selected = undefined;
      }
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
