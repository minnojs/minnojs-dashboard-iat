
let outputComponent = {
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
    ]);

}

export default outputComponent;

function createFile(settings, fileType){
    return function(){
        let output,textFileAsBlob;
        let downloadLink = document.createElement('a');
        if (fileType === 'JS') {
            output = toString(settings);
            textFileAsBlob = new Blob([output], {type:'text/plain'});
            downloadLink.download = 'SPF.js'; }
        else {
            output = updateSettings(settings);
            textFileAsBlob = new Blob([JSON.stringify(output,null,4)], {type : 'application/json'});
            downloadLink.download = 'SPF.json'; }
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

function printToPage(settings){
    return function() {
        let para = document.getElementById('textDiv');
        para.style.visibility = 'visible';
        let text_area = document.getElementById('textArea');
        text_area.value = toString(settings);
    };
}

function toString(settings){
    return toScript(updateSettings(settings));
}

function updateSettings(settings){
    let output={
        objectCat1: settings.objectCat1,
        objectCat2: settings.objectCat2,
        attribute1: settings.attribute1,
        attribute2: settings.attribute2,
        //base_url: settings.parameters.base_url,
    };
    Object.assign(output, settings.parameters);
    Object.assign(output, settings.blocks);
    Object.assign(output, settings.text); 
    return output;
}

function toScript(output){
    return `define(['pipAPI' ,'${'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/spf/spf4.js'}'], function(APIConstructor, spfExtension) {var API = new APIConstructor(); return spfExtension(${JSON.stringify(output,null,4)})});`;
}