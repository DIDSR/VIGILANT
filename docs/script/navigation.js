import { populateExamples } from "./examples.js";
import { configureAnalysis } from "./analysis.js";

const Pages = [
    // {
    //     name: "Home",
    //     icon: "home",
    //     src: "./index.html"
    // },
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
        src: "../build/html/index.html",
        newTab: true,
    }
]

function populateNavigationBar(currentPage) {
    let nav = d3.select("#navigation-bar")
        .selectAll("a.page")
        .data(Pages)
        .join(function (enter) {
            let d = enter.append("a").attr('class', 'page');
            d.append("span").attr('class', "material-icons");
            d.append('span').attr('class', 'page-title');
            return d;
        })
    nav.attr('selected', d => (d.name == currentPage) ? true : undefined)
        .attr('href', d => d.src)
        .attr('target', d => d.newTab ? '_blank' : undefined);
    nav.selectAll("span.material-icons").text(d => d.icon)
    nav.selectAll("span.page-title").text(d => d.name)
    d3.select('body').attr('current-page', currentPage)
    if (currentPage == 'Examples') populateExamples();
    if (currentPage == 'Analysis') configureAnalysis();
}

function toggleTheme() {
    const currentMode = document.documentElement.getAttribute('theme') ?? 'light';
    const newTheme = currentMode == 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    getTheme();
    
}

function getTheme() {
    const theme = localStorage.getItem('theme') ?? (window.matchMedia("(prefers-color-scheme: dark)") ? 'dark' : 'light');
    document.documentElement.setAttribute('theme', theme);
    let toggleButton = document.getElementById('change-theme');
    if (toggleButton) {
        console.log('togglebutton:', toggleButton)
        toggleButton.classList.add('material-icons')
        toggleButton.innerText = (theme == 'dark') ? 'light_mode' : 'dark_mode';
    }
}

// Bind functions that need to be exposed
window.populateNavigationBar = populateNavigationBar
window.toggleTheme = toggleTheme;
window.getTheme = getTheme;