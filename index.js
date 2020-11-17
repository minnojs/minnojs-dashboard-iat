/**
 * @preserve minnojs-iat-dashboard v1.0.0
 * @license Apache-2.0 (2020)
 */

(function () {
    'use strict';

    var settings = {
        parameters : {isTouch:false, isQualtrics:false, fullScreen:false, showDebriefing:false, remindError :true, errorCorrection :true,base_url:''},
        category1: {
        },
        category2: {
        },
        attribute1:{},
        attribute2:{},
        blockParameters:{},
        text: {
                textOnError:'<p align="center" style="font-size:0.6em"; font-family:arial">' +'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. '+'Press the other key to continue.<p/>',
                leftKeyText:'Press "E" for ',
                rightKeyText:"or",
                orKeyText:'Press "I" for',
                finalText:'Press space to continue to the next task',
                AttributesBlockInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">' +'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +'Put a left finger on the <b>E</b> key for items that belong to the category <font color="#0000ff">leftAttribute.</font>' +'<br/>Put a right finger on the <b>I</b> key for items that belong to the category <font color="#0000ff">rightAttribute</font>.<br/><br/>' +'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +'Press the other key to continue.<br/>' +'<u>Go as fast as you can</u> while being accurate.<br/><br/></p>'+'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
                CategoriesBlockInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">' +'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +'Put a left finger on the <b>E</b> key for items that belong to the category <font color="#336600">leftCategory</font>. ' +'<br/>Put a right finger on the <b>I</b> key for items that belong to the category <font color="#336600">rightCategory</font>.<br/>' +'Items will appear one at a time.<br/><br/>' +'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +'Press the other key to continue.<br/>' +'<u>Go as fast as you can</u> while being accurate.<br/><br/></p>'+'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
                FirstCombinedBlockInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">' +'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +'Use the <b>E</b> key for <font color="#336600">leftCategory</font> and for <font color="#0000ff">leftAttribute</font>.<br/>' +'Use the <b>I</b> key for <font color="#336600">rightCategory</font> and for  <font color="#0000ff">rightAttribute</font>.<br/>' +'Each item belongs to only one category.<br/><br/>' +'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +'Press the other key to continue.<br/>' + '<u>Go as fast as you can</u> while being accurate.<br/><br/></p>' +'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
                SecondCombinedBlockInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">' +'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +'This is the same as the previous part.<br/>' +'Use the <b>E</b> key for <font color="#336600">leftCategory</font> and for <font color="#0000ff">leftAttribute</font>.<br/>' +'Use the <b>I</b> key for <font color="#336600">rightCategory</font> and for  <font color="#0000ff">rightAttribute</font>.<br/>' +'Each item belongs to only one category.<br/><br/>' +'<u>Go as fast as you can</u> while being accurate.<br/><br/></p>' +'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
                SwitchedCategoriesInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">'+'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +'<b>Watch out, the labels have changed position!</b><br/>' +'Put the left finger on the <b>E</b> key for <font color="#336600">leftCategory</font>.<br/>' +'Put the right finger on the <b>I</b> key for <font color="#336600">rightCategory</font>.<br/><br/>' +'<u>Go as fast as you can</u> while being accurate.<br/><br/></p>' +'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
                PreDebriefingText:'Press space to continue to your feedback '
        
        }
    };

    var parametersComponent = {
        controller:controller,
        view:view
    };

    var rows = [
        {name: 'isTouch', label:'Touch Device', desc:'Will the task run on touch devices?'},
        {name: 'isQualtrics', label:'Qualtrics', desc: 'Is this a Qualtrics version'},
        {name: 'fullScreen', label:'Enable Full Screen', desc: 'Do you want to enable a full screen option?'},
        {name: 'showDebriefing', label:'Show Debriefing', desc: 'Do you want to show debriefing at the end?'},
        {name: 'remindError ', label: 'Show an Error Message', desc: 'In the case of a mistake, do you want to display a message to the user?'},
        {name: 'errorCorrection ', label: 'Must correct wrong answers', desc: 'In the case of a mistake, the user cannot continue if he didn\'t coreect his answer'},
    ];


    function controller(settings$1){
        var parameters = settings$1.parameters;
        return {reset:reset, clear:clear, set:set, get:get};
        
        function reset(){ Object.assign(parameters, settings.parameters);}
        function clear(){ Object.assign(parameters, {isTouch:false, isQualtrics:false, fullScreen:false, showDebriefing:false, remindError :false, errorCorrection :false,base_url:''}); }
        function get(name){ return parameters[name]; }
        function set(name){ return function(value){ return parameters[name] = value; }}
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
                            m('.card.info-box.card-header', [row.desc])
                        ]),
                        m('td.td_task', row.label),
                        m('td', [
                            m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set(row.name)), checked: ctrl.get(row.name)})
                        ])
                    ])
                }
                ),
                m('tr.lines', [
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
        //controler:controler,
        view:view$1
    };

    function view$1(ctrl,settings){
        return m('div', [
            m('button.CreateFile', {onclick: createFile(settings)}, 'Download script'),
            m('button.CreateFile', {onclick: toConsole(settings)}, 'Print to Console'),
            m('button.CreateFile', {onclick: toConsole2(settings)}, 'Print to Console-newSetting')
        ]);
    }


    function createFile(settings){
        return function(){
            var output = toString(settings);
            var textFileAsBlob = new Blob([output], {type:'text/plain'});
            var downloadLink = document.createElement("a");
            downloadLink.download = "newIAT.txt";
            if (window.webkitURL != null) {downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);}
            else {
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick = destroyClickedElement;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
                }
            downloadLink.click();
            }
        }


    function toConsole(settings){
        return function(){
            window.settings = settings;
            console.log(settings);
        }
    }

    function toConsole2(settings){
        return function(){
            var output=toString(settings);
            window.output = output;
            console.log(output);
        }
    }

    function toString(settings){
        return toScript(updateSettings(settings));
    }

    function updateSettings(settings){
        var output={
            category1: settings.category1,
            category2: settings.category2,
            attribute1: settings.attribute1,
            attribute2: settings.attribute2,
            base_url: settings.parameters.base_url,
            remindError: settings.parameters.remindError,
            errorCorrection: settings.parameters.errorCorrection
        };
        if(settings.parameters.isQualtrics){
            output.isQualtrics=settings.parameters.isQualtrics,
            output.showDebriefing=settings.parameters.showDebriefing,
            output.fullscreen=settings.parameters.fullscreen,
            output.isTouch=settings.parameters.isTouch;
        }
        Object.assign(output, settings.blockParameters);
        Object.assign(output, settings.text);
        return output;
    }

    function toScript(output){
        return `define(['pipAPI',${output.isQualtrics ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/qualtrics/quiat9.js': 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat8.js'}], function(APIConstructor, iatExtension)var API = new APIConstructor(); return iatExtension({${JSON.stringify(output,null,4)})};`
    }

    var TextComponent = {
        controller:controller$1,
        view:view$2
    };

    var rows$1=[
        {name: 'textOnError', label:'Text On Error', desc:'Text Shown on user Error'},
        {name: 'leftKeyText', label:'Left Key Text', desc: 'Left Key Text'},
        {name: 'rightKeyText', label:'Right Key Text', desc: 'Right Key Text'},
        {name: 'orKeyText', label:'Or Key Text', desc: 'Or Key Text'},
        {name: 'AttributesBlockInstructions', label: 'Attributes Block Instructions Text', desc: 'Attributes Block Instructions Text'},
        {name: 'CategoriesBlockInstructions', label: 'Categories Block Instructions Text', desc: 'Categories Block Instructions Text'},
        {name: 'FirstCombinedBlockInstructions', label: 'First Combined Block Instructions Text', desc: 'First Combined Block Instructions Text'},
        {name: 'SecondCombinedBlockInstructions', label: 'Second Combined Block Instructions Text', desc: 'Second Combined Block Instructions Text'},
        {name: 'SwitchedCategoriesInstructions', label: 'Switched Categories Instructions Text', desc: 'Switched Categories Instructions Text'},
        {name: 'PreDebriefingText', label: 'Pre-Debriefing Text', desc: 'Pre-Debriefing Text'},
    ];

    function controller$1(settings$1){
        var textparameters = settings$1.text;
        return {reset:reset, clear:clear, set:set, get:get};
        
        function reset(){Object.assign(textparameters, settings.text);}
        function clear(){ Object.assign(textparameters, {textOnError:'',
        leftKeyText:'',
        rightKeyText:'',
        orKeyText:'',
        AttributesBlockInstructions:'',
        CategoriesBlockInstructions:'',
        FirstCombinedBlockInstructions:'',
        SecondCombinedBlockInstructions:'',
        SwitchedCategoriesInstructions:'',
        PreDebriefingText:''
    }); }
        function get(name){ return textparameters[name]; }
        function set(name){ 
            return function(value){ return textparameters[name] = value; }
        }
    }

      
    function view$2(ctrl){
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
                rows$1.map(function(row) {
                    return m('tr.lines', [
                        m('td.td_info',[
                            m('i.fa.fa-info-circle'),
                            m('.card.info-box.card-header', [row.desc])
                        ]),
                        m('td.td_task', row.label),
                        m('td', [
                            m('textarea',{style: {width: '30rem' ,height: '4rem'}, value:ctrl.get(row.name), onchange:m.withAttr('value', ctrl.set(row.name))})
                        ])
                    ])
                }
                ),
        
            ])
        ]) 
    }

    var components = {
        parameters: parametersComponent,
        categories: { view: function(){ return m('div', 'Categories component'); } },
    	text:TextComponent,
    	output: outputComponent
    };

    var tabs = [
    	{value: 'parameters', text: 'Task parameters'},
    	{value: 'categories', text: 'Categories'},
    	{value: 'text', text: 'Text'},
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
