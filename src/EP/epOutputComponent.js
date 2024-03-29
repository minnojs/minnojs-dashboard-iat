import {clone, checkMissingElementName, checkPrime,viewOutput} from '../resources/utilities.js';

let outputComponent = {
    controller: controller,
    view:view
};

function controller(settings){
    let error_msg = [];

    validityCheck(settings)
    settings = updateMediaSettings(settings);

    return{printToPage, createFile, error_msg};

    function validityCheck(settings){
        let containsImage = false

        let temp1 = checkPrime(settings.prime1, 'First Prime Category', error_msg)
        let temp2 = checkPrime(settings.prime2, 'Second Prime Category', error_msg)
        let temp3 = checkMissingElementName(settings.rightAttTargets, 'First Target Category', error_msg)
        let temp4 = checkMissingElementName(settings.leftAttTargets, 'Second Target Category', error_msg)

        containsImage = temp1 || temp2 || temp3 || temp4;

        if(settings.parameters.base_url.image.length === 0 && containsImage)
            error_msg.push('Image\'s\ url is missing and there is an image in the study');  
        
        //check for blocks problems
        if(!settings.blocks.nTrialsPerPrimeTargetPair)
            error_msg.push('Number of trials in a block, per prime-target combination equals to zero, this will result in not showing the trials.')
        if(!settings.blocks.nBlocks)
            error_msg.push('Number of blocks equals to zero, this will result in skipping the task.')
             
    }

    function createFile(settings, fileType){
        return function(){
            let output,textFileAsBlob;
            let downloadLink = document.createElement('a');
            if (fileType === 'JS'){
                output = toString();
                textFileAsBlob = new Blob([output], {type:'text/plain'});
                downloadLink.download = 'EP.js';
            }
            else{
                output = updateSettings();
                textFileAsBlob = new Blob([JSON.stringify(output,null,4)], {type : 'application/json'});
                downloadLink.download = 'EP.json';
            }
            if (window.webkitURL != null) 
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            else{
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);
            }
            downloadLink.click();
        };
    }

    function printToPage(){
        return function(){
            let para = document.getElementById('textDiv');
            para.style.visibility = 'visible';
            let text_area = document.getElementById('textArea');
            text_area.value = toString();
        };
    }
    
    function toString(){
        return toScript(updateSettings());
    }

    function updateMediaSettings(){
        //update attributes names to be compatible to EP
        let settings_output = clone(settings)
        settings_output.targetCats = {}
        settings_output.targetCats.rightAttTargets = settings_output.rightAttTargets
        settings_output.targetCats.rightAttTargets.mediaArray = settings_output.rightAttTargets.stimulusMedia
        delete settings_output.rightAttTargets.stimulusMedia
        settings_output.targetCats.leftAttTargets = settings_output.leftAttTargets
        settings_output.targetCats.leftAttTargets.mediaArray = settings_output.leftAttTargets.stimulusMedia
        delete settings_output.leftAttTargets.stimulusMedia

        settings_output.targetCats.rightAttTargets.stimulusCSS = settings_output.rightAttTargets.stimulusCss
        settings_output.targetCats.leftAttTargets.stimulusCSS = settings_output.leftAttTargets.stimulusCss
        delete settings_output.rightAttTargets.stimulusCss
        delete settings_output.leftAttTargets.stimulusCss
        delete settings_output.rightAttTargets
        delete settings_output.leftAttTargets

        return settings_output;
    }
    
    function updateSettings(){
        let output={
            primeStimulusCSS: settings.primeStimulusCSS,
            prime1: settings.prime1,
            prime2: settings.prime2,
            targetCats: settings.targetCats
        };
        if(settings.parameters.isQualtrics)
            output.isQualtrics = settings.parameters.isQualtrics;
        delete settings.parameters.isQualtrics;
        
        Object.assign(output, settings.parameters);
        Object.assign(output, settings.blocks);
        Object.assign(output, settings.text); 
        return output;
    }
    
    function toScript(output){
        return `define(['pipAPI' ,'${output.isQualtrics ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/ep/qualtrics/quep5.js': 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/ep/ep5.js'}'], function(APIConstructor, epExtension) {var API = new APIConstructor(); return epExtension(${JSON.stringify(output,null,4)});});`;
    }
}

function view(ctrl, settings){
    return viewOutput(ctrl, settings)
}


export default outputComponent;

