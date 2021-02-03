import elementComponent from './elementComponent.js';

var attributesComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, clearElement){
    return {reset:reset, clear:clear};
    function reset(){
        Object.assign(settings.attribute1,  JSON.parse(JSON.stringify(defaultSettings.attribute1)));
        Object.assign(settings.attribute2,  JSON.parse(JSON.stringify(defaultSettings.attribute2)));}
    function clear(){
        Object.assign(settings.attribute1, clearElement[0]);
        Object.assign(settings.attribute2, clearElement[0]);
    }
}

function view(ctrl,settings, defaultSettings) {
    return m('.container', [
        m('table.w3-table w3-bordered', [
            m('tr', [
                m('h1.categoryHeadline',"First Attribute"),
                m('td',{style: {position: 'absolute', right: '95px', top: "180px"}},[
                        m('button.reset_button', {onclick: ctrl.reset},'Reset'),
                        m('button.reset_button',{onclick: ctrl.clear}, 'Clear')
                ])
            ]),
        ]),
        m.component(elementComponent,{key: "attribute1"} ,settings, defaultSettings.attribute1.stimulusMedia),
        m('h1.categoryHeadline',"Second Attribute"),
        m.component(elementComponent,{key:"attribute2"}, settings, defaultSettings.attribute2.stimulusMedia)
    ])
};

export default attributesComponent;
