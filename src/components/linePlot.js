import * as Plot from "npm:@observablehq/plot";
import * as d3 from "d3";

export function linePlot(width, data, x, y) {
    return Plot.plot({
        width: width,
        x: { tickFormat: d3.utcFormat("%Y"), label: "Date" },
        y: { grid: true },
        marks: [
            Plot.lineY(data, {
                x: x,
                y: y,
                tip: {
                    format: {
                        x: d => d3.utcFormat("%Y-%m-%d")(d),
                        y: d => d.toFixed(2)
                    }
                }
            }),
        ],
    });
}
