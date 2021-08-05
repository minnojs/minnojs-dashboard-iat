
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
        settings.objectCat1 = input.objectCat1;
        settings.objectCat2 = input.objectCat2;
        settings.attribute1 = input.attribute1;
        settings.attribute2 = input.attribute2;
        settings.parameters.base_url = input.base_url;
        
        settings.parameters.keyTopLeft = input.keyTopLeft;
        settings.parameters.keyTopRight = input.keyTopRight;
        settings.parameters.keyBottomLeft = input.keyBottomLeft;
        settings.parameters.keyBottomRight = input.keyBottomRight;

        settings.blocks.nBlocks = input.nBlocks;
        settings.blocks.nTrialsPerPrimeTargetPair = input.nTrialsPerPrimeTargetPair;
        settings.blocks.randomCategoryLocation = input.randomCategoryLocation;
        settings.blocks.randomAttributeLocation = input.randomAttributeLocation;

        settings.text.firstBlock = input.firstBlock;
        settings.text.middleBlock = input.middleBlock;
        settings.text.lastBlock = input.lastBlock;
        
    }
}

export default importComponent;