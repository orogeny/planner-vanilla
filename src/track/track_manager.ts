import { COLOUR_CHART } from "../constants";
import { Coords } from "../lib/coords";
import { ColourChart, colourLookup } from "./colour_chart";
import { Straight, StraightSpec } from "./straight";

class TrackManager {
  readonly catalog: StraightSpec[] = [];
  readonly tracks: Straight[] = [];
  readonly colourChart: ColourChart;

  constructor(catalog: StraightSpec[]) {
    this.catalog = catalog;

    this.colourChart = colourLookup(COLOUR_CHART);
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
    track.setSwatch(this.colourChart(spec.id));

    this.tracks.push(track);
  }

  getTracksAt(coords: Coords) {
    return this.tracks.filter((t) => t.encompasses(coords));
  }
}

export { TrackManager };
