import {clone, checkMissingElementName, viewOutput} from '../resources/utilities.js';

let outputComponent = {
    view:view,
    controller:controller,
};

function controller(settings, defaultSettings, clearBlock){
    let error_msg = [];

    validityCheck(settings)
    settings = updateMediaSettings(settings);

    return {error_msg, createFile, printToPage};

    function validityCheck(settings){
        let containsImage = false

        let temp1 = checkMissingElementName(settings.category, 'Category', error_msg)
        let temp2 = checkMissingElementName(settings.attribute1, 'First Attribute', error_msg) 
        let temp3 = checkMissingElementName(settings.attribute2, 'Second Attribute', error_msg)

        containsImage = temp1 || temp2 || temp3

        if(settings.parameters.base_url.image.length === 0 && containsImage)
            error_msg.push('Image\'s\ url is missing and there is an image in the study');    
        
        //check for blocks problems
        let currBlocks = clone(settings.trialsByBlock)
        clearBlock = clone(clearBlock); //blocks parameters with zeros as the values, used to check if the current parameters are also zeros.
        delete clearBlock.block;
        
        let count = 0
        let temp_err_msg = []
        currBlocks.forEach(function(element, index){ //remove those parameters for the comparsion
            delete element.block;
            if(JSON.stringify(element) === JSON.stringify(clearBlock)){
                temp_err_msg.push('All block #'+(index+1)+' parameters equals to 0, that will result in skiping this block'); 
                count++;
            }   
        })
        if (count === currBlocks.length)
            error_msg.push('All the block\'s parameters equals to 0, that will result in not showing the task at all');    
        else if (temp_err_msg.length !==0) error_msg = error_msg.concat(temp_err_msg);

    }

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
        //update attributes to be compatible to STIAT
        let settings_output = clone(settings)
        settings_output.category.media = settings_output.category.stimulusMedia
        delete settings_output.category.stimulusMedia
        settings_output.attribute1.media = settings_output.attribute1.stimulusMedia
        delete settings_output.attribute1.stimulusMedia
        settings_output.attribute2.media = settings_output.attribute2.stimulusMedia
        delete settings_output.attribute2.stimulusMedia

        settings_output.category.css = settings_output.category.stimulusCss 
        delete settings_output.category.stimulusCss 
        settings_output.attribute1.css = settings_output.attribute1.stimulusCss 
        delete settings_output.attribute1.stimulusCss 
        settings_output.attribute2.css = settings_output.attribute2.stimulusCss 
        delete settings_output.attribute2.stimulusCss 
        return settings_output
    }
    
    function updateSettings(){
        let output={
            category: settings.category,
            attribute1: settings.attribute1,
            attribute2: settings.attribute2,
            base_url: settings.parameters.base_url.image,
            trialsByBlock: settings.trialsByBlock,
            blockOrder: settings.blockOrder,
            switchSideBlock: settings.switchSideBlock
        };

        if(settings.parameters.isQualtrics) //put the isQualtrics only the in the Qualtrics version
            output.isQualtrics = settings.parameters.isQualtrics;
        
        Object.assign(output, settings.text); 
        return output;
    }
    
    function toScript(output){
        return `define(['pipAPI' ,'${output.isQualtrics ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/qualtrics/qstiat6.js': 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/stiat/stiat6.js'}'], function(APIConstructor, stiatExtension) {var API = new APIConstructor(); return stiatExtension(${JSON.stringify(output,null,4)});});`;
    }
}

function view(ctrl, settings){
    return viewOutput(ctrl, settings)
}

export default outputComponent;

