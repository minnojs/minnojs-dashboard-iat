
let textComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    //let textparameters = settings.text
    var textparameters;
    var isTouch = settings.parameters.isTouch;
    isTouch ? textparameters = settings.touch_text : textparameters = settings.text;
    return {reset:reset, clear:clear, set:set, get:get, rows: rows.slice(0,-1)};
    
    function reset(){isTouch ? Object.assign(textparameters, defaultSettings.touch_text) : Object.assign(textparameters, defaultSettings.text)}
    function clear(){ Object.assign(textparameters, rows.slice(-1)[0]); }
    function get(name){ return textparameters[name]; }
    function set(name){ 
        return function(value){return textparameters[name] = value;};
    }
}

function view(ctrl){
    return m('.container' , [
        m('.row top-buffer',[
            m('.col',{style:{'margin-bottom':'7px'}},[
                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
                    m('button.btn btn btn-danger', {onclick: ctrl.reset},[
                        m('i.fas fa-undo fa-sm'), ' Reset'
                    ]),
                    m('button.btn btn btn-danger',{onclick: ctrl.clear},[
                        m('i.far fa-trash-alt fa-sm'), ' Clear'
                    ])
                ])
            ])
        ]),
        ctrl.rows.map(function(row) {
            return m('.row top-buffer', [
                m('.col-auto info-buffer',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', {style:{width: '510px'}},[row.desc])
                ]),
                m('.col-3 param-buffer', {style:{width: '30%'}},row.label),
                m('.col-8 param-buffer', [
                    m('textarea.form-control',{style: {width: '30rem' ,height: '5.5rem'}, value:ctrl.get(row.name), onchange:m.withAttr('value', ctrl.set(row.name))})
                ])
            ]);
        }),
    ]);
}

export default textComponent;
