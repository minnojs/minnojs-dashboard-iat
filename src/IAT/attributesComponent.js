import elementComponent from './elementComponent.js';

let attributesComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, clearElement){
    let tabs = [
        {value: 'attribute1', text: 'First Attribute'},
        {value: 'attribute2', text: 'Second Attribute'},
    ]
    let curr_tab = tabs[0].value; // set default tab
    return {reset:reset, clear:clear, tabs, curr_tab};
    function reset(){
        Object.assign(settings.attribute1,  JSON.parse(JSON.stringify(defaultSettings.attribute1)));
        Object.assign(settings.attribute2,  JSON.parse(JSON.stringify(defaultSettings.attribute2)));}
    function clear(){
        Object.assign(settings.attribute1, clearElement[0]);
        Object.assign(settings.attribute2, clearElement[0]);
    }
}

function view(ctrl,settings, defaultSettings) {
    return m('.container.space', [
        m('.tab',{style:{width:'19.5em'}}, ctrl.tabs.map(function(tab){
            return m('button', {
                class: ctrl.curr_tab == tab.value ? 'active' : '',
                onclick:function(){
                    ctrl.curr_tab = tab.value;
                }},tab.text);
        })),
        m('.div', [
            m.component(elementComponent, {key:ctrl.curr_tab}, settings, defaultSettings[ctrl.curr_tab].stimulusMedia),
        ]),
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

export default attributesComponent;
