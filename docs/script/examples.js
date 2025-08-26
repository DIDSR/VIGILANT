import { displayResults } from "./results.js";

const Examples = [
    {
        name: "Sudden population shift (high plasticity)",
        description: "In this example, there is a sudden population change between versions 2 and 3. The change in population presents an opportunity for additional knowledge to be gained (shown by a spike in potential at version 3). This model has high plasiticity, so it is able to take advantage of the additional knowledge (shown by learning following potential closely). However, the high model plasicity coupled with a population shift reduces the models stability (shown by a decrease in retention following the shift at version 3).",
        data: [
            {model: 1, dataset: 1, performance:0.8},
            {model: 1, dataset: 2, performance:0.76},
            {model: 1, dataset: 3, performance:0.5},
            {model: 1, dataset: 4, performance:0.45},
            {model: 2, dataset: 1, performance:0.81},
            {model: 2, dataset: 2, performance:0.83},
            {model: 2, dataset: 3, performance:0.55},
            {model: 2, dataset: 4, performance:0.5},
            {model: 3, dataset: 1, performance:0.56},
            {model: 3, dataset: 2, performance:0.6},
            {model: 3, dataset: 3, performance:0.8},
            {model: 3, dataset: 4, performance:0.75},
            {model: 4, dataset: 1, performance:0.1},
            {model: 4, dataset: 2, performance:0.2},
            {model: 4, dataset: 3, performance:0.1},
            {model: 4, dataset: 4, performance:0.85},
        ]
    },
    {
        name: "Sudden population shift (low plasticity)",
        description: "In this example, there is a sudden population change between versions 2 and 3. The change in population presents an opportunity for additional knowledge to be gained (shown by a spike in potential at version 3). This model has low plasiticity, so it is able to retain previous knowledge (shown by a relatively stable retention value), but it is not able to take full advantage of the additional information (shown by the learning value lagging behind the potential).",
        data: [
            {model: 1, dataset: 1, performance:0.8},
            {model: 1, dataset: 2, performance:0.76},
            {model: 1, dataset: 3, performance:0.5},
            {model: 1, dataset: 4, performance:0.45},
            {model: 2, dataset: 1, performance:0.81},
            {model: 2, dataset: 2, performance:0.83},
            {model: 2, dataset: 3, performance:0.55},
            {model: 2, dataset: 4, performance:0.5},
            {model: 3, dataset: 1, performance:0.8},
            {model: 3, dataset: 2, performance:0.8},
            {model: 3, dataset: 3, performance:0.7},
            {model: 3, dataset: 4, performance:0.4},
            {model: 4, dataset: 1, performance:0.7},
            {model: 4, dataset: 2, performance:0.8},
            {model: 4, dataset: 3, performance:0.7},
            {model: 4, dataset: 4, performance:0.6},
        ]
    }
]


export function populateExamples() {
    const urlParams = new URLSearchParams(window.location.search);
    let selectedExample = Number(urlParams.get('ex')) ?? 0;
    let example = Examples[selectedExample]
    let $;
    // Set up the example selection menu
    $ = d3.select("#example-display")
        .selectAll('div')
        .data(Examples)
        .join('div')
        .attr('class', 'example-select')
        .attr('selected', (d,i) => (i === selectedExample) ? true : undefined)
        .attr('idx', (d,i) => i);
    d3.select("#example-display").on('change', (event) => {
            urlParams.set('ex',event.target.querySelector(`[selected]`).getAttribute('idx'));
            window.location.search = urlParams;
        })
    $.attr('name', d => d.name)
     .text(d => d.description);
    d3.select('#example-description > span').text(example.description)
    displayResults(example.data)
}