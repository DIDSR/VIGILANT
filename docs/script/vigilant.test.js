import { run } from './vigilant';

const sourceDir = global.path.join(global.__dirname, '../tests');
const measurements = ['learning', 'potential', 'retention']

async function getTestFiles() {
    let files = await global.fs.promises.readdir(sourceDir);
    files = files.filter( file => file.endsWith('.json')).map( file => global.path.join(sourceDir, file));
    let testcases = await Promise.all(files.map( file => global.fs.promises.readFile(file, {encoding:'utf-8'})));
    testcases = testcases.map( t => JSON.parse(t)).flatMap( t => (Array.isArray(t)) ? t : [t])
    return testcases;
}

function transformResults(observed) {
    // handling the different formats for expected / observed
    let versions = [...new Set( observed.map( o => o.version))];

    return versions.map( v => {
        let values = measurements.map( m => {
            let match = observed.filter( o => ((o.version == v) && (o.measurement == m)))[0];
            return [m,match.value]
        })
        return Object.fromEntries([['version',v],...values])
    })
}

const TestCases = await getTestFiles();

TestCases.forEach( (C, i) => {
    test(`Test case ${i}`, () => {
        const observed = transformResults(run(C.input));
        C.output.forEach( (expected, ii) => {
            let match = observed.filter( o => o.version == expected.version);
            expect(match.length).toBe(1);
            match = match[0];
            measurements.forEach( m => {
                expect(match[m]).toBeCloseTo(expected[m])
            })
        })
    })
    
})
