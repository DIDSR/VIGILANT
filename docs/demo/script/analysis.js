import { DataTable } from './display.js';
import { displayResults } from './results.js';
import { unique } from './utilities.js';

function AnalysisConfiguration() {
    return {
        trackedKeys: ['data', 'performanceKey', 'datasetKey', 'modelKey', 'repetitionKey', 'cleaning-complete'],
        isInitilized: function() {
            return this.trackedKeys.every(key => window.sessionStorage[key] !== undefined)
        },
        reset: function() {
            // resets the values of all tracked keys (to the string value undefined)
            this.trackedKeys.forEach(key => window.sessionStorage[key] = undefined);
            // the cleaning-complete key is slightly different
            window.sessionStorage['cleaning-complete'] = false;
            
        },
        set: function(key, value) {
            console.assert(this.trackedKeys.includes(key));
            window.sessionStorage[key] = JSON.stringify(value);
        },
        get: function(key) {
            console.assert(this.trackedKeys.includes(key));
            let value = window.sessionStorage[key];
            if (value === 'undefined') return undefined;
            return JSON.parse(value);
        }
    }
}


export function configureAnalysis() {
    // reset needed elements
    d3.select('#overall-validation-errors').selectAll('*').remove()
    d3.select('.validation-errors').selectAll("*").remove()
    const config = AnalysisConfiguration();
    d3.select('#reset-button')
        .on('click', () => {
            config.reset();
            configureAnalysis();
        })
    if (!config.isInitilized()) config.reset();
    // determine which stage we're at
    let stage;
    if (config.get('data') === undefined) {
        stage = 'upload';
    } else {
        stage = (config.get('cleaning-complete')) ? 'results' : 'cleaning';
    }
    // show/hide page sections accordingly
    d3.select('#file-upload').attr('hidden', (stage === 'upload') ? undefined : true);
    d3.select('#data-cleaning').attr('hidden', (stage === 'cleaning') ? undefined : true);
    d3.select('#results-display').attr('hidden', (stage === 'results') ? undefined : true);
    // bind upload action
    d3.select('#file-upload input[type="file"]')
        .on('input', (event) => {
            loadFile(event.target.files[0]).then( data => {
                config.set('data', data)
                configureAnalysis();
            })
        })
    // handle Data cleaning
    if (config.get('data')) {
        let columns = unique(config.get('data').flatMap(d => Object.keys(d)));
        d3.select('#input-data-preview').selectAll('table.data-table').remove()
        d3.select('#input-data-preview').node().append(DataTable(config.get('data')))
        d3.selectAll('#data-cleaning-options select')._groups.map(g => [...g]).flat().forEach(sel => {
            let v = sel.getAttribute('name')
            let def = config.get(name) ?? sel.getAttribute('default');
            d3.select(sel).selectAll('option:not(.default)').data(columns).join('option');
            d3.select(sel).selectAll('option:not(.default)')
                .text(d => d)
                .attr('selected',d => (d == def) ? true : undefined)
            d3.select(sel)
                .on('change', (event) => {
                    config.set(event.target.getAttribute('name'), event.target.value);
                })
        })
    }
    d3.select('#submit-data-cleaning').on('click', () => validateDataCleaning(config))
    
    if ((config.get('data') !== undefined) & (config.get('cleaning-complete'))) {
        displayResults(config.get('data'))
    }
}
function validateDataCleaning(config) {
    let validationError = false
    let selects = d3.selectAll('#data-cleaning-options select')._groups.map(g => [...g]).flat()
    selects.forEach(sel => {
        let errDisplay = d3.select(sel.parentElement).select('span.validation-errors').selectAll('*');
        let validationErrors = [];
        const req = sel.hasAttribute('required')
        if (req & !sel.value) {
            validationErrors.push('Value cannot be none')
        }
        if (sel.value) {
            if (selects.filter(s => s.value === sel.value).length > 1) {
                validationErrors.push('Value must be unique')
            }
        }
        config.set(sel.getAttribute('name'), sel.value);
        
        errDisplay.data(validationErrors)
            .join('div')
                .text(d => d)
        if (validationErrors.length > 0) validationError = true;
    })
    if (validationError) return;
    let data = config.get('data').map(d => ({
        performance:Number(d[config.get('performanceKey')]),
        model:Number(d[config.get('modelKey')]),
        dataset:Number(d[config.get('datasetKey')]),
        repetition:d[config.get('repetitionKey')],
    }))
    let validationErrors = []
    // overall validation (make sure that the expected values exist!)
    let versions = unique(data.flatMap(d => [d.dataset, d.model]))//.sort();
    let repetitions = unique(data.map(d => d.repetition))
    // check that every combination of repetition, model version, and dataset version
    for (var R of repetitions) {
        for (var DS of versions) {
            for (var M of versions) {
                let id = `Dataset version: ${DS} | Model version: ${M}` + ( (R === undefined) ? '' : `(repetition: ${R})`);
                let N = data.filter(d => (d.dataset == DS) & (d.model == M) & (d.repetition == R)).length;
                if (N == 0) validationErrors.push(`Missing entry: ${id}`);
                else if (N > 1) validationErrors.push(`Found multiple entries for ${id}`);
            }
        }
    }
    d3.select('#overall-validation-errors').selectAll('div').data(validationErrors).join('div')
    d3.select('#overall-validation-errors').selectAll('div')
        .text(d => d)
    if (validationErrors.length > 0) return;
    config.set('data', data)
    config.set('cleaning-complete', true);
    configureAnalysis()
}

async function loadFile(file) {
    let content = await file.text()
    if (file.type == 'text/csv') {
        return d3.csvParse(content)
    }
}