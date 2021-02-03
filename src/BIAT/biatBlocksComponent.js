
var blocksComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
    var blocks = settings.blocks;
    return {reset:reset, clear:clear, set:set, get:get, rows: rows};
    
    function reset(){Object.assign(blocks, defaultSettings.blocks);}
    function clear(){Object.assign(blocks, rows.slice(-1)[0]);}
    function get(name){return blocks[name]; }
    function set(name, type){ 
        if (type == 'number') return function(value){ return blocks[name] = Math.round(value);}
        return function(value){ return blocks[name] = value; }
    }
}
function view(ctrl, settings){
    return m('.container' , [
        m('table.w3-table w3-bordered', [
            m('tr.border_lines', [
                m('td'), m('td'), //for space
                m('td',[
                    m('button.reset_button', {onclick: ctrl.reset},'Reset'),
                    m('button.reset_button',{onclick: ctrl.clear}, 'Clear'),
                ])
            ]),
            //create numbers inputs
            ctrl.rows.slice(0,4).map(function(row) {
                //if user chooses not to have a prcatice block set it's parameter to 0
                if (row.name == 'nPracticeBlockTrials' && settings.parameters.practiceBlock == false) {
                    settings.blocks.nPracticeBlockTrials = '0';
                    return null;
                }
                return m('tr.lines', [
                    m('td.td_info',[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', [row.desc])
                    ]),
                    m('td.td_task', row.label),
                    m('td.block_cell_checkbox',
                        m('input[type=number]',{onchange: m.withAttr("value", ctrl.set(row.name, 'number')), value: ctrl.get(row.name)}))
                ])
            }),
            //create select inputs
            ctrl.rows.slice(4,-1).map(function(row) {
                return m('tr.lines', [
                    m('td.td_info',[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', [row.desc])
                    ]),
                    m('td.td_task', row.label),
                    m('td.block_cell_checkbox', 
                    m('select',{value: ctrl.get(row.name), onchange:m.withAttr('value',ctrl.set(row.name)), style: {width: '7rem'}},[
                        row.options.map(function(option){return m('option', option);})
                    ]))
                ])
            })
        ])
    ])
};

export default blocksComponent;
