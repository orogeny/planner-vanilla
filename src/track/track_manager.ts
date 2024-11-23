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
      console.log(`unknown track product id: "${productId}"`);
      return;
    }

    const track = new Straight(spec);
    track.setPosition(coords);

    this.tracks.push(track);

    return track;
  }
}

export { TrackManager };
