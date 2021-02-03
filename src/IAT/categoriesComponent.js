import elementComponent from './elementComponent.js';

var categoriesComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, clearElement){
    return {reset:reset, clear:clear};
    function reset(){
        Object.assign(settings.category1,  JSON.parse(JSON.stringify(defaultSettings.category1)));
        Object.assign(settings.category2, JSON.parse(JSON.stringify(defaultSettings.category2)));
    }
    function clear(){
        Object.assign(settings.category1, JSON.parse(JSON.stringify(clearElement[0])));
        Object.assign(settings.category2, JSON.parse(JSON.stringify(clearElement[0])));
    }
}

function view(ctrl,settings, defaultSettings) {
    return m('.container', [
        m('table.w3-table w3-bordered', [
            m('tr', [
                m('h1.categoryHeadline',"First Category"),
                m('td',{style: {position: 'absolute', right: '95px', top: "180px"}},[
                        m('button.reset_button', {onclick: ctrl.reset},'Reset'),
                        m('button.reset_button',{onclick: ctrl.clear}, 'Clear')
                ])
            ]),
        ]),
        m.component(elementComponent, {key: "category1"} ,settings, defaultSettings.category1.stimulusMedia),
        m('h1.categoryHeadline',"Second Category"),
        m.component(elementComponent, {key:"category2"}, settings, defaultSettings.category2.stimulusMedia)
    ])
};

export default categoriesComponent;
