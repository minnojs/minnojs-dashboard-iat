
let textComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    var textparameters;
    var isTouch = settings.parameters.isTouch;
    isTouch ? textparameters = settings.touch_text : textparameters = settings.text;
    return {reset:reset, clear:clear, set:set, get:get, rows: rows.slice(0,-2), isTouch};
    
    function reset(){isTouch ? Object.assign(textparameters, defaultSettings.touch_text) : Object.assign(textparameters, defaultSettings.text)}
    function clear(){isTouch ? Object.assign(textparameters, rows.slice(-1)[0]) : Object.assign(textparameters, rows.slice(-2)[0]);}
    function get(name){return textparameters[name];}
    function set(name){ 
        return function(value){return textparameters[name] = value;};
    }
}

function view(ctrl, settings){
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
            //if touch parameter is choosen, don't show the irrelevant text parametes
            if (settings.parameters.isTouch === true && row.nameTouch === undefined) {
                return null;
            }
            return m('.row top-buffer', [
                m('.col-auto info-buffer',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', {style:{width: '510px'}},[row.desc])
                ]),
                m('.col-3 param-buffer', {style:{width: '30%'}},row.label),
                m('.col-8 param-buffer', [
                    m('textarea.form-control',{style: {width: '30rem' ,height: '5.5rem'}, value:ctrl.get(ctrl.isTouch ? row.nameTouch : row.name), onchange:m.withAttr('value', ctrl.set(ctrl.isTouch ? row.nameTouch : row.name))})
                ])
            ]);
        }),
    ]);
}

export default textComponent;
