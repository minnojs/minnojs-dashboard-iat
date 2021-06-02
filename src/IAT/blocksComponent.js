
let blocksComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    let blocks = settings.blocks;
    return {reset:reset, clear:clear, set:set, get:get, rows: rows};
    
    function reset(){Object.assign(blocks, defaultSettings.blocks);}
    function clear(){Object.assign(blocks, rows.slice(-1)[0]);}
    function get(name){ return blocks[name]; }
    function set(name, type){ 
        if (type === 'checkbox') return function(value){return blocks[name] = value; };
        return function(value){return blocks[name] = Math.round(value);};
    }
}

function view(ctrl){
    return m('.container' ,{style:{height: '500px'}}, [
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
        ctrl.rows.slice(0,-1).map(function(row) {
            return m('.row top-buffer', [
                m('.col-auto block-buffer',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', [row.desc])
                ]),
                m('.col-3 block-buffer', row.label),
                row.name ? //case of randomBlockOrder & randomAttSide
                m('.col block-buffer' ,
                m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set(row.name, 'checkbox')), checked: ctrl.get(row.name)}))
                :
                m('.col-8',[
                    m('.row', [
                        m('.col-4 block-buffer', 'Number of trials: '),
                        m('.col block-buffer', [
                            m('input[type=number].form-control',{style:{width:'4em'},onchange: m.withAttr('value', ctrl.set(row.numTrialBlocks, 'number')), value: ctrl.get(row.numTrialBlocks)})
                        ])
                    ]),
                    m('.row',[
                        m('.col-4 block-buffer', 'Number of mini-blocks: '),
                        m('.col block-buffer', [
                            m('input[type=number].form-control',{style:{width:'4em'},onchange: m.withAttr('value', ctrl.set(row.numMiniBlocks, 'number')), value: ctrl.get(row.numMiniBlocks)})
                        ])
                    ])
                ])
            ]);
                    
        }
        ),
        m('.alert alert-info', {role:'alert', style: {position: 'relative', width: '25rem', left: '62%',top: '-650px',  border: '2px solid #bcdae2'}},[
            m('h4','More information:'),
            m('p','By default, we separate each block into mini-blocks of four trials. In Blocks 3, 4, 6, and 7, '+
                                'exactly one item from each of the four groups (attributes and categories) appears in each mini-block. In Blocks 1, 2, and 5, '+
                                'two trials of each group (category or attribute) will appear in each mini-block. Tony Greenwald recommended using that feature, '+
                                'to avoid same-key runs, based on internal testing in his lab. In Project Implicit, our tests so far found no effect of this feature on the validity of any IAT.'+
                                ' To cancel this feature, set Number of mini-blocks to 1, in each block.'),
            m('hr'),
            m('p','To cancel a block, set the number of trials to 0 (useful for 5-blocks IATs).')
        ])

    ]);
}


export default blocksComponent;

