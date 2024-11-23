import { Coords } from "../lib/coords";
import { Straight, StraightSpec } from "./straight";

class TrackManager {
  readonly catalog: StraightSpec[] = [];
  readonly tracks: Straight[] = [];

  constructor(catalog: StraightSpec[]) {
    this.catalog = catalog;
  }

  add(productId: string, coords: Coords) {
    const spec = this.catalog.find((p) => p.id === productId);

    if (spec === undefined) {
      return;
    }

    const track = new Straight(spec);
    const offset = track.getDropOffset();
    const position = { x: coords.x - offset.x, y: coords.y - offset.y };
    track.setPosition(position);

    this.tracks.push(track);
  }
}

export { TrackManager };
