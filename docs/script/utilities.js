
export function aggregate(data, func, aggName, groupKeys=['measurement','version']) {
    data = group(data, groupKeys).map(([info, d]) => {
        let res = func(d.map(x => x.value));
        info[aggName] = res
        return info
    })
    return data;
}
export function confidenceInterval(arr) {
    let N = arr.length;
    let M = mean(arr);
    let S = standardDeviation(arr);
    let Z = 1.96; // 95% confidence interval
    let err = Z * (S/(N**(0.5)))
    err = (N < 2) ? 0 : err;
    let lower = M - err;
    let upper = M + err;
    return Object.assign([lower, upper], {
        mean: M,
        lower:lower,
        upper:upper,
        error:err,
    })
}

export function group(data, keys=[]) {
    keys = (Array.isArray(keys)) ? keys : [keys];
    let keyValues = unique(data.map(d => JSON.stringify(Object.fromEntries(keys.map(k => [k, d[k]]))))).map(d => JSON.parse(d))
    return keyValues.map(k => [k, data.filter(d => Object.entries(k).every(([key, value]) => d[key] === value))])
}

// export function group(data, key) {
//     let values = unique(data.map(d => d[key]))
//     return values.map(v => [v, data.filter(d => d[key] === v)]);
// }
export function mean(arr) {
    return arr.reduce((a,b) => a+b, 0)/arr.length
}
export function round(N, decimals=3) {
    const F = 10**decimals;
    return Math.floor(N*F)/F
}
export function standardDeviation(arr) {
    let M = mean(arr);
    let values = arr.map( v => (v-M)**2)
    return ( (1/arr.length)*values.reduce((a,b) => a+b,0))**(0.5)
}
export function unique(arr) {
    return arr.filter((a,i) => arr.indexOf(a) == i)
}