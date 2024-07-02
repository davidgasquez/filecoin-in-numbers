// Plot.plot({
//     width: width,
//     x: { tickFormat: d3.utcFormat("%Y"), label: "Date" },
//     y: { grid: true, label: "Average Onboarded PiBs" },
//     marks: [
//         Plot.lineY(m, {
//             x: "date",
//             y: "onboarded_data_pibs",
//             stroke: "var(--theme-foreground-fainter)",
//         }),
//         Plot.lineY(m, {
//             x: "date",
//             y: "onboarded_data_pibs_30d_avg",
//             stroke: "var(--theme-foreground-focus)",
//             strokeWidth: 2,
//             tip: {
//                 format: {
//                     x: d => d3.utcFormat("%Y-%m-%d")(d),
//                     y: d => d.toFixed(2)
//                 }
//             }
//         }),
//     ],
// })

import * as Plot from "npm:@observablehq/plot";

export function monthlyAverageLinePlot(width, data, x, y, yLabel, title) {
    return Plot.plot({
        title: title,
        caption: "Red line represents the 30-day average",
        x: { label: "Date" },
        y: { label: yLabel, grid: true },
        width: width,
        marks: [
            Plot.ruleY([0]),
            Plot.lineY(data, {
                x: x,
                y: y,
                interval: "day",
                stroke: "var(--theme-foreground-fainter)",
                curve: "basis",
            }),
            Plot.lineY(data, Plot.windowY(
                30, {
                x: x,
                y: y,
                stroke: "var(--theme-foreground-focus)",
                tip: true
            })
            ),
        ]
    })
}
