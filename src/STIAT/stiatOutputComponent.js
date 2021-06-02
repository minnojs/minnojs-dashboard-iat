
let outputComponent = {
    view:view,
    controller:controller,
};

function view(ctrl){
    return m('.container',[
        m('.row justify-content-md-center',[
            m('.col-auto'),
            m('col-auto',[
                m('.btn-group-vertical', {style:{'data-toggle':'buttons'}},[
                    m('button.CreateFile', {onclick: ctrl.createFile('JS')},[
                        m('i.fas fa-file-download'), ' Download Script']),
                    m('button.CreateJSONFile', {onclick: ctrl.createFile('JSON')},[
                        m('i.fas fa-file-download'), ' Download JSON']),
                    m('button.CreateJSONFile', {onclick: ctrl.printToPage()}, 'Print to Browser')
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
    ]);

}

function controller(settings){
    updateMediaSettings();
    return {createFile:createFile, printToPage:printToPage, toString:toString,
        updateSettings:updateSettings, toScript:toScript};

    function createFile(fileType){
        return function(){
            let output,textFileAsBlob;
            let downloadLink = document.createElement('a');
            if (fileType === 'JS') {
                output = toString();
                textFileAsBlob = new Blob([output], {type:'text/plain'});
                downloadLink.download = 'STIAT.js'; }
            else {
                output = updateSettings();
                textFileAsBlob = new Blob([JSON.stringify(output,null,4)], {type : 'application/json'});
                downloadLink.download = 'STIAT.json'; }
            if (window.webkitURL != null) {downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);}
            else {
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);
            }
            downloadLink.click();
        };
    }
    
    // function toConsole(settings){
    //     return function(){
    //         window.settings = settings;
    //         console.log(settings);
    //     }
    // }
    
    function printToPage(){
        return function() {
            let para = document.getElementById('textDiv');
            para.style.visibility = 'visible';
            let text_area = document.getElementById('textArea');
            text_area.value = toString(settings);
        };
    }
    
    function toString(){
        return toScript(updateSettings());
    }
    
    function updateMediaSettings(){
        settings.category.media = settings.category.stimulusMedia
        delete settings.category.stimulusMedia
        settings.attribute1.media = settings.attribute1.stimulusMedia
        delete settings.attribute1.stimulusMedia
        settings.attribute2.media = settings.attribute2.stimulusMedia
        delete settings.attribute2.stimulusMedia
    }
    
    function updateSettings(){
        let output={
            category: settings.category,
            attribute1: settings.attribute1,
            attribute2: settings.attribute2,
            base_url: settings.parameters.base_url,
            remindError: settings.parameters.remindError,
            trialsByBlock: settings.trialsByBlock,
            blockOrder: settings.blockOrder,
            switchSideBlock: settings.switchSideBlock
        };
        if(settings.parameters.isQualtrics){
            output.isQualtrics=settings.parameters.isQualtrics;
        }
        Object.assign(output, settings.text); 
        return output;
    }
    
    function toScript(output){
        return `define(['pipAPI' ,'${output.isQualtrics ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/qualtrics/qstiat6.js': 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/stiat6.js'}'], function(APIConstructor, stiatExtension) {var API = new APIConstructor(); return stiatExtension(${JSON.stringify(output,null,4)});});`;
    }
}


export default outputComponent;

