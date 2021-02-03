
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
            if (parameters[name] == true) return 'Qualtrics'
            else return 'Regular';
        return parameters[name];
    }
    function set(name){ return function(value){ 
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
    return m('.container', [
        m('table.w3-table w3-bordered',[
            m('tr.border_lines', [
                m('td'), //for space
                m('td'), //for space
                m('td',[
                    m('button.reset_button', {onclick: ctrl.reset},'Reset'),
                    m('button.reset_button',{onclick: ctrl.clear}, 'Clear'),
                ])
            ]),
            m('tr.lines', [
                m('td.td_info',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', [ctrl.rows[0].desc])
                ]),
                m('td.td_task', ctrl.rows[0].label),
                m('td', [
                    m('select',{onchange: m.withAttr('value', ctrl.set(ctrl.rows[0].name)), value: ctrl.get(ctrl.rows[0].name)},[
                    m('option', 'Keyboard'),
                    m('option', 'Touch')
                ])])
            ]),
            m('tr.lines', [
                m('td.td_info',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', [ctrl.rows[1].desc])
                ]),
                m('td.td_task', ctrl.rows[1].label),
                m('td', [
                    m('select',{onchange: m.withAttr('value', ctrl.set(ctrl.rows[1].name)), value: ctrl.get(ctrl.rows[1].name)},[
                    m('option', 'Regular'),
                    m('option', 'Qualtrics')
                ])])
            ]),
            ctrl.rows.slice(2,-1).map(function(row) {
                return m('tr.lines', [
                    m('td.td_info',[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', [row.desc])
                    ]),
                    m('td.td_task', row.label),
                    m('td',
                        m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set(row.name)), checked: ctrl.get(row.name)}))
                ])}
            ),
            m('tr.border_lines', [
                m('td.td_info',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header',{style:{width: '500px'}}, ['If your task has any images, enter here the path to that images folder. It can be a full url, or a relative URL to the folder that will host this script'])
                ]),
                m('td.td_task', 'Image\'s URL'),
                m('td',
                    m('input',{style: {width: '30rem'}, value:ctrl.get('base_url'), onchange:m.withAttr('value', ctrl.set('base_url'))}))
            ]),
        ])
    ]) 
};

export default parametersComponent;
