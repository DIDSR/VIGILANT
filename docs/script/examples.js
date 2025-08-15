import { displayResults } from "./results.js";

const Examples = [
    {
        name: 'Example 1',
        description: '[TODO: Example Description]',
        data: [
            {model: 1, dataset:1, performance: 0.3},
            {model: 1, dataset:2, performance: 0.2},
            {model: 1, dataset:3, performance: 0.1},
            {model: 2, dataset:1, performance: 0.3},
            {model: 2, dataset:2, performance: 0.7},
            {model: 2, dataset:3, performance: 0.2},
            {model: 3, dataset:1, performance: 0.2},
            {model: 3, dataset:2, performance: 0.3},
            {model: 3, dataset:3, performance: 0.9},
        ]
    },
    {
        name: 'Example 2', // NOTE: a copy of example 1
        description: '[TODO]',
        data: [
            {model: 1, dataset:1, performance: 0.3, repetition:1},
            {model: 1, dataset:2, performance: 0.2, repetition:1},
            {model: 1, dataset:3, performance: 0.1, repetition:1},
            {model: 2, dataset:1, performance: 0.3, repetition:1},
            {model: 2, dataset:2, performance: 0.7, repetition:1},
            {model: 2, dataset:3, performance: 0.2, repetition:1},
            {model: 3, dataset:1, performance: 0.2, repetition:1},
            {model: 3, dataset:2, performance: 0.3, repetition:1},
            {model: 3, dataset:3, performance: 0.9, repetition:1},
            {model: 1, dataset:1, performance: 0.4, repetition:2},
            {model: 1, dataset:2, performance: 0.5, repetition:2},
            {model: 1, dataset:3, performance: 0.6, repetition:2},
            {model: 2, dataset:1, performance: 0.7, repetition:2},
            {model: 2, dataset:2, performance: 0.8, repetition:2},
            {model: 2, dataset:3, performance: 0.9, repetition:2},
            {model: 3, dataset:1, performance: 0.1, repetition:2},
            {model: 3, dataset:2, performance: 0.4, repetition:2},
            {model: 3, dataset:3, performance: 0.5, repetition:2},
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