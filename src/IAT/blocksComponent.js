
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
        m('table.w3-table w3-bordered', [
            m('tr.border_lines', [
                m('td'), //for space
                m('td'), //for space
                m('td',[
                    m('button.reset_button', {onclick: ctrl.reset},'Reset'),
                    m('button.reset_button',{onclick: ctrl.clear}, 'Clear'),
                ])
            ]),
            ctrl.rows.slice(0,-1).map(function(row) {
                return m('tr.lines', [
                    m('td.td_info',[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', [row.desc])
                    ]),
                    m('td.block_cell', row.label),
                    m('td',[
                        m('table.w3-table w3-bordered', [
                        m('tr',[
                        m('td', 'Number of trials: '),
                        m('td', [
                            m('input[type=number]',{onchange: m.withAttr("value", ctrl.set(row.numTrialBlocks, 'number')), value: ctrl.get(row.numTrialBlocks)})
                        ])
                        ]),
                            m('tr',[
                                m('td', "Number of mini-blocks: "), 
                                m('td', [
                                    m('input[type=number]',{onchange: m.withAttr("value", ctrl.set(row.numMiniBlocks, 'number')), value: ctrl.get(row.numMiniBlocks)})
                                ])
                               ])
                        ])
                    ])
                    ])
                }
            ),
            m('tr.lines', [
                m('td.td_info',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', ['If not randomized: the First Category (in the Categories page) will appear on the left in Blocks 1,3, and 4.'])
                ]),
                m('td.block_cell', 'Randomly choose categories location in Block 1: '),
                m('td.block_cell_checkbox' ,
                    m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set('randomBlockOrder','checkbox')), checked: ctrl.get('randomBlockOrder')}))
            ]),
            m('tr.border_lines', [
                m('td.td_info',[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', ['If not randomized: the First Category (in the Attributes page) will appear on the left.'])
                ]),
                m('td.block_cell', 'Randomly choose attributes location in the task: ',{style: {padding: "1.5em 5em 1.5em 0"}}),
                m('td.block_cell_checkbox' ,
                    m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set('randomAttSide', 'checkbox')), checked: ctrl.get('randomAttSide')}))
            ])
        ])
    ],
    m('.card card-body', {style: {position: 'absolute', width: '25rem', left: '59%',top: '42%', 'border-radius': '25px', border: '2px solid #73AD21'}}, [
        m('table.w3-table w3-bordered',[
            m('tr.border_lines', 
                m('td.block_cell_info','More information:')),
            m('tr.lines', [
                m('td.block_cell_info','By default, we separate each block into mini-blocks of four trials. In Blocks 3, 4, 6, and 7, '+
                'exactly one item from each of the four groups (attributes and categories) appears in each mini-block. In Blocks 1, 2, and 5, '+
                'two trials of each group (category or attribute) will appear in each mini-block. Tony Greenwald recommended using that feature, '+
                'to avoid same-key runs, based on internal testing in his lab. In Project Implicit, our tests so far found no effect of this feature on the validity of any IAT.'+
                ' To cancel this feature, set Number of mini-blocks to 1, in each block.')
            ]),
            m('tr.lines',
                m('td.block_cell_info','To cancel a block, set the number of trials to 0 (useful for 5-blocks IATS).'))
        ])
    ])
    )
};

export default blocksComponent;

