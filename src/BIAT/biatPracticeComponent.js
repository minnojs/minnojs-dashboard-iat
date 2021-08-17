import elementComponent from './biatElementComponent.js';


let prCategoriesComponent = {
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
        m('.row top-buffer',[
            m('col', m('h1.categoryHeadline','First Practice Category'))]),
        m.component(elementComponent, {key: 'practiceCategory1'} ,settings,
            defaultSettings.practiceCategory1.stimulusMedia, defaultSettings.practiceCategory1.title.startStimulus),
        m('h1.categoryHeadline','Second Practice Category'),
        m('.row top-buffer'),
        m.component(elementComponent, {key:'practiceCategory2'}, settings,
            defaultSettings.practiceCategory2.stimulusMedia, defaultSettings.practiceCategory2.title.startStimulus),
        m('.row top-buffer',[
            m('.col',{style:{'margin-bottom':'7px'}},[
                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
                    m('button.btn btn-secondary', 
                        {title:'Reset all current fields to default values', onclick: () => confirm('Are you sure you want to reset the current form?\n This action is permanent') ? ctrl.reset() : null},[
                        m('i.fas fa-undo fa-sm'), ' Reset'
                    ]),
                    m('button.btn btn-danger',
                        {title:'Clears all current values',onclick:() => confirm('Are you sure you want to clear the current form?\n This action is permanent') ? ctrl.clear() : null},[
                        m('i.far fa-trash-alt fa-sm'), ' Clear'
                    ]),
                ]),
            ]),
        ]),
    ]);
}

export default prCategoriesComponent;