import { DEFAULT_SWATCH } from "../constants";

type Swatch = {
  highlight: string;
  normal: string;
  shaded: string;
  text: string;
};

type ColourChart = (key: string) => Swatch;

function colourLookup(chart: Array<[string, string[]]>): ColourChart {
  const swatches = chart.reduce((acc, [id, swatch]) => {
    const [highlight, normal, shaded, text] = swatch;

    return acc.set(id, { highlight, normal, shaded, text } as Swatch);
  }, new Map<string, Swatch>());

  return (id: string): Swatch =>
    swatches.has(id) ? (swatches.get(id) as Swatch) : DEFAULT_SWATCH;
}

export { colourLookup, type ColourChart, type Swatch };
