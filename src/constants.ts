import { Swatch } from "./track/colour_chart";
import { StraightSpec } from "./track/straight";

const SLEEPER_LENGTH = 22;

const TRACK_CATALOG: StraightSpec[] = [
  {
    id: "1",
    catno: "TT8002",
    label: "166mm",
    length: 166,
  },
  {
    id: "2",
    catno: "TT8039",
    label: "332mm",
    length: 332,
  },
];

const COLOUR_CHART: Array<[string, string[]]> = [
  ["1", ["#00ffff", "#20dfdf", "#107070", "#ffffff"]],
  ["2", ["#d400ff", "#bf20df", "#601070", "#ffffff"]],
];

const DEFAULT_SWATCH: Swatch = {
  highlight: "#0000ff", // hsl(240, 100, 50)
  normal: "#2020df", // hsl(240,75,50)
  shaded: "#101070", // hsl(240, 75, 24)
  text: "#ffffff",
};

export { COLOUR_CHART, DEFAULT_SWATCH, SLEEPER_LENGTH, TRACK_CATALOG };
