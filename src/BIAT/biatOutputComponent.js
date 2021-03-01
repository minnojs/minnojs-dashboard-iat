
var outputComponent = {
    view:view
};

function view(ctrl,settings){
    return m('.container',[
        m('.row justify-content-md-center',[
            m('.col-auto'),
            m('col-auto',[
            m('.btn-group-vertical', {style:{'data-toggle':'buttons'}},[
                m('button.CreateFile', {onclick: createFile(settings,'JS')},[
                    m('i.fas fa-file-download'), ' Download Script']),
                m('button.CreateJSONFile', {onclick: createFile(settings,'JSON')},[
                    m('i.fas fa-file-download'), ' Download JSON']),
                m('button.CreateJSONFile', {onclick: printToPage(settings)}, 'Print to Browser')
            ])
            ]),
            m('.col-auto',{style:{'padding':'1.7em 0em 5em 1em',float:'left'}},[
                m('row',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['Download the JavaScript file. For more details how to use it, see the “Help” page.']),
                ]),
                m('.row',[
                    m('.col-auto',{style:{'padding-top':'3.45em'}},[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', ['Importing this file to this tool, will load all your parameters to this tool.']),
                ])
                ])
            ]),
        ]),
        m('div',{id: 'textDiv', style: {visibility: 'hidden', 'padding' :'0 0 0 3.5em'}},
        m('textarea.form-control', {id:'textArea', value:'', style: {width : '60rem', height: '25rem'}}))
    ])

}

export default outputComponent;

function createFile(settings, type){
    return function(){
        var output,textFileAsBlob;
        var downloadLink = document.createElement("a");
        if (type == 'JS') {
            output = toString(settings);
            textFileAsBlob = new Blob([output], {type:'text/plain'});
            downloadLink.download = "BIAT.js"; 
        }
        else {
            output = updateSettings(settings);
            textFileAsBlob = new Blob([JSON.stringify(output,null,4)], {type : 'application/json'});
            downloadLink.download = "BIAT.json"; 
        }
        if (window.webkitURL != null) {downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);}
        else{
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
        downloadLink.click();
        }
}

function toConsole(settings){
    return function(){
        window.settings = settings;
        console.log(settings);}
}

function printToPage(settings){
    return function() {
        var para = document.getElementById("textDiv");
        para.style.visibility = 'visible';
        var text_area = document.getElementById("textArea");
        text_area.value = toString(settings);}
}

function toString(settings){return toScript(updateSettings(settings));}

function updateSettings(settings){
    var output = {};
    if (settings.parameters.practiceBlock) {
        output.practiceCategory1 = settings.practiceCategory1;
        output.practiceCategory2 = settings.practiceCategory2;
    }
    output.categories = settings.categories,
    output.attribute1 = settings.attribute1,
    output.attribute2 = settings.attribute2,
    output.base_url = settings.parameters.base_url,
    output.remindError =  settings.parameters.remindError,
    output.showStimuliWithInst = settings.parameters.showStimuliWithInst,
    output.isTouch = settings.parameters.isTouch
    output.practiceBlock = settings.parameters.practiceBlock;
    if(settings.parameters.isQualtrics) output.isQualtrics = settings.parameters.isQualtrics; 
    Object.assign(output, settings.blocks);
    settings.parameters.isTouch ? Object.assign(output, settings.touch_text) : Object.assign(output, settings.text); 
    return output;
}

function toScript(output){
    return `define(['pipAPI' ,'${output.isQualtrics ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/BIAT/qualtrics/qbiat6.js': 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/BIAT/biat6.js'}'], function(APIConstructor, iatExtension) {var API = new APIConstructor(); return iatExtension(${JSON.stringify(output,null,4)});});`
}


