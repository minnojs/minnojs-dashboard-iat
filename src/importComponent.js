
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
        console.log("from file", fileContent);
        console.log("settings", settings);
        updateSettings(fileContent);
        };
        reader.onerror = function() {
            console.log(reader.error);
        };
    }
    function updateSettings(input) {
        settings.category1 = input.category1;
        settings.category2 = input.category2;
        settings.attribute1 = input.attribute1;
        settings.attribute2 = input.attribute2;
        settings.parameters.base_url = input.base_url;
        settings.parameters.remindError = input.remindError;
        settings.parameters.errorCorrection
        if(input.isQualtrics){
            settings.parameters.isQualtrics = input.isQualtrics;
            settings.parameters.showDebriefing = input.showDebriefing;
            settings.parameters.fullscreen = input.fullscreen;
            settings.parameters.isTouch = input.isTouch;
        }
        settings.blocks.blockCategories_nTrials = input.blockCategories_nTrials,
        settings.blocks.blockCategories_nMiniBlocks = input.blockCategories_nMiniBlocks,
        settings.blocks.blockAttributes_nTrials = input.blockAttributes_nTrials,
        settings.blocks.blockAttributes_nMiniBlocks = input.blockAttributes_nMiniBlocks,
        settings.blocks.blockFirstCombined_nTrials = input.blockFirstCombined_nTrials,
        settings.blocks.blockFirstCombined_nMiniBlocks = input.blockFirstCombined_nMiniBlocks,
        settings.blocks.blockSecondCombined_nTrials = input.blockSecondCombined_nTrials,
        settings.blocks.blockSecondCombined_nMiniBlocks = input.blockSecondCombined_nMiniBlocks,
        settings.blocks.blockSwitch_nTrials = input.blockSwitch_nTrials,
        settings.blocks.blockSwitch_nMiniBlocks = input.blockSwitch_nMiniBlocks,
        settings.blocks.randomBlockOrder = input.randomBlockOrder,
        settings.blocks.randomAttSide = input.randomAttSide,
        
        setting.text.textOnError = input.textOnError,
        setting.text.leftKeyText = input.leftKeyText,
        setting.text.rightKeyText = input.rightKeyText,
        setting.text.orKeyText = input.orKeyText,
        setting.text.AttributesBlockInstructions = input.AttributesBlockInstructions,
        setting.text.CategoriesBlockInstructions = input.CategoriesBlockInstructions,
        setting.text.FirstCombinedBlockInstructions = input.FirstCombinedBlockInstructions,
        setting.text.SecondCombinedBlockInstructions = input.SecondCombinedBlockInstructions,
        setting.text.SwitchedCategoriesInstructions = input.SwitchedCategoriesInstructions,
        setting.text.PreDebriefingText = input.PreDebriefingText;

        //console.log("after UPDATE", settings);
    }
}

export default importComponent;

