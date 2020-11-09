/**
 * @preserve minnojs-iat-dashboard v1.0.0
 * @license Apache-2.0 (2020)
 */

(function () {
    'use strict';

    var settings = {
        parameters : {isTouch:false, isQualtrics:false, fullScreen:false, debriefing:false, showErrors:true, correctErrors:true,base_url:''},
        category1: {
        },
        category2: {
        },
        blocks: {categoriesNumBlocks: 20,categoriesMiniBlocks:5, attributesNumBlocks:20,attributesMiniBlocks:5,
            firstCombinedBlockNumBlocks:20, firstCombinedBlockMiniBlocks:5, secondCombinedBlockNumBlocks:40, secondCombinedBlockMiniBlocks:10,
            switchBlockNumBlocks:28, switchBlockMiniBlocks:7, rndCategorySide: true, rndAttributeSide: false}
    };

    var parametersComponent = {
        controller:controller,
        view:view
    };

    var rows = [
        {name: 'isTouch', label:'Touch Device', desc:'Will the task run on touch devices?'},
        {name: 'isQualtrics', label:'Qualtrics', desc: 'Is this a Qualtrics version'},
        {name: 'fullScreen', label:'Enable Full Screen', desc: 'Do you want to enable a full screen option?'},
        {name: 'debriefing', label:'Show Debriefing', desc: 'Do you want to show debriefing at the end?'},
        {name: 'showErrors', label: 'Show an Error Message', desc: 'In the case of a mistake, do you want to display a message to the user?'},
        {name: 'correctErrors', label: 'Must correct wrong answers', desc: 'In the case of a mistake, the user cannot continue if he didn\'t coreect his answer'},
    ];

    function controller(settings$1){
        var parameters = settings$1.parameters;
        return {reset:reset, clear:clear, set:set, get:get};
        
        function reset(){ Object.assign(parameters, settings.parameters);}
        function clear(){ Object.assign(parameters, {isTouch:false, isQualtrics:false, fullScreen:false, debriefing:false, showErrors:false, correctErrors:false,base_url:''}); }
        function get(name){ return parameters[name]; }
        function set(name){ 
            return function(value){ return parameters[name] = value; }
        }
    }

    function view(ctrl){
        return m('.container', [
            m('table.w3-table w3-bordered',{id : 'table'}, [
                m('tr.border_lines', [
                    m('td'), //for space
                    m('td'), //for space
                    m('td',[
                        m('button.reset_button', {onclick: ctrl.reset},'Reset'),
                        m('button.reset_button',{onclick: ctrl.clear}, 'Clear'),
                    ])
                ]),
                rows.map(function(row) {
                    return m('tr.lines', [
                        m('td.td_info',[
                            m('i.fa.fa-info-circle'),
                            m('.card.info-box.card-header', [row.description])
                        ]),
                        m('td.td_task', row.label),
                        m('td', [
                            m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set(row.name)), checked: ctrl.get(row.name)})
                        ])
                    ])
                }
                ),
                m('tr.border_lines', [
                    m('td.td_info',[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', ['Please enter the directory url for the task\'s pictures'])
                    ]),
                    m('td.td_task', 'Image\'s URL'),
                    m('td' ,[
                        m('input',{style: {width: '30rem'}, value:ctrl.get('base_url'), onchange:m.withAttr('value', ctrl.set('base_url'))})
                    ])
                ]),
            ])
        ]) 
    }

    var outputComponent = {
        view: function(ctrl, settings){
            return m('div', [
                m('button.CreateFile', {onclick: createFile()}, 'Download script'),
                m('button.CreateFile', {onclick: toConsole(settings)}, 'Print to Console')
            ]);
        }
    };

    function createFile(settings){
        return function(){
            console.log('Creating file for download - not implemented yet');
        }
    }

    function toConsole(settings){
        return function(){
            window.settings = settings;
            console.log(settings);
        }
    }

    var blocksComponent = {
        controller:controller$1,
        view:view$1
    };

    var rows$1 = [
        {label:'Categories', numTrialBlocks:'categoriesNumBlocks', numMiniBlocks: 'categoriesMiniBlocks'},
        {label:'Attributes', numTrialBlocks:'attributesNumBlocks', numMiniBlocks: 'attributesMiniBlocks'},
        {label:'First Combined Block', numTrialBlocks:'firstCombinedBlockNumBlocks', numMiniBlocks: 'firstCombinedBlockMiniBlocks'},
        {label:'Second Combined Block', numTrialBlocks:'secondCombinedBlockNumBlocks', numMiniBlocks: 'secondCombinedBlockMiniBlocks'},
        {label:'Switch Block', numTrialBlocks:'switchBlockNumBlocks', numMiniBlocks: 'switchBlockMiniBlocks'}
    ];

    function controller$1(settings$1){
        var blocks = settings$1.blocks;
        return {reset:reset, clear:clear, set:set, get:get};
        
        function reset(){ Object.assign(blocks, settings.blocks);}
        function clear(){
             Object.assign(blocks, 
                {categoriesNumBlocks: 0,categoriesMiniBlocks:0, attributesNumBlocks:0,attributesMiniBlocks:0,
                    firstCombinedBlockNumBlocks:0, firstCombinedBlockMiniBlocks:0, secondCombinedBlockNumBlocks:0, secondCombinedBlockMiniBlocks:0,
                    switchBlockNumBlocks:0, switchBlockMiniBlocks:0, rndCategorySide: false, rndAttributeSide: false}
            ); }
        function get(name){ return blocks[name]; }
        function set(name, type){ 
            if (type == 'checkbox') 
                return function(value){ return blocks[name] = value; }
            else {
                return function(value){ return blocks[name] = Math.round(value);}
            }
        }
    }

    function view$1(ctrl){
        return m('.container' , [
            m('table.w3-table w3-bordered', [
                m('tr.border_lines', [
                    m('td'), //for space
                    m('td',[
                        m('button.reset_button', {onclick: ctrl.reset},'Reset'),
                        m('button.reset_button',{onclick: ctrl.clear}, 'Clear'),
                    ])
                ]),
                rows$1.map(function(row) {
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
                        m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set('rndCategorySide','checkbox')), checked: ctrl.get('rndCategorySide')})
                    ])
                ]),
                m('tr.border_lines', [
                    m('td', 'Randomize first attribute side: ',{style: {padding: "1.5em 5em 1.5em 0"}}),
                    m('td.block_cell_checkbox' ,[
                        m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set('rndAttributeSide', 'checkbox')), checked: ctrl.get('rndAttributeSide')})
                    ])
                ])
            ])
        ],
        m('.card card-body', {style: {position: 'absolute', width: '20rem', left: '780px',top: '200px'}}, [
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
    }

    var components = {
        parameters: parametersComponent,
        categories: { view: function(){ return m('div', 'Categories component'); } },
    	output: outputComponent,
    	blocks: blocksComponent
    };

    var tabs = [
    	{value: 'parameters', text: 'Task parameters'},
    	{value: 'blocks', text: 'Block parameters'},
    	{value: 'categories', text: 'Categories'},
    	{value: 'output', text: 'Output'}
    ];

    var tabsComponent = {
        controller: function(){
            // set default tab
            return { tab: 'output' }
        },
    	view: function(ctrl, settings){
    		return m('.container', [
    			m('.tab', tabs.map(function(tab){
    				return m('button.tablinks', {
                        class: ctrl.tab == tab.value ? 'active' : '',
                        onclick:function(){ctrl.tab = tab.value;}
                    },tab.text);
    			})),
    			m('.tabContent', [
    				m.component(components[ctrl.tab], settings)
    			])
    		]);
    	}
    };

    var Main = {
        controller: function(settings$1){
            return {settings: settings$1 ? settings$1 : clone(settings)}
        },
        view: function(ctrl){
            return m('.container', [
                m('header.bg-success.text-white.p-4.mb-3', [
                    m('h1', 'Creating an IAT test')
                ]),
                m.component(tabsComponent, ctrl.settings)
            ]);
        }
    };

    // WARNING!! this does not clone functions, regex, Dates or anything complex!!
    // If you need any of that good stuff, you need a more complex function
    function clone(obj){
        return JSON.parse(JSON.stringify(obj));
    }

    //m.mount(document.documentElement, Main);
    m.mount(document.getElementById('dashboard'), Main);

}());
//# sourceMappingURL=index.js.map
