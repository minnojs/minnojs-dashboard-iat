
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
        if (type === 'number') return function(value){ return blocks[name] = Math.round(value);};
        return function(value){ return blocks[name] = value; };
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
        //create numbers inputs
        ctrl.rows.slice(0,4).map(function(row) {
        //if user chooses not to have a prcatice block set it's parameter to 0
            if (row.name === 'nPracticeBlockTrials' && settings.parameters.practiceBlock === false) {
                settings.blocks.nPracticeBlockTrials = '0';
                return null;
            }
            return m('.row top-buffer', [
                m('.col-auto info-buffer',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', [row.desc])
                ]),
                m('.col-3 param-buffer', row.label),
                m('.col-8 param-buffer',
                    m('input[type=number].form-control',{style:{width:'4em'},onchange: m.withAttr('value', ctrl.set(row.name, 'number')), value: ctrl.get(row.name)}))
            ]);
        }),
        //create select inputs
        ctrl.rows.slice(4,-1).map(function(row) {
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
        })
    ]);
}

export default blocksComponent;
