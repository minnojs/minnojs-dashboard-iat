import {showClearOrReset, showRestrictions} from '../resources/utilities.js';

var parametersComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    var parameters = settings.parameters;
    var qualtricsParameters = ['leftKey', 'rightKey', 'fullscreen', 'showDebriefing']
    return {reset, clear, set, get, rows, qualtricsParameters};
    
    function reset(){showClearOrReset(parameters, defaultSettings.parameters, 'reset')}
    function clear(){showClearOrReset(parameters, rows.slice(-1)[0],'clear')};
    
    function get(name, object, parameter){
        if (name == 'isTouch')
            if(parameters[name] == true) return 'Touch' 
            else return 'Keyboard';
        if (name == 'isQualtrics')
            if (parameters[name] == true){return 'Qualtrics'}
            else return 'Regular';
        if(object && parameter){
            if (parameter == 'font-size'){
                return parseFloat((parameters[name][object][parameter].replace("em","")));
            }
          return parameters[name][object][parameter]
        }
        return parameters[name];
    }
    function set(name, object, parameter){
        return function(value){ 
            if (name == 'isTouch')
                if(value == 'Keyboard') return parameters[name] = false;
                else return parameters[name] = true;
            if (name == 'isQualtrics')
                if (value == 'Regular') return parameters[name] = false;
                else return parameters[name] = true;
            if(name.includes('Duration')) return parameters[name] = Math.abs(value)
            if(object && parameter) {
                if (parameter === 'font-size'){
                    value = Math.abs(value);
                    if (value === 0){ 
                        showRestrictions('Font\'s size must be bigger than 0.', 'error')
                        return parameters[name][object][parameter]; 
                    }
                    return parameters[name][object][parameter] = value + "em";
                }
                return parameters[name][object][parameter] = value
            }
            return parameters[name] = value; 
    }}
}

function view(ctrl, settings){
    return m('.container' , [
        ctrl.rows.slice(0,-1).map((row) => {
            if ((ctrl.qualtricsParameters.includes(row.name)) && ctrl.get('isQualtrics') === 'Regular') return;
            if(settings.parameters.isTouch && row.name.toLowerCase().includes('key')) return;
            
            return m('.row.space.line', [
                    m('.col-xs-1.space',[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', [row.desc])
                    ]),
                    m('.col-3.space', row.label),
                    row.name.toLowerCase().includes('key') ? //case of keys parameters
                        m('.col-8.space',
                            m('input[type=text].form-control',{style: {width:'3rem'}, value:ctrl.get(row.name), onchange:m.withAttr('value', ctrl.set(row.name))}))                    
                    : row.options ? //case of isTouch and isQualtrics
                        m('.col-8.space',
                            m('select.form-control',{value: ctrl.get(row.name), onchange:m.withAttr('value',ctrl.set(row.name)), style: {width: '8.3rem', height:'2.8rem'}},[
                                row.options.map(function(option){return m('option', option);})
                        ]))
                    : row.name.includes('Duration') ? //case of duration parameter
                        m('.col-8.space',
                            m('input[type=number].form-control',{min:0, style: {width:'5rem'}, value:ctrl.get(row.name), onchange:m.withAttr('value', ctrl.set(row.name))})) 
                    : (row.name === 'fixationStimulus') ||  (row.name === 'deadlineStimulus') ?
                        m('.col-8.space',[
                            m('.row',[
                                m('.col',[
                                    m('span', 'Font\'s color: '),
                                    m('input[type=color]', {style: {'border-radius':'3px', 'margin-left':'0.3rem'}, value: ctrl.get(row.name,'css','color'), onchange:m.withAttr('value', ctrl.set(row.name,'css','color'))})
                                ])
                            ]),m('br'),
                            m('.row',[
                                m('.col',[
                                    m('span', 'Font\'s size: '),
                                    m('input[type=number]', {style: {'border-radius':'4px','border':'1px solid #E2E3E2', 'margin-left':'0.3rem'}, value:ctrl.get(row.name,'css','font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set(row.name,'css','font-size'))})
                                ])
                            ]),m('br'),
                            m('.row',[
                                m('.col',[
                                    m('span', 'Text: '),
                                    m('input[type=text]', {style: {'border-radius':'3px','border':'1px solid #E2E3E2',height:'2.5rem',width:'15rem', 'margin-left':'0.3rem'}, value:ctrl.get(row.name,'media','word') ,onchange:m.withAttr('value', ctrl.set(row.name,'media','word'))})
                                ])
                            ])
                        ]) 
                    : m('.col-8.space',
                            m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set(row.name)), checked: ctrl.get(row.name)}))
                    ])
        }),
        m('.row.space.line', [
            m('.col-xs-1.space',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['If your task has any images, enter here the path to that images folder. It can be a full url, or a relative URL to the folder that will host this script'])
            ]),
            m('.col-3.space', 'Image\'s URL'),
            m('.col-8 param-buffer',
                m('input[type=text].form-control',{style: {width: '30rem'}, value:ctrl.get('base_url'), onchange:m.withAttr('value', ctrl.set('base_url'))}))
        ]),
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
    ])
}

export default parametersComponent;
