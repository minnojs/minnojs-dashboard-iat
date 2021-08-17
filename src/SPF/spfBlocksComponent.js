
let blocksComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    let blocks = settings.blocks;
    return {reset:reset, clear:clear, set:set, get:get, rows: rows};
    
    function reset(){Object.assign(blocks, defaultSettings.blocks);}
    function clear(){Object.assign(blocks, rows.slice(-1)[0]);}
    function get(name){return blocks[name]; }
    function set(name, type){ 
        if (type === 'number') return function(value){ return blocks[name] = Math.abs(Math.round(value));};
        return function(value){ return blocks[name] = value; };
    }
}
function view(ctrl, settings){
    return m('.container' , [
        //create numbers inputs
        ctrl.rows.slice(0,2).map(function(row) {
            return m('.row top-buffer', [
                m('.col-auto info-buffer',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', [row.desc])
                ]),
                m('.col-3 param-buffer', row.label),
                m('.col-8 param-buffer',
                    m('input[type=number].form-control',{style:{width:'4em'},onchange: m.withAttr('value', ctrl.set(row.name, 'number')), value: ctrl.get(row.name), min:0}))
            ]);
        }),
        //create select inputs
        ctrl.rows.slice(2,-1).map(function(row) {
            return m('.row top-buffer', [
                m('.col-auto info-buffer',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', [row.desc])
                ]),
                m('.col-3 param-buffer', row.label),
                m('.col-8 param-buffer',
                    m('select.form-control',{value: ctrl.get(row.name), onchange:m.withAttr('value',ctrl.set(row.name)), style: {width: '8.3rem'}},[
                        row.options.map(function(option){return m('option', option);})
                    ]))
            ]);
        }),
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

export default blocksComponent;
