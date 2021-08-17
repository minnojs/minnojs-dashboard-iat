
var parametersComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    var parameters = settings.parameters;
    return {reset:reset, clear:clear, set:set, get:get, rows: rows};
    
    function reset(){Object.assign(parameters, defaultSettings.parameters)}
    function clear(){Object.assign(parameters, rows.slice(-1)[0])};
    function get(name){
        if (name == 'isTouch')
            if(parameters[name] == true) return 'Touch' 
            else return 'Keyboard';
        if (name == 'isQualtrics')
            if (parameters[name] == true){return 'Qualtrics'}
            else return 'Regular';
        return parameters[name];
    }
    function set(name){return function(value){ 
        if (name == 'isTouch')
            if(value == 'Keyboard') return parameters[name] = false;
            else return parameters[name] = true;
        if (name == 'isQualtrics')
            if (value == 'Regular') return parameters[name] = false;
            else return parameters[name] = true;
        return parameters[name] = value; 
    }}
}

function view(ctrl){
    return m('.container' , [
        ctrl.rows.slice(0,-1).map((row) => {
            if ((row.name === 'fullscreen' || row.name === 'showDebriefing') && ctrl.get('isQualtrics') === 'Regular') {
                return null;
            }
            return m('.row top-buffer', [
                    m('.col-auto info-buffer',[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', [row.desc])
                    ]),
                    m('.col-3 param-buffer', row.label),
                    row.name.includes('key') ? //case of keys parameters
                    m('.col-8 param-buffer',
                    m('input[type=text].form-control',{style: {width:'3rem'}, value:ctrl.get(row.name), onchange:m.withAttr('value', ctrl.set(row.name))}))                    
                    : row.options ? //case of isTouch and isQualtrics
                    m('.col-8 param-buffer',
                    m('select.form-control',{value: ctrl.get(row.name), onchange:m.withAttr('value',ctrl.set(row.name)), style: {width: '8.3rem', height:'2.8rem'}},[
                    row.options.map(function(option){return m('option', option);})
                    ]))
                    :
                    m('.col-8 param-buffer',
                    m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set(row.name)), checked: ctrl.get(row.name)}))
                    ])
        }),
        m('.row top-buffer', [
            m('.col-auto info-buffer',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['If your task has any images, enter here the path to that images folder. It can be a full url, or a relative URL to the folder that will host this script'])
            ]),
            m('.col-3 param-buffer', 'Image\'s URL'),
            m('.col-8 param-buffer',
                m('input[type=text].form-control',{style: {width: '30rem'}, value:ctrl.get('base_url'), onchange:m.withAttr('value', ctrl.set('base_url'))}))
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
    ])
}

export default parametersComponent;
