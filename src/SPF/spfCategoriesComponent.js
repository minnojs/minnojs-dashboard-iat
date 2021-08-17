import elementComponent from '../IAT/elementComponent.js';

let categoriesComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, clearElement){
    return {reset:reset, clear:clear};
    function reset(){
        Object.assign(settings.objectCat1,  JSON.parse(JSON.stringify(defaultSettings.objectCat1)));
        Object.assign(settings.objectCat2, JSON.parse(JSON.stringify(defaultSettings.objectCat2)));
    }
    function clear(){
        Object.assign(settings.objectCat1, JSON.parse(JSON.stringify(clearElement[0])));
        Object.assign(settings.objectCat2, JSON.parse(JSON.stringify(clearElement[0])));
    }
}

function view(ctrl,settings, defaultSettings) {
    return m('.container', [
        m('.row top-buffer',
            m('col', m('h1.categoryHeadline','First Category'))),
        m.component(elementComponent, {key: 'objectCat1'} ,settings, defaultSettings.objectCat1.stimulusMedia),
        m('h1.categoryHeadline','Second Category'),
        m('.row top-buffer'),
        m.component(elementComponent, {key:'objectCat2'}, settings, defaultSettings.objectCat2.stimulusMedia),
        m('.row.space',[
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
        ])
    ]);
}

export default categoriesComponent;
