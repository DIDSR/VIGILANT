
const DragFileUploadTemplate = document.createElement('template');
DragFileUploadTemplate.innerHTML = `
<!-- Import the one icon needed -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons&icon_names=upload" />
<style>
:host {
    display: block;
    border-radius: 30px;
    border-color: grey;
    --border-width: 4px;
}
* { /* DEBUG */
    box-sizing: border-box;
}
#main {
    padding: var(--padding, calc(var(--border-width)*1.5));
    border-color: inherit;
    border-radius: inherit;
    height: 100%;
    display: grid;
    place-items: center;
    position: relative;
}

#icon { 
    font-size: xx-large;
}
#chooseAFile {
    font-weight: bolder;
    cursor: pointer;
}
#chooseAFile:hover {
    color: var(--hover-color, currentColor);
}
#supportedTypes {
    font-style: italic;
    font-size: smaller;
}
#supportedTypes::before {
    content: "(";
}
#supportedTypes::after {
    content: ")";
}
#border {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: 100%;
    border-width: var(--border-width);
    border-style: dashed;
    border-color: inherit;
    border-radius: inherit;
    transform: translate(-50%, -50%);
    z-index: -1;
}
#invalidWarning {
    border-radius: inherit;
    width: 100%;
    display: grid;
    place-items: center;
    padding: var(--padding, 0.2em);
    background-color: rgb(from var(--error, red) r g b / var(--error-opacity, 0.4));
}
/* Drag over behavior */
#main[isDragOver] {
    background-color: var( --drag-color, rgba(from grey r g b / 0.5));
}
#main[isDragOver] > #border {
    height: calc(100% - var(--border-width));
    width: calc(100% - var(--border-width));
}
[hidden] {
    display: none !important;
}
</style>
<div id="main">
    <div id="border"></div>
    <div id="icon" class="material-icons">upload</div>
    <div>
        <span id="chooseAFile">Choose a file</span> or drag it here
    </div>
    <div id="supportedTypes"></div>
    <div id="invalidWarning" hidden>
        <div>Input has invalid file type(s):</div>
        <div id="invalidList"></div>
    </div>
</div>
<input type="file" id="fileInput" hidden>
`;

class DragFileUpload extends HTMLElement {
    constructor() {
        super();
    }
    static get observedAttributes() { return ['accept', 'accept-display']}
    connectedCallback() {
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(DragFileUploadTemplate.content.cloneNode(true));
        this.setAcceptTypes(this.getAttribute('accept'));
        // bind needed events
        this.browseFiles = this.browseFiles.bind(this);
        this.shadow.getElementById('chooseAFile').addEventListener('click', this.browseFiles);
        // override default behavior
        ['drag','dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(d => {
            this.addEventListener(d, function(e) {
                e.preventDefault();
                e.stopPropagation();
             })
        });
        // handle beginning of drag behavior
        ['dragover','dragenter'].forEach(d => {
            this.addEventListener(d, function(e) {
                this.shadow.getElementById('main').toggleAttribute('isDragOver', true);
            })
        });
        // handle the ending of drag behavior
        ['dragleave', 'dragend', 'drop'].forEach(d => {
            this.addEventListener(d, function(e) {
                this.shadow.getElementById('main').toggleAttribute('isDragOver', false);
            })
        });
        // and the actual dropping behavior
        ['drop'].forEach(d => {
            this.addEventListener(d, function(e) {
                let rejectedFiles = []
                if (this.hasAttribute('accept')) {
                    let accept = this.getAttribute('accept').split(",").map( t => t.trim())
                    rejectedFiles = [...e.dataTransfer.files].filter(f => !accept.includes(f.type));
                }
                this.shadow.getElementById('invalidWarning').toggleAttribute('hidden', !(rejectedFiles.length > 0));
                if (rejectedFiles.length > 0) {
                    let types = rejectedFiles.map(f => f.type);
                    types = types.filter((t,i) => types.indexOf(t) === i);
                    this.shadow.getElementById('invalidList').innerText = types.join(", ");
                } else {
                    this.shadow.getElementById('fileInput').files = e.dataTransfer.files;
                    this.dispatchEvent(new Event('input'));
                }
            })
        })
        
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (['accept', 'accept-display'].includes(name)) { // file types accepted
            this.setAcceptTypes(this.getAttribute('accept'));
        }
    }
    get files() {
        return this.shadow.getElementById('fileInput').files;
    }
    set files(files) {
        this.shadow.getElementById('fileInput').files = files;
    }
    setAcceptTypes(types) {
        if (!this.shadow) return
        if (!types) this.shadow.getElementById("fileInput").toggleAttribute('accept', false);
        this.shadow.getElementById("fileInput").setAttribute('accept', types);
        let display = this.getAttribute('accept-display') ?? this.getAttribute('accept');
        this.shadow.getElementById("supportedTypes").innerText = display;
        this.shadow.getElementById("supportedTypes").toggleAttribute('hidden', !Boolean(display));
    }
    browseFiles() {
        this.shadow.getElementById('fileInput').click();
    }
}

customElements.define('file-upload', DragFileUpload);



const TabbedSelectionTemplate = document.createElement('template');
TabbedSelectionTemplate.innerHTML = `
<style>
    :host {
        display: block;
        position: relative;
    }
    #main {
        height: 100%;
        display: grid;
        grid-template-rows: auto 1fr;
    }
    #header {
        display: flex;
    }
    .tab {
        background-color: var(--tab-color, lightgrey);
        padding: 0.2em;
    }
    .tab[selected] {
        background-color: var(--selected-color, grey);
    }
    ::slotted(:not([selected])) {
        display: none;
    }
</style>
<div id="main">
    <div id="header" part="tab-list"></div>
    <div id="body" part="body">
        <slot></slot>
    </div>
</div>
`;

class TabbedSelection extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(TabbedSelectionTemplate.content.cloneNode(true));
        this.handleSelection = this.handleSelection.bind(this);
        this.shadow.querySelectorAll('slot')[0].addEventListener('slotchange', this.getTabs.bind(this))
    }
    getTabs() {
        let elements = [...this.shadow.querySelector('slot').assignedNodes()].filter(e => e instanceof HTMLElement);
        elements.forEach(e => {
            let name = e.getAttribute('name');
            if (!name) return;
            let tab = this.shadow.querySelector(`.tab[for="${name}"]`);
            if (tab) return;
            tab = document.createElement('div')
            tab.classList.add('tab');
            tab.setAttribute('for', name);
            tab.setAttribute('part', 'tab')
            tab.toggleAttribute('selected', e.hasAttribute('selected'))
            tab.innerText = name;
            this.shadow.querySelector('#header').append(tab);
            tab.addEventListener('click', this.handleSelection);
        })
    }
    handleSelection(event) {
        let target = (event instanceof Event) ? event.target : this.shadow.querySelector(`.tab[for="${event}"]`);
        const selected = this.querySelector("[selected]")
        const name = (target) ? target.getAttribute('for') : null;
        if (selected) {
            let selName = selected.getAttribute('name');
            if (selName === name) return;
            selected.toggleAttribute('selected', false);
            this.shadow.querySelector(`.tab[for="${selName}"]`).toggleAttribute('selected', false);
        }
        if (!target) return;
        
        const newSelection = this.querySelector(`[name="${name}"]`)
        newSelection.toggleAttribute('selected', true);
        event.target.toggleAttribute('selected', true);
        this.dispatchEvent(new Event('change'))
    }
    get value() {
        const selected = this.querySelector('[selected]')
        return (selected) ? selected.getAttribute('name') : null;
    }
    set value(val) { this.handleSelection(val)}
}

customElements.define('tabbed-selection', TabbedSelection);