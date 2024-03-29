
import {showRestrictions} from '../resources/utilities.js';

var parametersComponent = {
    controller:controller,
    view:view
};

function controller(settings){
    var primeCss = settings.primeStimulusCSS;
    return {set, get};
        
    function get(parameter){
        if (parameter === 'font-size') return parseFloat((primeCss[parameter]).substring(0,3));
        return primeCss[parameter]
    }
    function set(parameter){
        return function(value){ 
            if (parameter == 'font-size'){
                value = Math.abs(value);
                if (value == 0){ 
                    showRestrictions('Font\'s size must be bigger than 0.', 'error')
                    return primeCss[parameter]; 
                }
                return primeCss[parameter] = value + "em";
            }
            return primeCss[parameter] = value;    
        }
    }
}

function view(ctrl){
    return m('.container' , [
        m('.row',[
            m('.col.space',[
                m('.row.space.line',[
                    m('.col',[
                        m('span', 'Font\'s color: '),
                        m('input[type=color]', {style: {'border-radius':'3px', 'margin-left':'0.3rem'}, value: ctrl.get('color'), onchange:m.withAttr('value', ctrl.set('color'))})
                    ])
                ]),m('br'),
                m('.row.space.line',[
                    m('.col',[
                        m('span', 'Font\'s size: '),
                        m('input[type=number]', {style: {'border-radius':'4px','border':'1px solid #E2E3E2', 'margin-left':'0.3rem'}, value:ctrl.get('font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set('font-size'))})
                    ])
                ])
        ])
    ])
])  
}

export default parametersComponent;
