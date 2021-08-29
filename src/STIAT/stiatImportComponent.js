import {viewImport} from '../resources/utilities.js';

let importComponent = {
    controller:controller,
    view:view
};

function view(ctrl){
    return viewImport(ctrl)
}

function controller(settings) {
    let fileInput = m.prop('');
    return {fileInput:fileInput, handleFile:handleFile, updateSettings:updateSettings};

    function handleFile(){
        let importedFile = document.getElementById('uploadFile').files[0];
        let reader = new FileReader();
        reader.readAsText(importedFile); 
        reader.onload = function() {
            let fileContent = JSON.parse(reader.result);
            updateSettings(fileContent);
        };
    }
    function updateMediaSettings(input){
        //update attributes to be compatible to IAT so that elementComponent can be used.
        settings.category.stimulusMedia = input.category.media
        delete settings.category.media
        settings.attribute1.stimulusMedia = input.attribute1.media
        delete settings.attribute1.media
        settings.attribute2.stimulusMedia = input.attribute2.media
        delete settings.attribute2.media

        settings.category.stimulusCss = input.category.css
        delete settings.category.css
        settings.attribute1.stimulusCss = input.attribute1.css
        delete settings.attribute1.css
        settings.attribute2.stimulusCss = input.attribute2.css
        delete settings.attribute2.css
    }
    function updateSettings(input) {

        settings.category = input.category;
        settings.attribute1 = input.attribute1;
        settings.attribute2 = input.attribute2;
        settings.parameters.base_url = input.base_url;
        settings.parameters.isQualtrics = input.isQualtrics;
        settings.text.leftKeyText = input.leftKeyText;
        settings.text.rightKeyText = input.rightKeyText;
        settings.text.orKeyText = input.orKeyText;
        settings.text.remindErrorText = input.remindErrorText;
        settings.text.finalText = input.finalText;
        settings.text.instTemplatePractice = input.instTemplatePractice;
        settings.text.instTemplateCategoryRight = input.instTemplateCategoryRight;
        settings.text.instTemplateCategoryLeft = input.instTemplateCategoryLeft;
        settings.trialsByBlock = input.trialsByBlock
        settings.blockOrder = input.blockOrder;
        settings.switchSideBlock = input.switchSideBlock;

        updateMediaSettings(input); 

        
    }
}

export default importComponent;