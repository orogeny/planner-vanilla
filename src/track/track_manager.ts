import { COLOUR_CHART } from "../constants";
import { Vector } from "../lib/vector";
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

  add(productId: string, vector: Vector) {
    const spec = this.catalog.find((p) => p.id === productId);

    if (spec === undefined) {
      return null;
    }

    const track = new Straight(spec);
    const position = vector.subtract(track.centre);
    track.setPosition(position);
    track.setSwatch(this.colourChart(spec.id));

    this.tracks.push(track);

    return track;
  }

  getTrackAt(vector: Vector) {
    return this.tracks.filter((t) => t.encompasses(vector));
  }
}

export { TrackManager };
