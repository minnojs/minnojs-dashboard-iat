
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
    function updateMediaSettings(input){
        input.category.stimulusMedia = input.category.media
        delete input.category.media
        input.attribute1.stimulusMedia = input.attribute1.media
        delete input.attribute1.media
        input.attribute2.stimulusMedia = input.attribute2.media
        delete input.attribute2.media
    }
    function updateSettings(input) {
        console.log("before", )
        updateMediaSettings(input);
        console.log("after")
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
        // settings = input;
        //console.log(settings);
        
    }
}

export default importComponent;