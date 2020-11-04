
var outputComponent = {
    view: function(ctrl, settings){
        return m('div', [
            m('button.CreateFile', {onclick: createFile(settings)}, 'Download script'),
            m('button.CreateFile', {onclick: toConsole(settings)}, 'Print to Console')
        ]);
    }
}

export default outputComponent;

function createFile(settings){
    return function(){
        console.log('Creating file for download - not implemented yet');
    }
}

function toConsole(settings){
    return function(){
        window.settings = settings;
        console.log(settings);
    }
}
