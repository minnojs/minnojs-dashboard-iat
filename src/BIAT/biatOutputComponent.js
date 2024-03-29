import {clone, checkMissingElementName, viewOutput} from '../resources/utilities.js';

let outputComponent = {
    controller: controller,
    view:view
};

function controller(settings, defaultSettings, blocksObject){
    let error_msg = [];
    validityCheck(settings)

    return{printToPage, createFile, error_msg}

    function validityCheck(settings){
        let containsImage = false
        let category_headlines = ['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth'];

        let temp1,temp2,temp3 = false;
        if(settings.parameters.practiceBlock){
            temp1 = checkMissingElementName(settings.practiceCategory1, 'First Pratice Category', error_msg)
            temp2 = checkMissingElementName(settings.practiceCategory2, 'Second Pratice Category', error_msg)
        }
        settings.categories.map(function(category, index){
            let temp = checkMissingElementName(category, category_headlines[index]+' Category', error_msg)
            if (temp) temp3 = true;
        });

        let temp4 = checkMissingElementName(settings.attribute1, 'First Attribute', error_msg);
        let temp5 = checkMissingElementName(settings.attribute2, 'Second Attribute', error_msg);

        containsImage = temp1 || temp2 || temp3 || temp4 || temp5;

        if(settings.parameters.base_url.image.length === 0 && containsImage)
            error_msg.push('Image\'s\ url is missing and there is an image in the study');    
        
        //check for blocks problems
        let currBlocks = clone(settings.blocks)
        let clearBlocks = blocksObject.slice(-1)[0]; //blocks parameters with zeros as the values, used to check if the current parameters are also zeros.
   
        ['focalAttribute', 'firstFocalAttribute', 'focalCategoryOrder'].forEach(function(key){
            delete currBlocks[key];
            delete clearBlocks[key];
        })

        if(JSON.stringify(currBlocks) === JSON.stringify(clearBlocks))
            error_msg.push('All the block\'s parameters equals to 0, that will result in not showing the task at all');    
    }

    function createFile(settings, type){
        return function(){
            let output,textFileAsBlob;
            let downloadLink = document.createElement('a');
            if (type === 'JS'){
                output = toString(settings);
                textFileAsBlob = new Blob([output], {type:'text/plain'});
                downloadLink.download = 'BIAT.js';
            }
            else{
                output = updateSettings(settings);
                textFileAsBlob = new Blob([JSON.stringify(output,null,4)], {type : 'application/json'});
                downloadLink.download = 'BIAT.json';
            }
            if (window.webkitURL) {downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);}
            else{
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);
            }
            downloadLink.click();
        };
    }

    function printToPage(settings){
        return function(){
            let para = document.getElementById('textDiv');
            para.style.visibility = 'visible';
            let text_area = document.getElementById('textArea');
            text_area.value = toString(settings);
        };
    }

    function toString(settings){return toScript(updateSettings(settings));}

    function removeIndexFromCategories(settings){
        let categories = settings.categories;
        categories.forEach(element => delete element.key)
    }

    function updateSettings(settings){
        removeIndexFromCategories(settings);
        let output = {};
        if (settings.parameters.practiceBlock){
            output.practiceCategory1 = settings.practiceCategory1;
            output.practiceCategory2 = settings.practiceCategory2;
        }
        output.categories = settings.categories;
        output.attribute1 = settings.attribute1;
        output.attribute2 = settings.attribute2;

        if(settings.parameters.isQualtrics) //put the isQualtrics only the in the Qualtrics version
            output.isQualtrics = settings.parameters.isQualtrics;
        delete settings.parameters.isQualtrics;
        
        Object.assign(output, settings.parameters);
        Object.assign(output, settings.blocks);
        settings.parameters.isTouch ? Object.assign(output, settings.touch_text) : Object.assign(output, settings.text); 
        return output;
    }

    function toScript(output){
        return `define(['pipAPI' ,'${output.isQualtrics ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/BIAT/qualtrics/qbiat6.js': 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/BIAT/biat6.js'}'], function(APIConstructor, iatExtension) {var API = new APIConstructor(); return iatExtension(${JSON.stringify(output,null,4)});});`;
    }
}

function view(ctrl, settings){
    return viewOutput(ctrl, settings)
}

export default outputComponent;


