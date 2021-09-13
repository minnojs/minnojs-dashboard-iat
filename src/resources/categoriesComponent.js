import elementComponent from './elementComponent.js';
import biatElementComponent from '../BIAT/biatElementComponent.js';
import {showClearOrReset} from '../resources/utilities.js';

let categoriesComponent = {
    controller:controller,
    view:view
};

let btnWidthTypes = {
    attribute: '19.5em',
    category:'20.4em',
    practiceCategory:'29.65em',
    single:'7em' //for SPF    
}

function controller(settings, defaultSettings, clearElement, subTabs){
    let curr_tab = subTabs[0].value; // set default tab
    let buttonWidth = curr_tab.toLowerCase().includes('attribute') ? btnWidthTypes.attribute: 
        curr_tab.toLowerCase().includes('practice') ? btnWidthTypes.practiceCategory : btnWidthTypes.category;

    subTabs.length == 1 ? buttonWidth = btnWidthTypes.single : ''; //for SPF which have one category

    return {reset, clear, subTabs, curr_tab, buttonWidth};

    function reset(){showClearOrReset(settings[this.curr_tab], defaultSettings[this.curr_tab],'reset');}
    function clear(){showClearOrReset(settings[this.curr_tab],clearElement[0],'clear');}
}

function view(ctrl, settings, defaultSettings, clearElement, subTabs, isBiat) {
    return m('.container.space', [
        m('.subtab',{style:{width: ctrl.buttonWidth}}, ctrl.subTabs.map(function(tab){
            return m('button',{
                class: ctrl.curr_tab == tab.value ? 'active' : '',
                onclick:function(){
                    ctrl.curr_tab = tab.value;
                }},tab.text);
        })),
        m('.div', 
            isBiat ?
            m.component(biatElementComponent,{key:ctrl.curr_tab}, settings,
                defaultSettings[ctrl.curr_tab].stimulusMedia, defaultSettings[ctrl.curr_tab].title.startStimulus) 
            :
            m.component(elementComponent, {key:ctrl.curr_tab}, settings, defaultSettings[ctrl.curr_tab].stimulusMedia),
        ),
        m('.row.space',[
            m('.col',{style:{'margin-bottom':'7px'}},[
                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
                    m('button.btn btn-secondary', 
                        {title:'Reset all current fields to default values', onclick: () => ctrl.reset()},
                        m('i.fas fa-undo fa-sm'), ' Reset'),
                    m('button.btn btn-danger',
                        {title:'Clears all current values',onclick:() => ctrl.clear()},
                        m('i.far fa-trash-alt fa-sm'), ' Clear'),
                ])
            ])
        ])
    ]);
}

export default categoriesComponent;
