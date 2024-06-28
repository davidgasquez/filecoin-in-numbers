import * as Plot from "npm:@observablehq/plot";
import * as d3 from "d3";

Plot.plot({
    width: width,
    x: { tickFormat: d3.utcFormat("%Y"), label: "Date" },
    y: { grid: true, label: "Average Onboarded PiBs" },
    marks: [
        Plot.lineY(m, {
            x: "date",
            y: "onboarded_data_pibs",
            stroke: "var(--theme-foreground-fainter)",
        }),
        Plot.lineY(m, {
            x: "date",
            y: "onboarded_data_pibs_30d_avg",
            stroke: "var(--theme-foreground-focus)",
            strokeWidth: 2,
            tip: {
                format: {
                    x: d => d3.utcFormat("%Y-%m-%d")(d),
                    y: d => d.toFixed(2)
                }
            }
        }),
    ],
})
