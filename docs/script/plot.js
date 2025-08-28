import { group, unique } from "./utilities.js";

export function Plot({
    aspect=2,
    scale=400,
    resizable=false,
    backgroundColor='none',
    backgroundCurve=2,
    margin=10,
    marginLeft=margin,
    marginRight=margin,
    marginTop=margin,
    marginBottom=margin,
    xlabel=null,
    ylabel=null,
    labelPad=5,
    xlabelPad=labelPad,
    ylabelPad=labelPad,
    title=null,
    titlePad=0,
    grid=true,
    xGrid=grid,
    yGrid=grid,
    gridColor='lightgrey',
    xGridColor=gridColor,
    yGridColor=gridColor,
    gridLineWidth=2,
    xGridLineWidth=gridLineWidth,
    yGridLineWidth=gridLineWidth,
    gridOpacity=0.5,
    xGridOpacity=gridOpacity,
    yGridOpacity=gridOpacity,
    clip=true, // whether to clip elements to the plot area or not
    xlim=null,
    ylim=null,
    xticks=null,
    yticks=null,
}={}) {
    let root = d3.create('div')
        .attr('class', 'plot')
        .style('display', 'grid')
        .style('grid-template-rows', 'auto 1fr');
    root.append('div').attr('class', 'legend')
        .style('display', 'flex')
    let $ = root.append('svg');
    let plot = root.node();
    let width, height, xAxis, yAxis;
    $.append('defs')
        .append('clipPath')
            .attr('id','plot-area-clip')
            .append('rect');
    $.append('rect')
        .attr('class', 'background')
        .attr('width', '100%')
        .attr('height', '100%');
    $.append('g').attr('class', 'x-grid');
    $.append('g').attr('class', 'y-grid');
    $.append('g').attr('class', 'elements');
    $.append('g').attr('class', 'x-axis');
    $.append('g').attr('class', 'y-axis');
    $.append('svg').attr('class', 'legend');
    $.append('text').attr('class', 'x-label');
    $.append('text').attr('class', 'y-label');
    $.append('text').attr('class', 'title');
    plot.plotAttributes = []; // placeholder for specific plot attributes
    plot.update = function() {
        let mb = marginBottom;
        let ml = marginLeft;
        let mt = marginTop;
        let mr = marginRight;
        width = aspect*scale;
        height = scale;
        this.X = d3.scaleLinear()
            .domain(xlim ?? [0,1])
            .range([marginLeft, width-marginRight]);
        this.Y = d3.scaleLinear()
            .domain(ylim ?? [0,1])
            .range([height-marginBottom, marginTop]);
        xAxis = d3.axisBottom(this.X).tickValues(xticks);
        yAxis = d3.axisLeft(this.Y);
        root.style('resize', (resizable) ? 'both' : 'none')
            .style('overflow', (resizable) ? 'hidden' : 'unset');
        $.attr('viewBox', [0,0,width,height]);
        $.select('.background')
            .attr('rx', backgroundCurve)
            .attr('fill', backgroundColor);
        
        $.select('.x-axis').call(xAxis);
        $.select('.y-axis').call(yAxis);
        $.select('.title')
            .text(title)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'hanging')
            .attr('y', marginTop)
            .attr('fill', 'currentColor');
        $.select('.x-label') 
            .text(xlabel)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'auto')
            .attr('y', height-marginBottom)
            .attr('fill', 'currentColor');
        $.select('.y-label')
            .text(ylabel)
            .attr('text-anchor', 'start')
            .attr('dominant-baseline', 'central')
            .style('transform-origin', 'center')
            .style('transform-box', 'fill-box')
            .style('transform', 'rotate(-90deg)')
            .attr('x', marginLeft)
            .attr('dx', -$.select('.y-label').node().getBBox().height*2) // Not sure why the x2 is needed (it wasn't needed in the original code)
            .attr('fill', 'currentColor');

        // Adjust the margins based on the size of the axies + labels + title
        mb += $.select('.x-axis').node().getBBox().height + $.select('.x-label').node().getBBox().height + xlabelPad;
        ml += $.select('.y-axis').node().getBBox().width + $.select('.y-label').node().getBBox().height + ylabelPad;
        mt += $.select('.title').node().getBBox().height + titlePad;
        $.select('.title').attr('x',(width-mr-ml)/2 + ml)
        // re-adjust the placement of the labels + title
        $.select('.x-label').attr('x', (width-mr-ml)/2 + ml)
        $.select('.y-label').attr('y', (height-mt-mb)/2 + mt)

        // re-adjust the scales to account for new margins
        this.Y.range([height-mb, mt])
        this.X.range([ml, width-mr])

        // move the axes into place
        $.select('.x-axis').call(xAxis).attr('transform', `translate(${0},${height-mb})`);
        $.select('.y-axis').call(yAxis).attr('transform', `translate(${ml},${0})`);
        // update the grids
        $.select('.x-grid').selectAll('line').data(this.X.ticks()).join('line')
        $.select('.x-grid').selectAll('line')
            .attr('x1', d => this.X(d))
            .attr('x2', d => this.X(d))
            .attr('y1', this.Y(this.Y.domain()[0]))
            .attr('y2', this.Y(this.Y.domain()[1]));
        $.select('.x-grid')
            .attr('stroke', xGridColor)
            .attr('stroke-width', xGridLineWidth)
            .attr('opacity', (xGrid) ? xGridOpacity : 0);
        $.select('.y-grid').selectAll('line').data(this.Y.ticks()).join('line')
        $.select('.y-grid').selectAll('line')
            .attr('x1', this.X(this.X.domain()[0]))
            .attr('x2', this.X(this.X.domain()[1]))
            .attr('y1', d => this.Y(d))
            .attr('y2', d => this.Y(d));
        $.select('.y-grid')
            .attr('stroke', yGridColor)
            .attr('stroke-width', yGridLineWidth)
            .attr('opacity', (yGrid) ? yGridOpacity : 0);
        // updating the lip path
        $.select('.elements').attr('clip-path', (clip) ? 'url(#plot-area-clip)' : undefined);
        $.select('#plot-area-clip > rect')
            .attr('width', width-ml-mr)
            .attr('height', height-mt-mb)
            .attr('x', ml)
            .attr('y', mt)
        if (this.render !== undefined) { // this is for specific plot types
            this.render();
        }
        return this;
    }
    plot.attr = function(name, value) {
        if (name === 'aspect') {
            if (value === undefined) return aspect;
            aspect = Number(value);
        } else if (name == 'scale') {
            if (value === undefined) return scale;
            scale = Number(value);
        } else if (name === 'resizable') {
            if (value === undefined) return resizable;
            resizable = value;
        } else if (this.plotAttributes.includes(name) & this.plotAttr !== undefined) {
            let out = this.plotAttr(name, value);
            if (out !== undefined) return out;
        } else return undefined;
        this.update();
    }
    // let resizeObserver = new ResizeObserver(function(entries){
    //     for (const entry of entries) {
    //         if (entry.target.attr('resizable')) {
    //             entry.target.attr('aspect', entry.contentRect.width/entry.contentRect.height )
    //         }
    //     }
    // })
    // resizeObserver.observe(plot);
    return plot;
}

export function ScatterPlot(data=[], {
    radius=10,
    palette=d3.schemeSet1,
    x=(d) => d.x,
    y=(d) => d.y,
    hue='color',
    plotArgs={},
}={}) {
    let plot = Plot(plotArgs);
    let color = d3.scaleOrdinal();
    let $ = d3.select(plot).select('.elements');
    plot.plotAttributes += ['radius', 'palette', 'x', 'y', 'hue'];
    plot.render = function() {
        color.domain(unique(data.map(d => d[hue])))
            .range(palette);
        $.selectAll('.scatter-point')
            .data(data)
            .join('circle')
            .attr('class', 'scatter-point');
        $.selectAll('.scatter-point')
            .attr('r', d => (typeof radius === 'function') ? radius(d) : radius)
            .attr('cx', d => this.X(x(d)))
            .attr('cy', d => this.Y(y(d)))
            .attr('fill', d => color(d[hue]))
    }
    // TODO: plotAttr function to set plot-specific attributes
    return plot;
}


export function LinePlot(data=[], {
    palette=d3.schemeSet1,
    x=(d) => d.x,
    y=(d) => d.y,
    yerr = (d) => d.yerr,
    hue='color',
    plotArgs={},
    lineWidth=3,
    outlineColor='var(--text-2)',
    outlineWidth=1,
    outlineOpacity=1,
    errorLineWidth=2,
    errorCapLength=10,
}={}) {
    data = data.sort((a,b) => x(a) - x(b))
    let plot = Plot(plotArgs);
    let color = d3.scaleOrdinal();
    
    let $ = d3.select(plot).select('.elements');
    
    plot.plotAttributes += ['palette', 'x', 'y', 'hue', 'lineWidth'];
    plot.render = function() {

        color.domain(unique(data.map(d => d[hue])))
            .range(palette);
        $.selectAll('g.line')
            .data(group(data, hue))
            .join(function(enter) {
                let g = enter.append('g');
                g.append('path').attr('class', 'outline');
                g.append('path').attr('class', 'error-bars');
                g.append('path').attr('class', 'line');
                return g;
            })
                .attr('class', 'line');
        $.selectAll('path.line')
            .attr('stroke', ([h,_]) => color(Object.values(h)[0]))
            .attr('stroke-width', ([_,d]) => (typeof lineWidth === 'function') ? lineWidth(d) : lineWidth)
            .attr('fill', 'none')
            .attr('d', ([_,d]) => d.map((p,i) => `${(i===0)?'M':'L'}${this.X(x(p))},${this.Y(y(p))}`).join(" "))
        $.selectAll('path.outline')
            .attr('stroke', outlineColor)
            .attr('d', ([_,d]) => d.map((p,i) => `${(i===0)?'M':'L'}${this.X(x(p))},${this.Y(y(p))}`).join(" "))
            .attr('fill', 'none')
            .attr('stroke-width', ([_,d]) => {
                let lw = (typeof lineWidth === 'function') ? lineWidth(d) : lineWidth;
                let ow = (typeof outlineWidth === 'function') ? outlineWidth(d) : outlineWidth;
                return lw+ow
            })
            .attr('opacity', (typeof outlineOpacity === 'function') ? outlineOpacity(d) : outlineOpacity);
        $.selectAll('path.error-bars')
            .attr('d', ([_,d]) => {
                let pth = d.map( (p) => {
                    if (!yerr(p)) return `M${this.X(x(p))},${this.Y(y(p))}`;
                    return `M${this.X(x(p))},${this.Y(y(p) + (yerr(p)/2))} V${this.Y(y(p)-(yerr(p)/2))} 
                    M${this.X(x(p)) - (errorCapLength/2)},${this.Y(y(p) + (yerr(p)/2))} h${errorCapLength}
                    M${this.X(x(p)) - (errorCapLength/2)},${this.Y(y(p) - (yerr(p)/2))} h${errorCapLength}`
                }).join(" ")
                return pth
            })
            .attr('stroke', ([h,_]) => color(Object.values(h)[0]))
            .attr('fill', 'none')
            .attr('stroke-width', errorLineWidth)
        // update the legend
        let legend = d3.select(this).select('div.legend')
            .selectAll('div')
            .data(color.domain())
            .join(function (enter) {
                let d = enter.append('div')
                    .style('display', 'flex');
                d.append('span').attr('class', 'handle');
                d.append('span').attr('class', 'label');
                return d
            })
        legend.selectAll('span.handle')
            .style('display', 'block')
            .style('min-width', '3em')
            .style('background-color', d => color(d));
        legend.selectAll('span.label')
            .text(d => d)
    }
    return plot;
}
