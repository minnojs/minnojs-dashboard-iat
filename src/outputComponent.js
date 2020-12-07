
var outputComponent = {
    //controller:controller,
    view:view
};


function view(ctrl,settings){
    return m('div', [
        m('button.CreateFile', {onclick: createFile(settings)}, 'Download script'),
        m('button.CreateFile', {onclick: createJSONFile(settings)}, 'Download JSON File'),
        m('button.CreateFile', {onclick: toConsole(settings)}, 'Print to Console'),
        //m('button.CreateFile', {onclick: toConsole2(settings)}, 'Print to Console-newSetting')
    ]);
}

export default outputComponent;



function createJSONFile(settings){
    return function(){
        var output = updateSettings(settings);
        var textFileAsBlob = new Blob([JSON.stringify(output,null,4)], {type : 'application/json'});
        var downloadLink = document.createElement("a");
        downloadLink.download = "newIAT.json";
        if (window.webkitURL != null) {downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);}
        else{
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            }
        downloadLink.click();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.responseText);
                console.log("data====>",myObj);
            }
        };
        xhttp.open("GET", "src/newIAT (7).json", true);
        xhttp.send();
        }
}


function createFile(settings){
    return function(){
        var output = toString(settings);
        var textFileAsBlob = new Blob([output], {type:'text/plain'});
        var downloadLink = document.createElement("a");
        downloadLink.download = "newIAT.txt";
        if (window.webkitURL != null) {downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);}
        else{
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            }
        downloadLink.click();
        }
}



function toConsole(settings){
    return function(){
        window.settings = settings;
        console.log(settings);
    }
}

function toConsole2(settings){
    return function(){
        var output=toString(settings);
        window.output = output;
        console.log(output);
    }
}

function toString(settings){
    return toScript(updateSettings(settings));
}

function updateSettings(settings){
    var output={
        category1: settings.category1,
        category2: settings.category2,
        attribute1: settings.attribute1,
        attribute2: settings.attribute2,
        base_url: settings.parameters.base_url,
        remindError: settings.parameters.remindError,
        errorCorrection: settings.parameters.errorCorrection,
        isTouch: settings.parameters.isTouch
    }
    if(settings.parameters.isQualtrics){
        output.isQualtrics=settings.parameters.isQualtrics,
        output.showDebriefing=settings.parameters.showDebriefing,
        output.fullscreen=settings.parameters.fullscreen
    }

    Object.assign(output, settings.blocks);
    if(settings.parameters.isTouch) Object.assign(output, settings.touch_text);
    else Object.assign(output, settings.text); 
    return output;
}

function toScript(output){

    return `define(['pipAPI' ,'${output.isQualtrics ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/qualtrics/quiat9.js': 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat8.js'}'], function(APIConstructor, iatExtension) {var API = new APIConstructor(); return iatExtension(${JSON.stringify(output,null,4)})});`

}


