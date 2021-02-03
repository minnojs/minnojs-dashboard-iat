
var outputComponent = {
    view:view
};

function view(ctrl,settings){
    return m('.container',[
        m('.row justify-content-md-center',[
            m('.col-md-lg-1', m('button.CreateFile', {onclick: createFile(settings,'JS')}, 'Download Script')),
        m('.col col-lg-1', [                
            m('i.fa.fa-info-circle'),
            m('.card.info-box.card-header', ['Download the JavaScript file. For more details how to use it, see the “Help” page.']),
        ])
    ]), 
    m('.row justify-content-md-center',[
       m('.col-md-lg-1', m('button.CreateJSONFile', {onclick: createFile(settings,'JSON')}, 'Download JSON')),
    m('.col col-lg-1', [
        m('i.fa.fa-info-circle'),
        m('.card.info-box.card-header', ['Importing this file to this tool, will load all your parameters to this tool.']),
    ]),
    ]),
    m('.row justify-content-md-center',[
        m('.col col-lg-4', [
            m('button.CreateJSONFile', {onclick: printToPage(settings)}, 'Print to Browser')
        ]),
        m('.col col-lg-1')
    ]),
        m('div',{id: 'textDiv', style: {visibility: 'hidden', 'padding' :'0 0 0 3.5em'}},
        m('textarea', {id:'textArea', value:'', style: {width : '60rem', height: '25rem'}}))
    ])
    // return m('div',[
    //     m('div',{style: {position: "absolute",top:'34%',left:'38.5%'}},[
    //         m('i.fa.fa-info-circle'),
    //         m('.card.info-box.card-header', ['Download the JavaScript file. For more details how to use it, see the “Help” page.']),
    //     ]),
    //     m('button.CreateFile', {onclick: createFile(settings,'JS')}, 'Download Script'),
    //     m('div',{style: {position: "absolute",top:'45%',left:'39%'}},[
    //         m('i.fa.fa-info-circle'),
    //         m('.card.info-box.card-header', ['Importing this file to this tool, will load all your parameters to this tool.']),
    //     ]),
    //     m('button.CreateJSONFile', {onclick: createFile(settings,'JSON')}, 'Download JSON'),
    //     m('button.CreateJSONFile', {onclick: toConsole(settings)}, 'Print to Console'),
    //     m('button.CreateJSONFile', {onclick: printToPage(settings)}, 'Print to Browser'),
    //     m('div',{id: 'textDiv', style: {visibility: 'hidden', 'padding' :'0 0 0 3.5em'}},
    //         m('textarea', {id:'textArea', value:'', style: {width : '60rem', height: '25rem'}}))
    // ]);
}

export default outputComponent;

function createFile(settings, fileType){
    return function(){
        var output,textFileAsBlob;
        var downloadLink = document.createElement("a");
        if (fileType == 'JS') {
            output = toString(settings);
            textFileAsBlob = new Blob([output], {type:'text/plain'});
            downloadLink.download = "IAT.js"; }
        else {
            output = updateSettings(settings);
            textFileAsBlob = new Blob([JSON.stringify(output,null,4)], {type : 'application/json'});
            downloadLink.download = "IAT.json"; }
        if (window.webkitURL != null) {downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);}
        else {
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);}
        downloadLink.click();
        }
}

function toConsole(settings){
    return function(){
        window.settings = settings;
        console.log(settings);
    }
}

function printToPage(settings){
    return function() {
        var para = document.getElementById("textDiv");
        para.style.visibility = 'visible';
        var text_area = document.getElementById("textArea");
        text_area.value = toString(settings);
    }
}

function toString(settings){
    return toScript(updateSettings(settings));
}

function updateSettings(settings){
    var output={
        category1: settings.category1,
        category2: settings.category2,
        attribute1: settings.attribute1,
        attribute2: settings.attribute2,
        base_url: settings.parameters.base_url,
        remindError: settings.parameters.remindError,
        errorCorrection: settings.parameters.errorCorrection,
        isTouch: settings.parameters.isTouch
    }
    if(settings.parameters.isQualtrics){
        output.isQualtrics=settings.parameters.isQualtrics,
        output.showDebriefing=settings.parameters.showDebriefing,
        output.fullscreen=settings.parameters.fullscreen
    }
    Object.assign(output, settings.blocks);
    settings.parameters.isTouch ? Object.assign(output, settings.touch_text) : Object.assign(output, settings.text); 
    return output;
}

function toScript(output){
    return `define(['pipAPI' ,'${output.isQualtrics ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/qualtrics/quiat9.js': 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat8.js'}'], function(APIConstructor, iatExtension) {var API = new APIConstructor(); return iatExtension(${JSON.stringify(output,null,4)})});`
}