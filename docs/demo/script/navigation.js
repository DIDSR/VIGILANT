import { populateExamples } from "./examples.js";
import { configureAnalysis } from "./analysis.js";

const Pages = [
    {
        name: "Home",
        icon: "home",
        src: "./index.html"
    },
    {
        name: "Analysis",
        icon: "analytics",
        src: "./analysis.html"
    },
    {
        name: "Examples",
        icon: "assignment",
        src: "./examples.html"
    },
    {
        name: 'Docs',
        icon: 'integration_instructions', 
        src: "../build/html/index.html"
    }
]

function populateNavigationBar(currentPage) {
    let nav = d3.select("#navigation-bar")
        .selectAll("a")
        .data(Pages)
        .join(function (enter) {
            let d = enter.append("a");
            d.append("span").attr('class', "material-icons");
            d.append('span').attr('class', 'page-title');
            return d;
        })
    nav.attr('selected', d => (d.name == currentPage) ? true : undefined)
        .attr('href', d => d.src)
    nav.selectAll("span.material-icons").text(d => d.icon)
    nav.selectAll("span.page-title").text(d => d.name)
    d3.select('body').attr('current-page', currentPage)
    if (currentPage == 'Examples') populateExamples();
    if (currentPage == 'Analysis') configureAnalysis();
}

// Bind functions that need to be exposed
window.populateNavigationBar = populateNavigationBar