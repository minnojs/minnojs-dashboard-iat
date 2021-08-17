
import {clone, checkMissingElementName} from '../resources/utilities.js';

let outputComponent = {
    controller:controller,
    view:view
};


function controller(settings, defaultSettings, blocksObject){
    let error_msg = [];

    validityCheck(settings)

    return{error_msg, createFile, printToPage};

    function validityCheck(settings){
        let containsImage = false

        let temp1 = checkMissingElementName(settings.category1, 'First Category', error_msg)
        let temp2 = checkMissingElementName(settings.category2, 'Second Category', error_msg)
        let temp3 = checkMissingElementName(settings.attribute1, 'First Attribute', error_msg) 
        let temp4 = checkMissingElementName(settings.attribute2, 'Second Attribute', error_msg)
        if (temp1 || temp2 || temp3 || temp4) containsImage = true;
        else containsImage = false; 
        
        if(settings.parameters.base_url.length == 0 && containsImage)
            error_msg.push('Image\'s\ url is missing and there is an image in the study');    
        
        //check for blocks problems
        let currBlocks = clone(settings.blocks)
        let clearBlocks = blocksObject.slice(-1)[0]; //blocks parameters with zeros as the values, used to check if the current parameters are also zeros.
        
        ['randomBlockOrder', 'randomAttSide'].forEach(function(key){ //remove those parameters for the comparsion
            delete currBlocks[key];
            delete clearBlocks[key];
        })

        if(JSON.stringify(currBlocks) === JSON.stringify(clearBlocks))
            error_msg.push('All the block\'s parameters equals to 0, that will result in not showing the task at all');    
        blocksObject.slice(0,-1).map(function(block){
            if(settings.blocks[block.numTrialBlocks] !== 0 && settings.blocks[block.numMiniBlocks] === 0) 
                error_msg.push(block.label+'\'s number of trials is '+settings.blocks[block.numTrialBlocks]+' and the number of mini blocks is set as 0. If you wish to skip this block, set both of those parametrs to 0.')
            })

    }

    function createFile(settings, fileType){
        return function(){ 
            let output,textFileAsBlob;
            let downloadLink = document.createElement('a');
            if (fileType === 'JS') {
                output = toString(settings);
                textFileAsBlob = new Blob([output], {type:'text/plain'});
                downloadLink.download = 'IAT.js'; }
            else {
                output = updateSettings(settings);
                textFileAsBlob = new Blob([JSON.stringify(output,null,4)], {type : 'application/json'});
                downloadLink.download = 'IAT.json'; }
            if (window.webkitURL != null) {downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);}
            else {
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);
            }
            downloadLink.click();
        };
    }

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
            category1: settings.category1,
            category2: settings.category2,
            attribute1: settings.attribute1,
            attribute2: settings.attribute2,
            base_url: settings.parameters.base_url,
            remindError: settings.parameters.remindError,
            errorCorrection: settings.parameters.errorCorrection,
            isTouch: settings.parameters.isTouch
        };
        if(settings.parameters.isQualtrics){
            output.isQualtrics=settings.parameters.isQualtrics;
            output.showDebriefing=settings.parameters.showDebriefing;
            output.fullscreen=settings.parameters.fullscreen;
        }
        Object.assign(output, settings.blocks);
        settings.parameters.isTouch ? Object.assign(output, settings.touch_text) : Object.assign(output, settings.text); 
        return output;
        }

        function toScript(output){
            return `define(['pipAPI' ,'${output.isQualtrics ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/qualtrics/quiat9.js': 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat8.js'}'], function(APIConstructor, iatExtension) {var API = new APIConstructor(); return iatExtension(${JSON.stringify(output,null,4)});});`;
        }
    }

function view(ctrl, settings){
    return m('.container',[
        m('.alert alert-danger', {role:'alert',style: {'margin-top':'20px',visibility: ctrl.error_msg.length === 0 ? 'hidden' : 'visible'}},[
            m('h6','Some problems were found in your script, it\'s recommended to fix them before proceeding to download:'),
            m('ul',[
                ctrl.error_msg.map(function(err){
                    return m('li',err);
                })
            ])
        ]),
        m('.row justify-content-md-center',[
            m('.col-auto'),
            m('col-auto',[
                m('.btn-group-vertical', {style:{'data-toggle':'buttons'}},[
                    m('button.CreateFile', {onclick: ctrl.createFile(settings,'JS')},[
                        m('i.fas fa-file-download'), ' Download Script']),
                    m('button.CreateJSONFile', {onclick: ctrl.createFile(settings,'JSON')},[
                        m('i.fas fa-file-download'), ' Download JSON']),
                    m('button.CreateJSONFile', {onclick: ctrl.printToPage(settings)}, 'Print to Browser')
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

