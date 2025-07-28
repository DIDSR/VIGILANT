import { DataTable } from "./display.js";
import vigilant from "./vigilant.js";
import { aggregate, confidenceInterval, unique } from "./utilities.js";
import { LinePlot } from "./plot.js"

export function displayResults(data, {
    xLabel='Version',
    yLabel="Performance",
}={}) { // assumes specific html structure
    let $;
    // Display Raw data
    $ = d3.select('#raw-data')
    $.selectAll('table.data-table').remove()
    $.node().append(DataTable(data))
    // run the vigilant measurements
    let longResults = vigilant(data); // long-form results
    let versions = unique(longResults.map(d => d.version))
    // display long-form results + download link (if relevant)
    d3.select('#results-data').selectAll('table.data-table').remove()
    $ = d3.select("#results-data-long")
    if (unique(longResults.map(d => d.repetition)).length > 1) {
        $.node().append(DataTable(longResults))
    } else {
        $.attr('hidden', true);
    }
    $.select('summary > a[download]')
        .attr('href', window.URL.createObjectURL(new Blob([d3.csvFormat(longResults)], {'type':'text/csv'})))
    let results = aggregate(longResults, confidenceInterval, "CI")
    // add the summary measurement datatable + download link
    let summData = results.map(d => ({version:d.version, measurement:d.measurement, mean:d.CI.mean}));
    $.node().before(DataTable(summData));
    d3.select('#results-data > summary > a[download]')
        .attr('href', window.URL.createObjectURL(new Blob([d3.csvFormat(summData)], {'type':'text/csv'})))

    // plotting
    let plot = LinePlot(results, {
        x:(d) => d.version,
        y:(d) => d.CI.mean,
        yerr:(d) => d.CI.error*2, // plot is set up for total error, not either side
        hue: 'measurement',
        plotArgs: {
            xlabel: xLabel,
            ylabel: yLabel, // TODO: make labels set from user input
            clip:false, // DEBUG
            xlim:[Math.min(...versions) - 0.1, Math.max(...versions) + 0.1],
            xticks: versions,
            ylim:[Math.min(...results.map(d => d.CI.lower)), Math.max(...results.map(d => d.CI.upper))],
        }
    })
    $ = d3.select("#plot-target");
    $.selectAll('.plot').remove()
    $.node().append(plot)
}
