import { Vector } from "../lib/vector";
import { Straight, StraightSpec } from "../track/straight";
import { TrackManager } from "../track/track_manager";

type DraggableItem = { track: Straight; start: Vector; mouse: Vector };

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

let viewWidth: number;
let viewHeight: number;

let trackManager: TrackManager;

let zIndex = 0;
let draggableItem: DraggableItem | null = null;
let selectedItem: Straight | null = null;

function setup(trackCatalog: StraightSpec[]) {
  canvas = document.querySelector<HTMLCanvasElement>("canvas.board")!;
  ctx = canvas.getContext("2d")!;

  trackManager = new TrackManager(trackCatalog);

  // Setup canvas size;

  const { width, height } = canvas.parentElement!.getBoundingClientRect();

  viewWidth = width;
  viewHeight = height;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  canvas.width = width;
  canvas.height = height;

  // Setup canvas drag event handlers

  canvas.ondragover = (ev: DragEvent) => {
    ev.preventDefault();

    ev.dataTransfer!.dropEffect = "copy";
  };

  canvas.ondrop = (ev: DragEvent) => {
    const dropped = ev.dataTransfer?.getData("text/plain");

    const mouseXY = Vector.of(ev.offsetX, ev.offsetY);

    if (dropped !== undefined) {
      const [_, id] = dropped.split("#");

      const track = trackManager.add(id, mouseXY);

      if (track !== null) {
        track?.setZIndex(zIndex++);

        draw();
      }
    }
  };

  // Setup canvas mouse event handlers

  canvas.onmousedown = (ev: MouseEvent) => {
    console.log("canvas.onmousedown");

    const mouseXY = Vector.of(ev.offsetX, ev.offsetY);

    const top = getTop(mouseXY);

    if (top !== null) {
      draggableItem = {
        track: top,
        start: top.position,
        mouse: mouseXY,
      };
      top.fillColour = "highlight";
      canvas.addEventListener("mousemove", mouseMoveHandler);
    }
  };

  canvas.onmouseup = (ev: MouseEvent) => {
    console.log("canvas.onmouseup");

    if (draggableItem !== null) {
      const mouseXY = Vector.of(ev.offsetX, ev.offsetY);

      if (!draggableItem.mouse.equals(mouseXY)) {
        draggableItem.track.setZIndex(zIndex++);
      }

      draggableItem = null;
    }

    canvas.removeEventListener("mousemove", mouseMoveHandler);
  };

  canvas.onclick = (ev: MouseEvent) => {
    console.log("canvas.onclick");

    const top = getTop(Vector.of(ev.offsetX, ev.offsetY));

    if (selectedItem === null && top !== null) {
      selectedItem = top;
      selectedItem.fillColour = "highlight";
    } else if (selectedItem !== null && top === null) {
      selectedItem.fillColour = "normal";
      selectedItem = null;
    } else if (selectedItem !== null && top !== null) {
      if (selectedItem.id === top.id) {
        selectedItem.fillColour = "normal";
        selectedItem = null;
      } else {
        selectedItem.fillColour = "normal";
        selectedItem = top;
        selectedItem.fillColour = "highlight";
      }
    }
  };

  requestAnimationFrame(draw);
}

// Mousemove handler only hooked up when mouse button is being held down

function mouseMoveHandler(ev: MouseEvent) {
  if (draggableItem !== null) {
    const mouseXY = Vector.of(ev.offsetX, ev.offsetY);

    const position = mouseXY
      .add(draggableItem.start)
      .subtract(draggableItem.mouse);

    draggableItem.track.setPosition(position);
  }
}

function getTop(vector: Vector) {
  const tracks = trackManager.tracks.filter((t) => t.encompasses(vector));

  if (tracks.length === 0) {
    return null;
  } else {
    return tracks.reduce((top, t) => (t.zIndex > top.zIndex ? t : top));
  }
}

function draw() {
  const zIndexOrder = trackManager.tracks
    .slice()
    .sort((a, b) => a.zIndex - b.zIndex);

  ctx.clearRect(0, 0, viewWidth, viewHeight);

  for (const track of zIndexOrder) {
    track.render(ctx);
  }

  draggableItem?.track.render(ctx);

  requestAnimationFrame(draw);
}

export { setup };
