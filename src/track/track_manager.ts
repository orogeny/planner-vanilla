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

    console.log(`adding ${productId} @ (${coords.x}, ${coords.y})`);

    const track = new Straight(spec);
    track.setPosition(coords);

    console.log(
      `added ${track.trackId}:${track.catno} @ (${track.x}, ${track.y})`,
    );

    this.tracks.push(track);
  }
}

export { TrackManager };
