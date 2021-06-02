
let importComponent = {
    controller:controller,
    view:view
};

function view(ctrl){
    return m('.container',[ 
        m('br'),
        m('.row justify-content-md-center',[
            m('.card border-info mb-3',{style:{'max-width': '25rem'}}, [
                m('.card-header','Upload a JSON file: ' ),
                m('.card-body text-info',[
                    m('p.card-title','If you saved a JSON file from a previous session, you can upload that file here to edit the parameters.'),
                    m('input[type=file].form-control',{id:'uploadFile', style: {'text-align': 'center'}, onchange: ctrl.handleFile})
                ])
            ])
        ])
    ]);
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

        settings.blocks.nMiniBlocks = input.nMiniBlocks;
        settings.blocks.nTrialsPerMiniBlock = input.nTrialsPerMiniBlock;
        settings.blocks.nPracticeBlockTrials = input.nPracticeBlockTrials;
        settings.blocks.nCategoryAttributeBlocks = input.nCategoryAttributeBlocks;
        settings.blocks.focalAttribute = input.focalAttribute;
        settings.blocks.firstFocalAttribute = input.firstFocalAttribute;
        settings.blocks.focalCategoryOrder = input.focalCategoryOrder;
        if(input.isQualtrics) settings.parameters.isQualtrics = input.isQualtrics;
        if (input.isTouch){
            settings.touch_text.remindErrorText = input.remindErrorText;
            settings.touch_text.leftKeyText = input.leftKeyText;
            settings.touch_text.rightKeyText = input.rightKeyText;
            settings.touch_text.orKeyText = input.orKeyText;
            settings.touch_text.finalText = input.finalText;
            settings.touch_text.instTemplate = input.instTemplate;
        }
        else {
            settings.text.remindErrorText = input.remindErrorText;
            settings.text.leftKeyText = input.leftKeyText;
            settings.text.rightKeyText = input.rightKeyText;
            settings.text.orKeyText = input.orKeyText;
            settings.text.finalText = input.finalText;
            settings.text.instTemplate = input.instTemplate;
        }
    }
}

export default importComponent;

