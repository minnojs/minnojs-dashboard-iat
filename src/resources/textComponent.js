import {showClearOrReset} from './utilities.js';

let textComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    var textparameters;
    var isTouch = settings.parameters.isTouch;
    isTouch ? textparameters = settings.touch_text : textparameters = settings.text;
    return {reset, clear, set, get, rows: rows.slice(0,-2), isTouch};
    
    function reset(){
        let valueToSet = isTouch ? defaultSettings.touch_text : defaultSettings.text;
        showClearOrReset(textparameters, valueToSet, 'reset') 
    }
    function clear(){
        let valueToSet = isTouch ? rows.slice(-1)[0] :  rows.slice(-2)[0];
        showClearOrReset(textparameters, valueToSet, 'clear') 
    }
    function get(name){return textparameters[name];}
    function set(name){ 
        return function(value){return textparameters[name] = value;};
    }
}

function view(ctrl){
    return m('.container' , [
        ctrl.rows.map(function(row) {
            //if touch parameter is choosen, don't show the irrelevant text parametes
            if (ctrl.isTouch === true && row.nameTouch === undefined) {
                return null;
            }
            return m('.row.space.line', [
                m('.col-xs-1.space',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', {style:{width: '510px'}},[row.desc])
                ]),
                m('.col-3.space', {style:{width: '30%'}},row.label),
                m('.col-8.space', [
                    m('textarea.form-control',{style: {width: '30rem' ,height: '5.5rem'}, value:ctrl.get(ctrl.isTouch ? row.nameTouch : row.name), onchange:m.withAttr('value', ctrl.set(ctrl.isTouch ? row.nameTouch : row.name))})
                ])
            ]);
        }),
        m('.row.space',[
            m('.col',{style:{'margin-bottom':'7px'}},[
                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
                    m('button.btn btn-secondary', 
                        {title:'Reset all current fields to default values', onclick: () => ctrl.reset()},
                        m('i.fas fa-undo fa-sm'), ' Reset'),
                    m('button.btn btn-danger',
                        {title:'Clears all current values',onclick:() => ctrl.clear()},
                        m('i.far fa-trash-alt fa-sm'), ' Clear')
                ])
            ])
        ])
    ]);
}

export default textComponent;
