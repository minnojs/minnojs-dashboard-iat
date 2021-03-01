
var blocksComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    var blocks = settings.blocks;
    return {reset:reset, clear:clear, set:set, get:get, rows: rows};
    
    function reset(){Object.assign(blocks, defaultSettings.blocks);}
    function clear(){Object.assign(blocks, rows.slice(-1)[0]);}
    function get(name){ return blocks[name]; }
    function set(name, type){ 
        if (type == 'checkbox') return function(value){return blocks[name] = value; }
        return function(value){return blocks[name] = Math.round(value);}
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
            ctrl.rows.slice(0,-1).map(function(row) {
                return m('.row top-buffer', [
                    m('.col-auto block-buffer',[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', [row.desc])
                    ]),
                    m('.col-3 block-buffer', row.label),
                    m('.col-8',[
                        m('.row', [
                        m('.col-4 block-buffer', 'Number of trials: '),
                        m('.col block-buffer', [
                            m('input[type=number].form-control',{style:{width:'4em'},onchange: m.withAttr("value", ctrl.set(row.numTrialBlocks, 'number')), value: ctrl.get(row.numTrialBlocks)})
                        ])
                        ]),
                        m('.row',[
                            m('.col-4 block-buffer', "Number of mini-blocks: "), 
                            m('.col block-buffer', [
                                m('input[type=number].form-control',{style:{width:'4em'},onchange: m.withAttr("value", ctrl.set(row.numMiniBlocks, 'number')), value: ctrl.get(row.numMiniBlocks)})
                            ])
                        ])
                        ])
                    ])
                    
                }
            ),
            m('.row top-buffer', [
                m('.col-auto block-buffer',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', ['If not randomized: the First Category (in the Categories page) will appear on the left in Blocks 1,3, and 4.'])
                ]),
                m('.col-sm-3 block-buffer','Randomly choose categories location in Block 1: '),
                m('.col block-buffer',m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set('randomBlockOrder','checkbox')), checked: ctrl.get('randomBlockOrder')})),
            ]),
                m('.row top-buffer', [
                m('.col-auto block-buffer',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', ['If not randomized: the First Category (in the Attributes page) will appear on the left.'])
                ]),
                m('.col-sm-3 block-buffer', 'Randomly choose attributes location in the task: ',{style: {padding: "1.5em 5em 1.5em 0"}}),
                m('.col block-buffer' ,
                    m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set('randomAttSide', 'checkbox')), checked: ctrl.get('randomAttSide')}))
            ]),
            m('.row top-buffer'),
            m('.alert alert-info', {role:'alert', style: {position: 'absolute', width: '25rem', left: '59%',top: '50%',  border: '2px solid #bcdae2'}},[
                m('h4','More information:'),
                m('p','By default, we separate each block into mini-blocks of four trials. In Blocks 3, 4, 6, and 7, '+
                                'exactly one item from each of the four groups (attributes and categories) appears in each mini-block. In Blocks 1, 2, and 5, '+
                                'two trials of each group (category or attribute) will appear in each mini-block. Tony Greenwald recommended using that feature, '+
                                'to avoid same-key runs, based on internal testing in his lab. In Project Implicit, our tests so far found no effect of this feature on the validity of any IAT.'+
                                ' To cancel this feature, set Number of mini-blocks to 1, in each block.'),
                m('hr'),
                m('p','To cancel a block, set the number of trials to 0 (useful for 5-blocks IATs).')
            ])

    ])
};


export default blocksComponent;

