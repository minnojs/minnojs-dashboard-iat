import elementComponent from './biatElementComponent.js';


var prCategoriesComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, clearElement){

    return {reset:reset, clear:clear};
    function reset(){
        Object.assign(settings.practiceCategory1, JSON.parse(JSON.stringify(defaultSettings.practiceCategory1)));
        Object.assign(settings.practiceCategory2, JSON.parse(JSON.stringify(defaultSettings.practiceCategory2)));
    }
    function clear(){
        Object.assign(settings.practiceCategory1, clearElement[0]);
        Object.assign(settings.practiceCategory2, clearElement[0]);
    }
}

function view(ctrl, settings, defaultSettings) {
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
        m.component(elementComponent, {key: "practiceCategory1"} ,settings,
        defaultSettings.practiceCategory1.stimulusMedia, defaultSettings.practiceCategory1.title.startStimulus),
        m('h1.categoryHeadline',"Second Category"),
        m.component(elementComponent, {key:"practiceCategory2"}, settings,
        defaultSettings.practiceCategory2.stimulusMedia, defaultSettings.practiceCategory2.title.startStimulus)
    ])
};

export default prCategoriesComponent;