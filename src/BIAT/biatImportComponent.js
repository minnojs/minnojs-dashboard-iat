
var importComponent = {
    controller:controller,
    view:view
};

function view(ctrl){
    return m('div.uploadDiv', [
        m('i.fa.fa-info-circle', {style: {padding: '5px'}}),
        m('.card.info-box.card-header', ["You can upload a JSON file and update it's contnet through the editor and then download a new one"]),
        m('label', 'Upload a JSON file: ', {style:{'text-align': 'center'}}),
        m('input[type=file]',{id:"uploadFile", style: {'text-align': 'center'}, onchange: ctrl.handleFile})
    ]);
}

function controller(settings) {
    let fileInput = m.prop('');
    return {fileInput:fileInput, handleFile:handleFile, updateSettings:updateSettings};

    function handleFile(){
        var importedFile = document.getElementById("uploadFile").files[0];
        var reader = new FileReader();
        reader.readAsText(importedFile); 
        reader.onload = function() {
        var fileContent = JSON.parse(reader.result);
        updateSettings(fileContent);};
        reader.onerror = function() {console.log(reader.error);};
    }
    function updateSettings(input) {
        if(input.practiceBlock) {
            settings.practiceCategory1 = input.practiceCategory1;
            settings.practiceCategory2 = input.practiceCategory2;
        }
        settings.categories = input.categories;
        settings.attribute1 = input.attribute1;
        settings.attribute2 = input.attribute2;
        settings.parameters.base_url = input.base_url;
        settings.parameters.remindError = input.remindError;
        settings.parameters.showStimuliWithInst = input.showStimuliWithInst;
        settings.parameters.isTouch = input.isTouch;
        settings.parameters.practiceBlock = input.practiceBlock;

        settings.blocks.nMiniBlocks = input.nMiniBlocks,
        settings.blocks.nTrialsPerMiniBlock = input.nTrialsPerMiniBlock,
        settings.blocks.nPracticeBlockTrials = input.nPracticeBlockTrials,
        settings.blocks.nCategoryAttributeBlocks = input.nCategoryAttributeBlocks,
        settings.blocks.focalAttribute = input.focalAttribute,
        settings.blocks.firstFocalAttribute = input.firstFocalAttribute,
        settings.blocks.focalCategoryOrder = input.focalCategoryOrder
        if(input.isQualtrics) settings.parameters.isQualtrics = input.isQualtrics;
        if (input.isTouch){
            settings.touch_text.remindErrorText = input.remindErrorText,
            settings.touch_text.leftKeyText = input.leftKeyText,
            settings.touch_text.rightKeyText = input.rightKeyText,
            settings.touch_text.orKeyText = input.orKeyText,
            settings.touch_text.finalText = input.finalText,
            settings.touch_text.instTemplate = input.instTemplate}
        else {
            settings.text.remindErrorText = input.remindErrorText,
            settings.text.leftKeyText = input.leftKeyText,
            settings.text.rightKeyText = input.rightKeyText,
            settings.text.orKeyText = input.orKeyText,
            settings.text.finalText = input.finalText,
            settings.text.instTemplate = input.instTemplate}
    }
}

export default importComponent;

