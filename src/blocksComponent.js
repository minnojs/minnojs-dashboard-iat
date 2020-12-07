import defaultSettings from './defaultSettings';

var blocksComponent = {
    controller:controller,
    view:view
};

var rows = [
    {label:'Categories', numTrialBlocks:'blockCategories_nTrials', numMiniBlocks: 'blockCategories_nMiniBlocks'},
    {label:'Attributes', numTrialBlocks:'blockAttributes_nTrials', numMiniBlocks: 'blockAttributes_nMiniBlocks'},
    {label:'First Combined Block', numTrialBlocks:'blockFirstCombined_nTrials', numMiniBlocks: 'blockFirstCombined_nMiniBlocks'},
    {label:'Second Combined Block', numTrialBlocks:'blockSecondCombined_nTrials', numMiniBlocks: 'blockSecondCombined_nMiniBlocks'},
    {label:'Switch Block', numTrialBlocks:'blockSwitch_nTrials', numMiniBlocks: 'blockSwitch_nMiniBlocks'}
];

function controller(settings){
    var blocks = settings.blocks;
    return {reset:reset, clear:clear, set:set, get:get};
    
    function reset(){Object.assign(blocks, defaultSettings.blocks);}
    function clear(){
         Object.assign(blocks, 
            {blockCategories_nTrials: 0,blockCategories_nMiniBlocks:0, blockAttributes_nTrials:0,blockAttributes_nMiniBlocks:0,
                blockFirstCombined_nTrials:0, blockFirstCombined_nMiniBlocks:0, blockSecondCombined_nTrials:0, blockSecondCombined_nMiniBlocks:0,
                blockSwitch_nTrials:0, blockSwitch_nMiniBlocks:0, randomBlockOrder: false, randomAttSide : false
            },
        );}
    function get(name){ return blocks[name]; }
    function set(name, type){ 
        if (type == 'checkbox') 
            return function(value){ return blocks[name] = value; }
        else {
            return function(value){ return blocks[name] = Math.round(value);}
        }
    }
}
function view(ctrl){
    return m('.container' , [
        m('table.w3-table w3-bordered', [
            m('tr.border_lines', [
                m('td'), //for space
                m('td',[
                    m('button.reset_button', {onclick: ctrl.reset},'Reset'),
                    m('button.reset_button',{onclick: ctrl.clear}, 'Clear'),
                ])
            ]),
            rows.map(function(row) {
                return m('tr.lines', [
                    m('td', row.label),
                    m('td.block_cell_label',
                     [m('table.w3-table w3-bordered', [
                        m('tr',[
                        m('td.block_cell_input', 'No. of trials in block: '),
                        m('td', [
                            m('input[type=number]',{onchange: m.withAttr("value", ctrl.set(row.numTrialBlocks, 'number')), value: ctrl.get(row.numTrialBlocks)})
                        ])
                        ]),
                            m('tr',[
                                m('td.block_cell_input', "No. of MiniBlock: "), 
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
                m('td', 'Randomize first category side: '),
                m('td.block_cell_checkbox' ,[
                    m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set('randomBlockOrder','checkbox')), checked: ctrl.get('randomBlockOrder')})
                ])
            ]),
            m('tr.border_lines', [
                m('td', 'Randomize first attribute side: ',{style: {padding: "1.5em 5em 1.5em 0"}}),
                m('td.block_cell_checkbox' ,[
                    m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set('randomAttSide', 'checkbox')), checked: ctrl.get('randomAttSide')})
                ])
            ])
        ])
    ],
    m('.card card-body', {style: {position: 'absolute', width: '20rem', left: '62%',top: '35%'}}, [
        m('table.w3-table w3-bordered',[
            m('tr.border_lines', [
                m('td.block_cell_info','Please Notice:')
            ]),
            m('tr.lines', [
                m('td.block_cell_info','1. In each block we can include a number of mini blocks, to reduce repetition of same groups/response')
            ]),
            m('tr.lines', [
                m('td.block_cell_info','2. If you set the number of trials in any block to 0, that block will be skipped')
            ]),
            m('tr', [
                m('td.block_cell_info','3. Explanation about trials and miniBlocks')
            ]),
        ])
    ])
    )
};

export default blocksComponent;

//{style: {position: 'absolute', width: '20rem', left: '780px',top: '200px'}}