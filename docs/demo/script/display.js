import { round, unique } from "./utilities.js";
const nDecimals = 4

export function DataTable(data) {
    // data should be an array of objects
    let columns
    let $ = d3.create('table').attr('class', 'data-table');
    $.append('thead')
    $.append('tbody')
    let table = $.node()
    table.update = function() {
        columns = unique(data.flatMap(d => Object.keys(d)))
        let headers = $.select('thead').selectAll('th').data(columns).join('th')
        headers.text(d => d)
        let rows = $.select('tbody').selectAll('tr').data(data).join('tr')
        let cells = rows.selectAll('td').data(function (row) { return columns.map(c => row[c])}).join('td')
        // cells.text(d => (typeof d === 'number') ? round(d, nDecimals) : d)
        cells.text(d => {
            if (typeof d == 'number') {
                return round(d, nDecimals);
            } else if (Array.isArray(d)) {
                if (d.every(x => typeof x === 'number')) {
                    return '[' + d.map(x => `${round(x, nDecimals)}`).join(', ') + ']'
                }
            }
            return d;
            
        })
            
        return this;
    }
    return table.update()
}


