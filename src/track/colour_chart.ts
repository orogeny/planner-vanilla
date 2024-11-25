type Swatch = {
  highlight: string;
  normal: string;
  shaded: string;
  text: string;
};

const other: Swatch = {
  highlight: "#0000ff", // hsl(240, 100, 50)
  normal: "#2020df", // hsl(240,75,50)
  shaded: "#101070", // hsl(240, 75, 24)
  text: "#ffffff",
};

function colourChart(chart: Array<[string, string[]]>) {
  const swatches = chart.reduce((acc, [id, swatch]) => {
    const [highlight, normal, shaded, text] = swatch;

    return acc.set(id, { highlight, normal, shaded, text } as Swatch);
  }, new Map<string, Swatch>());

  return (id: string): Swatch =>
    swatches.has(id) ? (swatches.get(id) as Swatch) : other;
}

export { colourChart, type Swatch };
