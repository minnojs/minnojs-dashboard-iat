
var textComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    var isTouch = settings.parameters.isTouch;
    var textparameters;
    isTouch ? textparameters = settings.touch_text : textparameters = settings.text;
    return {reset:reset, clear:clear, set:set, get:get, rows: rows.slice(0,-1)};
    
    function reset(){isTouch ? Object.assign(textparameters, defaultSettings.touch_text) : Object.assign(textparameters, defaultSettings.text)}
    function clear(){ Object.assign(textparameters, rows.slice(-1)[0]); }
    function get(name){ return textparameters[name]; }
    function set(name){ 
        return function(value){ return textparameters[name] = value; }
    }
}

function view(ctrl){
    return m('.container', [
        m('table.w3-table w3-bordered',{id : 'table'}, [
            m('tr.border_lines', [
                m('td'), m('td'), //for space
                m('td',[
                    m('button.reset_button', {onclick: ctrl.reset},'Reset'),
                    m('button.reset_button',{onclick: ctrl.clear}, 'Clear'),
                ])
        ]),
            ctrl.rows.map(function(row) {
                return m('tr.lines', [
                    m('td.td_info',[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', {style:{width: '510px'}},[row.desc])
                    ]),
                    m('td.td_task', {style:{width: '30%'}},row.label),
                    m('td', [
                        m('textarea',{style: {width: '30rem' ,height: '4rem'}, value:ctrl.get(row.name), onchange:m.withAttr('value', ctrl.set(row.name))})
                    ])
                ])
            }
            ),
    
        ])
    ]) 
};

export default textComponent;
