import { group, unique } from "./utilities.js";

function getVersions(data) {
    return unique(data.flatMap(d => [d.model, d.dataset])).sort()
}

export function learning(data, versions) {
    versions = versions ?? getVersions(data);
    return versions.slice(1).map( (version,i) => {
        i++; // Adjusting for initial slice
        let value;
        let modelPrevDataCurrent = data.filter(d => (d.model == versions[i-1]) && (d.dataset == versions[i]))[0].performance;
        let modelCurrentDataCurrent = data.filter(d => (d.model == versions[i]) && (d.dataset == versions[i]))[0].performance;
        value = (modelCurrentDataCurrent-modelPrevDataCurrent)
        return {version:version, value:value, measurement:'learning'}
    })
}

export function potential(data, versions) {
    versions = versions ?? getVersions(data);
    return versions.slice(1).map( (version,i) => {
        i++; // Adjusting for initial slice
        let value;
        let modelPrevDataCurrent = data.filter(d => (d.model == versions[i-1]) && (d.dataset == versions[i]))[0].performance;
        let modelPrevDataPrev = data.filter(d => (d.model == versions[i-1]) && (d.dataset == versions[i-1]))[0].performance;
        value = (modelPrevDataPrev-modelPrevDataCurrent)
        return {version:version, value:value, measurement:'potential'}
    })
}

export function retention(data, versions, decay=0.5) {
    versions = versions ?? getVersions(data);
    return versions.slice(1).map( (version,i) => {
        i++; // Adjusting for initial slice
        let value;
        let weights = versions.slice(0,i+1).map((_,ii) => Math.E**(decay*(ii-i)))
        weights = weights.map(w => w/weights.reduce((a,b) => a+b,0));
        value = weights.map((w,j) => {
            let d = data.filter(x => (x.model == versions[i]) && (x.dataset == versions[j]))[0].performance;
            return w*d
        }).reduce((a,b) => a+b,0)
        return {version:version, value:value, measurement:'retention'};
    })
}


export function run(data, decay=0.5) {
    // Runs all measurements for all repetitions
    let versions = getVersions(data);
    let results = group(data, 'repetition').flatMap(([r,d]) => {
        let L = learning(d, versions)
        let P = potential(d, versions)
        let R = retention(d, versions, decay)
        return [...L, ...P, ...R].map( d => {
            d.repetition = r.repetition;
            return d
        })
    })
    return results;
}

export default Object.assign(run, {
    learning: learning,
    potential: potential,
    retention: retention,
})