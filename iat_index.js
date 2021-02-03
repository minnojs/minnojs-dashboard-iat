/**
 * @preserve minnojs-iat-dashboard v1.0.0
 * @license Apache-2.0 (2021)
 */

(function () {
	'use strict';

	var tabsComponent = {
	    controller: function(tabs){
			var tab = tabs[0].value; // set default tab
			var index = setIndex(tab);
			return { tab: tab, index: index, setIndex:setIndex};

			function setIndex(tab){ return tabs.findIndex((element) => (element.value == tab));}
	    },
		view: function(ctrl, tabs, settings, defaultSettings){
			return m('.container', [
				m('.tab', tabs.map(function(tab){
					if (tab.value == 'practice') {
						if(settings.parameters.practiceBlock == false) return null;
					}
					return m('button.tablinks', {
	                    class: ctrl.tab == tab.value ? 'active' : '',
	                    onclick:function(){
							ctrl.tab = tab.value;
							ctrl.index = ctrl.setIndex(tab.value);
						}},tab.text);
				})),
				m('.tabContent', [
					m.component(tabs[ctrl.index].component, settings, defaultSettings, tabs[ctrl.index].rowsDesc)
				])
			]);
		}
	};

	var settings = {
	    parameters : {isTouch:false, isQualtrics:false, fullscreen:false, showDebriefing:false, remindError:true, errorCorrection:true,base_url:''},
	    category1: {name: "Black people", title: {media: { word : "Black people"}, css: {color: '#336600', 'font-size': '1.8em'}, height: 4}, 
	                stimulusMedia: [{word: "Tayron"}, {word: "Malik"},{word: "Terrell"},{word: "Jazamin"},{word: "Tiara"},{word: "Shanice"}],
	                stimulusCss : {color:'#336600', 'font-size':'1.8em'}
	    },
	    category2: {name: "White people", title: {media: { word : "White people"}, css: {color: '#336600', 'font-size': '1.8em'}, height: 4}, 
	                stimulusMedia: [{word: "Jake"}, {word: "Conor"},{word: "Bradley"},{word: "Allison"},{word: "Emma"},{word: "Emily"}],
	                stimulusCss : {color:'#336600', 'font-size':'1.8em'}
	                },
	    attribute1: {name: "Bad Words", title: {media: { word : "Bad Words"}, css: {color: '#336600', 'font-size': '1.8em'}, height: 4}, 
	                stimulusMedia: [{word: "Awful"}, {word: "Failure"},{word: "Agony"},{word: "Hurt"},{word: "Horrible"},{word: "Terrible"}
	                ,{word: "Nasty"},{word: "Evil"}],
	                stimulusCss : {color:'#336600', 'font-size':'2.3em'}
	                },
	    attribute2: {name: "Good Words", title: {media: { word : "Good Words"}, css: {color: '#336600', 'font-size': '1.8em'}, height: 4}, 
	                stimulusMedia: [{word: "Laughter"}, {word: "Happy"},{word: "Glorious"},{word: "Joy"},{word: "Wonderful"},{word: "Peace"}
	                ,{word: "Pleasure"}, {word: "Love"}],
	                stimulusCss : {color:'#336600', 'font-size':'2.3em'}
	                },
	    blocks: {blockCategories_nTrials: 20,blockCategories_nMiniBlocks:5, blockAttributes_nTrials:20,blockAttributes_nMiniBlocks:5,
	        blockFirstCombined_nTrials:20, blockFirstCombined_nMiniBlocks:5, blockSecondCombined_nTrials:40, blockSecondCombined_nMiniBlocks:10,
	        blockSwitch_nTrials:28, blockSwitch_nMiniBlocks:7, randomBlockOrder: true, randomAttSide : false
	    },
	    text: {
	        textOnError:'<p align="center" style="font-size:0.6em"; font-family:arial">' +'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. '+'Press the other key to continue.<p/>',
	        leftKeyText:'Press "E" for ',
	        rightKeyText:'Press "I" for',
	        orKeyText:'or',
	        AttributesBlockInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">' +'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +'Put a left finger on the <b>E</b> key for items that belong to the category <font color="#0000ff">leftAttribute.</font>' +'<br/>Put a right finger on the <b>I</b> key for items that belong to the category <font color="#0000ff">rightAttribute</font>.<br/><br/>' +'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +'Press the other key to continue.<br/>' +'<u>Go as fast as you can</u> while being accurate.<br/><br/></p>'+'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
	        CategoriesBlockInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">' +'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +'Put a left finger on the <b>E</b> key for items that belong to the category <font color="#336600">leftCategory</font>. ' +'<br/>Put a right finger on the <b>I</b> key for items that belong to the category <font color="#336600">rightCategory</font>.<br/>' +'Items will appear one at a time.<br/><br/>' +'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +'Press the other key to continue.<br/>' +'<u>Go as fast as you can</u> while being accurate.<br/><br/></p>'+'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
	        FirstCombinedBlockInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">' +'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +'Use the <b>E</b> key for <font color="#336600">leftCategory</font> and for <font color="#0000ff">leftAttribute</font>.<br/>' +'Use the <b>I</b> key for <font color="#336600">rightCategory</font> and for  <font color="#0000ff">rightAttribute</font>.<br/>' +'Each item belongs to only one category.<br/><br/>' +'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +'Press the other key to continue.<br/>' + '<u>Go as fast as you can</u> while being accurate.<br/><br/></p>' +'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
	        SecondCombinedBlockInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">' +'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +'This is the same as the previous part.<br/>' +'Use the <b>E</b> key for <font color="#336600">leftCategory</font> and for <font color="#0000ff">leftAttribute</font>.<br/>' +'Use the <b>I</b> key for <font color="#336600">rightCategory</font> and for  <font color="#0000ff">rightAttribute</font>.<br/>' +'Each item belongs to only one category.<br/><br/>' +'<u>Go as fast as you can</u> while being accurate.<br/><br/></p>' +'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
	        SwitchedCategoriesInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">'+'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +'<b>Watch out, the labels have changed position!</b><br/>' +'Put the left finger on the <b>E</b> key for <font color="#336600">leftCategory</font>.<br/>' +'Put the right finger on the <b>I</b> key for <font color="#336600">rightCategory</font>.<br/><br/>' +'<u>Go as fast as you can</u> while being accurate.<br/><br/></p>' +'<p align="center">Press the <b>space bar</b> when you are ready to start.</font></p></div>',
	        PreDebriefingText:'Press space to continue to your feedback '
	    },
	    touch_text : {
	        textOnError:'<p align="center" style="font-size:"1.4em"; font-family:arial">' +'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. '+'Touch the other side to continue.<p/>',
	        leftKeyText:'Press "E" for ',
	        rightKeyText:'Press "I" for',
	        orKeyText:'or',
	        AttributesBlockInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">' +'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +'Put a left finger over the <b>left</b> green area for items that belong to the category <font color="#0000ff">leftAttribute.</font>' +'<br/>Put a right finger over the <b>right</b> green area for items that belong to the category <font color="#0000ff">rightAttribute</font>.<br/><br/>' +'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +'Touch the other side to continue.<br/>' +'<u>Go as fast as you can</u> while being accurate.<br/><br/></p>'+'<p align="center">Touch the <b>green area</b> when you are ready to start.</font></p></div>',
	        CategoriesBlockInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">' +'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +'Put a left finger over the <b>left</b> green area for items that belong to the category <font color="#0000ff">leftCategory.</font>' +'<br/>Put a right finger over the <b>right</b> green area for items that belong to the category <font color="#0000ff">rightCategory</font>.<br/><br/>' +'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +'Touch the other side to continue.<br/>' +'<u>Go as fast as you can</u> while being accurate.<br/><br/></p>'+'<p align="center">Touch the <b>green area</b> when you are ready to start.</font></p></div>',
	        FirstCombinedBlockInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">' +'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +'Put a left finger over the <b>left</b> green area for items that belong to the category <font color="#0000ff">leftCategory.</font>' +'<br/>Put a right finger over the <b>right</b> green area for items that belong to the category <font color="#0000ff">rightCategory</font>.<br/><br/>' +'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +'Touch the other side to continue.<br/>' +'<u>Go as fast as you can</u> while being accurate.<br/><br/></p>'+'<p align="center">Touch the <b>green area</b> when you are ready to start.</font></p></div>',
	        SecondCombinedBlockInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">' +'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial">' +'Put a left finger over the <b>left</b> green area for items that belong to the category <font color="#0000ff">leftCategory.</font>' +'<br/>Put a right finger over the <b>right</b> green area for items that belong to the category <font color="#0000ff">rightCategory</font>.<br/><br/>' +'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +'Touch the other side to continue.<br/>' +'<u>Go as fast as you can</u> while being accurate.<br/><br/></p>'+'<p align="center">Touch the <b>green area</b> when you are ready to start.</font></p></div>',
	        SwitchedCategoriesInstructions:'<div><p align="center" style="font-size:20px; font-family:arial">' +'<font color="#000000"><u>Part blockNum of nBlocks </u><br/><br/></p>' +'<p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial"><br/>'+'Watch out, the labels have changed position!<br/>'+'Put a left finger over the <b>left</b> green area for items that belong to the category <font color="#0000ff">leftCategory.</font>' +'<br/>Put a right finger over the <b>right</b> green area for items that belong to the category <font color="#0000ff">rightCategory</font>.<br/><br/>' +'If you make a mistake, a red <font color="#ff0000"><b>X</b></font> will appear. ' +'Touch the other side to continue.<br/>' +'<u>Go as fast as you can</u> while being accurate.<br/><br/></p>'+'<p align="center">Touch the <b>green area</b> when you are ready to start.</font></p></div>',
	        PreDebriefingText:'Touch the bottom green area to continue to the next task.'
	    }
	};

	var parametersComponent = {
	    controller:controller,
	    view:view
	};

	function controller(settings, defaultSettings, rows){
	    var parameters = settings.parameters;
	    return {reset:reset, clear:clear, set:set, get:get, rows: rows};
	    
	    function reset(){Object.assign(parameters, defaultSettings.parameters);}
	    function clear(){Object.assign(parameters, rows.slice(-1)[0]);}    function get(name){
	        if (name == 'isTouch')
	            if(parameters[name] == true) return 'Touch' 
	            else return 'Keyboard';
	        if (name == 'isQualtrics')
	            if (parameters[name] == true) return 'Qualtrics'
	            else return 'Regular';
	        return parameters[name];
	    }
	    function set(name){ return function(value){ 
	        if (name == 'isTouch')
	            if(value == 'Keyboard') return parameters[name] = false;
	            else return parameters[name] = true;
	        if (name == 'isQualtrics')
	            if (value == 'Regular') return parameters[name] = false;
	            else return parameters[name] = true;
	        return parameters[name] = value; 
	    }}
	}

	function view(ctrl){
	    return m('.container', [
	        m('table.w3-table w3-bordered',[
	            m('tr.border_lines', [
	                m('td'), //for space
	                m('td'), //for space
	                m('td',[
	                    m('button.reset_button', {onclick: ctrl.reset},'Reset'),
	                    m('button.reset_button',{onclick: ctrl.clear}, 'Clear'),
	                ])
	            ]),
	            m('tr.lines', [
	                m('td.td_info',[
	                    m('i.fa.fa-info-circle'),
	                    m('.card.info-box.card-header', [ctrl.rows[0].desc])
	                ]),
	                m('td.td_task', ctrl.rows[0].label),
	                m('td', [
	                    m('select',{onchange: m.withAttr('value', ctrl.set(ctrl.rows[0].name)), value: ctrl.get(ctrl.rows[0].name)},[
	                    m('option', 'Keyboard'),
	                    m('option', 'Touch')
	                ])])
	            ]),
	            m('tr.lines', [
	                m('td.td_info',[
	                    m('i.fa.fa-info-circle'),
	                    m('.card.info-box.card-header', [ctrl.rows[1].desc])
	                ]),
	                m('td.td_task', ctrl.rows[1].label),
	                m('td', [
	                    m('select',{onchange: m.withAttr('value', ctrl.set(ctrl.rows[1].name)), value: ctrl.get(ctrl.rows[1].name)},[
	                    m('option', 'Regular'),
	                    m('option', 'Qualtrics')
	                ])])
	            ]),
	            ctrl.rows.slice(2,-1).map(function(row) {
	                return m('tr.lines', [
	                    m('td.td_info',[
	                        m('i.fa.fa-info-circle'),
	                        m('.card.info-box.card-header', [row.desc])
	                    ]),
	                    m('td.td_task', row.label),
	                    m('td',
	                        m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set(row.name)), checked: ctrl.get(row.name)}))
	                ])}
	            ),
	            m('tr.border_lines', [
	                m('td.td_info',[
	                    m('i.fa.fa-info-circle'),
	                    m('.card.info-box.card-header',{style:{width: '500px'}}, ['If your task has any images, enter here the path to that images folder. It can be a full url, or a relative URL to the folder that will host this script'])
	                ]),
	                m('td.td_task', 'Image\'s URL'),
	                m('td',
	                    m('input',{style: {width: '30rem'}, value:ctrl.get('base_url'), onchange:m.withAttr('value', ctrl.set('base_url'))}))
	            ]),
	        ])
	    ]) 
	}

	var outputComponent = {
	    view:view$1
	};

	function view$1(ctrl,settings){
	    return m('.container',[
	        m('.row justify-content-md-center',[
	            m('.col-md-lg-1', m('button.CreateFile', {onclick: createFile(settings,'JS')}, 'Download Script')),
	        m('.col col-lg-1', [                
	            m('i.fa.fa-info-circle'),
	            m('.card.info-box.card-header', ['Download the JavaScript file. For more details how to use it, see the “Help” page.']),
	        ])
	    ]), 
	    m('.row justify-content-md-center',[
	       m('.col-md-lg-1', m('button.CreateJSONFile', {onclick: createFile(settings,'JSON')}, 'Download JSON')),
	    m('.col col-lg-1', [
	        m('i.fa.fa-info-circle'),
	        m('.card.info-box.card-header', ['Importing this file to this tool, will load all your parameters to this tool.']),
	    ]),
	    ]),
	    m('.row justify-content-md-center',[
	        m('.col col-lg-4', [
	            m('button.CreateJSONFile', {onclick: printToPage(settings)}, 'Print to Browser')
	        ]),
	        m('.col col-lg-1')
	    ]),
	        m('div',{id: 'textDiv', style: {visibility: 'hidden', 'padding' :'0 0 0 3.5em'}},
	        m('textarea', {id:'textArea', value:'', style: {width : '60rem', height: '25rem'}}))
	    ])
	    // return m('div',[
	    //     m('div',{style: {position: "absolute",top:'34%',left:'38.5%'}},[
	    //         m('i.fa.fa-info-circle'),
	    //         m('.card.info-box.card-header', ['Download the JavaScript file. For more details how to use it, see the “Help” page.']),
	    //     ]),
	    //     m('button.CreateFile', {onclick: createFile(settings,'JS')}, 'Download Script'),
	    //     m('div',{style: {position: "absolute",top:'45%',left:'39%'}},[
	    //         m('i.fa.fa-info-circle'),
	    //         m('.card.info-box.card-header', ['Importing this file to this tool, will load all your parameters to this tool.']),
	    //     ]),
	    //     m('button.CreateJSONFile', {onclick: createFile(settings,'JSON')}, 'Download JSON'),
	    //     m('button.CreateJSONFile', {onclick: toConsole(settings)}, 'Print to Console'),
	    //     m('button.CreateJSONFile', {onclick: printToPage(settings)}, 'Print to Browser'),
	    //     m('div',{id: 'textDiv', style: {visibility: 'hidden', 'padding' :'0 0 0 3.5em'}},
	    //         m('textarea', {id:'textArea', value:'', style: {width : '60rem', height: '25rem'}}))
	    // ]);
	}

	function createFile(settings, fileType){
	    return function(){
	        var output,textFileAsBlob;
	        var downloadLink = document.createElement("a");
	        if (fileType == 'JS') {
	            output = toString(settings);
	            textFileAsBlob = new Blob([output], {type:'text/plain'});
	            downloadLink.download = "IAT.js"; }
	        else {
	            output = updateSettings(settings);
	            textFileAsBlob = new Blob([JSON.stringify(output,null,4)], {type : 'application/json'});
	            downloadLink.download = "IAT.json"; }
	        if (window.webkitURL != null) {downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);}
	        else {
	            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
	            downloadLink.onclick = destroyClickedElement;
	            downloadLink.style.display = "none";
	            document.body.appendChild(downloadLink);}
	        downloadLink.click();
	        }
	}

	function printToPage(settings){
	    return function() {
	        var para = document.getElementById("textDiv");
	        para.style.visibility = 'visible';
	        var text_area = document.getElementById("textArea");
	        text_area.value = toString(settings);
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
	        errorCorrection: settings.parameters.errorCorrection,
	        isTouch: settings.parameters.isTouch
	    };
	    if(settings.parameters.isQualtrics){
	        output.isQualtrics=settings.parameters.isQualtrics,
	        output.showDebriefing=settings.parameters.showDebriefing,
	        output.fullscreen=settings.parameters.fullscreen;
	    }
	    Object.assign(output, settings.blocks);
	    settings.parameters.isTouch ? Object.assign(output, settings.touch_text) : Object.assign(output, settings.text); 
	    return output;
	}

	function toScript(output){
	    return `define(['pipAPI' ,'${output.isQualtrics ? 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/qualtrics/quiat9.js': 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat8.js'}'], function(APIConstructor, iatExtension) {var API = new APIConstructor(); return iatExtension(${JSON.stringify(output,null,4)})});`
	}

	var textComponent = {
	    controller:controller$1,
	    view:view$2
	};

	function controller$1(settings, defaultSettings, rows){
	    var isTouch = settings.parameters.isTouch;
	    var textparameters;
	    isTouch ? textparameters = settings.touch_text : textparameters = settings.text;
	    return {reset:reset, clear:clear, set:set, get:get, rows: rows.slice(0,-1)};
	    
	    function reset(){isTouch ? Object.assign(textparameters, defaultSettings.touch_text) : Object.assign(textparameters, defaultSettings.text);}
	    function clear(){ Object.assign(textparameters, rows.slice(-1)[0]); }
	    function get(name){ return textparameters[name]; }
	    function set(name){ 
	        return function(value){ return textparameters[name] = value; }
	    }
	}

	function view$2(ctrl){
	    return m('.container', [
	        m('table.w3-table w3-bordered',{id : 'table'}, [
	            m('tr.border_lines', [
	                m('td'), m('td'), //for space
	                m('td',[
	                    m('button.reset_button', {onclick: ctrl.reset},'Reset'),
	                    m('button.reset_button',{onclick: ctrl.clear}, 'Clear'),
	                ])
	        ]),
	            ctrl.rows.map(function(row) {
	                return m('tr.lines', [
	                    m('td.td_info',[
	                        m('i.fa.fa-info-circle'),
	                        m('.card.info-box.card-header', {style:{width: '510px'}},[row.desc])
	                    ]),
	                    m('td.td_task', {style:{width: '30%'}},row.label),
	                    m('td', [
	                        m('textarea',{style: {width: '30rem' ,height: '4rem'}, value:ctrl.get(row.name), onchange:m.withAttr('value', ctrl.set(row.name))})
	                    ])
	                ])
	            }
	            ),
	    
	        ])
	    ]) 
	}

	var blocksComponent = {
	    controller:controller$2,
	    view:view$3
	};

	function controller$2(settings, defaultSettings, rows){
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
	function view$3(ctrl){
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
	}

	var elementComponent = {
	    controller:controller$3,
	    view:view$4,
	};

	function controller$3(object,settings, stimuliList){
	    var element = settings[object.key];
	    let fields = {
	        newStimulus : m.prop(''),
	        elementType: m.prop(object.key.includes("category") ? 'Category' : 'Attribute'),
	        titleType: m.prop(element.title.media.word == undefined ? 'image' : 'word'),
	        titleHidden: m.prop(''), //weather the category design flags will be visible
	        selectedStimuli: m.prop(''),
	        stimuliHidden: m.prop(''),
	    }; 
	    return {fields, set:set, get:get, addStimulus:addStimulus, 
	        updateSelectedStimuli:updateSelectedStimuli,removeChosenStimuli:removeChosenStimuli, removeAllStimuli:removeAllStimuli, 
	        updateTitleType:updateTitleType, resetStimuliList:resetStimuliList};
	    
	    function get(name,media = null,type = null){ 
	        if (name == 'title' && media == null && type == null) { //special case - return the title's value (word/image)
	            if (element.title.media.word == undefined) return element.title.media.image;
	            return element.title.media.word;
	        }
	        if (media !=null && type!=null) {
	            if (type == 'font-size') {
	                return parseFloat((element[name][media][type].replace("em","")));
	            }
	            return element[name][media][type];
	        }
	        else if (media == 'color') //case of stimulusCss
	            return element[name][media];
	        else if (media == 'font-size') return parseFloat((element[name][media]).substring(0,3));
	        return element[name]; 
	    }
	    function set(name,media = null,type = null){ 
	        return function(value){ 
	            if (media !=null && type!=null) {
	                if (type == 'font-size') {
	                    if (value == 0) { 
	                        alert("Font's size must be bigger then 0");
	                        return element[name][media][type]; 
	                    }
	                    return element[name][media][type] = value + "em";
	                }
	                return element[name][media][type] = value;
	            }
	            else if (media == 'color') return element[name][media] = value;
	            else if (media == 'font-size') {
	                if (value == 0) { 
	                    alert("Font's size must be bigger then 0");
	                    return element[name][media]; 
	                }
	                return element[name][media] = value + "em";
	            }
	            return element[name] = value; 
	        }
	    }

	    function updateTitleType() { 
	        return function (type) {
	            fields.titleType(type);
	            var object = element.title.media;
	            var category = object.word != undefined ? object.word : object.image;
	            if (type == 'word') {
	                element.title.media = {};
	                element.title.media = {word: category};
	            }
	            else {
	                element.title.media = {};
	                element.title.media = {image: category};
	            }
	        }
	    }
	    function addStimulus(event){
	        var new_stimuli = fields.newStimulus();
	        var event = event.path[0].id; //button name, to know the kind of the stimulus added
	        if(new_stimuli === null || new_stimuli === '') 
	            return alert("Please fill the stimulus field");
	        if(isExists(new_stimuli)) 
	            return alert('This value is already exists, please enter a different one');
	        element.stimulusMedia.push( (event === 'addWord') ? {word : new_stimuli} : {image : new_stimuli});
	        fields.newStimulus(''); //reset the field               
	    }
	    function isExists(new_stimuli){
	        var stimuli = element['stimulusMedia'];
	        if (stimuli.length == 0) return false;
	        for (var i = 0; i < stimuli.length; i++) {
	            if (stimuli[i].word == undefined) 
	                if(stimuli[i].image == new_stimuli) return true;
	                else continue;
	            if(stimuli[i].word.localeCompare(new_stimuli) == 0) return true
	        }
	        return false;
	    }
	    function updateSelectedStimuli(select){
	        var list = element.stimulusMedia.filter(function(val,i){return select.target.options[i].selected});
	        fields.selectedStimuli(list);
	    }

	    function removeChosenStimuli() {
	        var list = element.stimulusMedia.filter((element)=>!fields.selectedStimuli().includes(element));
	        element.stimulusMedia = list;
	        fields.selectedStimuli([]);
	    }

	    function removeAllStimuli() {element.stimulusMedia.length = 0;}
	    function resetStimuliList(){ Object.assign(element.stimulusMedia,  JSON.parse(JSON.stringify(stimuliList)));}
	}

	function view$4(ctrl) {
	    return m('table.w3-table w3-bordered', [
	        m('tr.lines', [
	                m('td.td_info',[
	                    m('i.fa.fa-info-circle'),
	                    m('.card.info-box.card-header', ['Will appear in the data and in the default feedback message'])
	                ]),
	                m('td.category_cell', ctrl.fields.elementType()+' name as will appear in the data:'),
	                m('td', [
	                    m('input',{style: {width: '16rem'}, value:ctrl.get('name'), onchange:m.withAttr('value', ctrl.set('name'))})
	                ]),
	                m('td'), m('td'), m('td') //for space
	            ]),
	            m('tr.lines', [
	                m('td.td_info',[
	                    m('i.fa.fa-info-circle'),
	                    m('.card.info-box.card-header', ['Name of the ' +ctrl.fields.elementType()+' presented in the task'])
	                ]),
	                m('td.category_cell', ctrl.fields.elementType()+' title as will appear to the user: '),
	                m('td', [
	                    m('input',{style: {width: '16rem'}, value: ctrl.get('title'), onchange:m.withAttr('value', ctrl.set('title', 'media', 'word'))})
	                ]),
	                m('td.design_text_cell', ctrl.fields.elementType()+"'s type:",
	                [
	                    m('select',{value: ctrl.get('title','media','word') == undefined || ctrl.get('title','media','word') == '' ? 'image' : 'word', onchange:m.withAttr('value',ctrl.updateTitleType())},[
	                        ctrl.fields.titleType(ctrl.get('title','media','word') == undefined || ctrl.get('title','media','word') == '' ? 'image' : 'word'),
	                        ctrl.fields.titleHidden(ctrl.fields.titleType() == 'word' ? 'visible' : 'hidden'),
	                        m('option', 'word'),
	                        m('option', 'image')
	                    ])
	                ]),
	                m('td.design_text_cell',[
	                    m("span", {style: {visibility:ctrl.fields.titleHidden()}}, "Font's color: "),
	                    m('input[type=color]',{style: {visibility:ctrl.fields.titleHidden()}, value: ctrl.get('title','css','color'), onchange:m.withAttr('value', ctrl.set('title','css','color'))})
	                ]),
	                m('td.design_text_cell',[
	                    m("span", {style: {visibility:ctrl.fields.titleHidden()}}, "Font's size: "),
	                    m('input[type=number]', {style: {visibility:ctrl.fields.titleHidden()}, value:ctrl.get('title','css','font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set('title','css','font-size'))})
	                ]),
	            ]),
	            m('tr',[
	                m('td',[
	                    m('div',[
	                    m('i.fa.fa-info-circle'),
	                    m('.card.info-box.card-header', ['Enter text (word) or image name (image). Set the path to the folder of images in the General Parameters page'])])
	                ]),
	                m('td',[
	                    m('br'),
	                    m('span',"Enter Stimulus content: "),
	                    m('br'),
	                    m('input[type=text', {style: {width: '15rem'}, pattern: "([A-z0-9À-ž\s]){2,}", value: ctrl.fields.newStimulus(), oninput: m.withAttr("value", ctrl.fields.newStimulus)}),
	                    m('br'),
	                    m('input[type=button]', {id:"addWord", value: 'Add Word', onclick:ctrl.addStimulus}),
	                    m('input[type=button]', {id:"addImage", value: 'Add Image', onclick: ctrl.addStimulus})
	                ]),
	            ]),
	            m('tr.border_lines',[
	                m('td',[
	                    m('div',{style: {position: "relative",top:'80px'}}, [
	                    m('i.fa.fa-info-circle'),
	                    m('.card.info-box.card-header', ['To select multiple stimuli, please press the ctrl key while selecting the desired stimuli'])])
	                ]),                
	                m('td',[
	                    m('span',"Stimuli: "),
	                    m('br'),
	                    m('select', {multiple : "multiple", size : "8" ,style: {width: '15rem'}, onchange:(e) => ctrl.updateSelectedStimuli(e)},[
	                        ctrl.get('stimulusMedia').some(object => object.word) ? ctrl.fields.stimuliHidden('visible') : ctrl.fields.stimuliHidden('hidden'),
	                        ctrl.get('stimulusMedia').map(function(object){
	                            var value = object.word ? object.word : object.image;
	                            var option = value + (object.word ? ' [Word]' : ' [Image]');
	                            return m('option', {value:value, selected : ctrl.fields.selectedStimuli().includes(object)}, option);
	                        })
	                    ]),
	                    m('',{style: {visibility:ctrl.fields.stimuliHidden(), position: "relative", top: "-170px", left: "255px", marginBottom: "-150px"}},[
	                        m('span',"Stimuli font's design:"),m('br'),
	                        m('label',"Font color: "),m('br'),
	                        m('input[type=color]', {value: ctrl.get('stimulusCss','color'), onchange:m.withAttr('value', ctrl.set('stimulusCss','color'))}),
	                        m('br'), m('label', "Font's size:"), m('br'),
	                        m('input[type=number]', {value:ctrl.get('stimulusCss','font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set('stimulusCss','font-size'))})
	                    ]),
	                    m('br'),
	                    m('input[type=button]', {value:'Remove Chosen Stimuli', disabled: ctrl.fields.selectedStimuli().length===0, onclick:ctrl.removeChosenStimuli}),
	                    m('br'),
	                    m('input[type=button]', {value: 'Remove All Stimuli', onclick:ctrl.removeAllStimuli}),
	                    m('input[type=button]', {value: 'Reset Stimuli List', onclick:ctrl.resetStimuliList}),
	                    m('br'), m('br')
	                ]),
	                m('td'), 
	                m('td'), m('td'), m('td') //for space
	            ])
	    ])

	}

	var categoriesComponent = {
	    controller:controller$4,
	    view:view$5
	};

	function controller$4(settings, defaultSettings, clearElement){
	    return {reset:reset, clear:clear};
	    function reset(){
	        Object.assign(settings.category1,  JSON.parse(JSON.stringify(defaultSettings.category1)));
	        Object.assign(settings.category2, JSON.parse(JSON.stringify(defaultSettings.category2)));
	    }
	    function clear(){
	        Object.assign(settings.category1, JSON.parse(JSON.stringify(clearElement[0])));
	        Object.assign(settings.category2, JSON.parse(JSON.stringify(clearElement[0])));
	    }
	}

	function view$5(ctrl,settings, defaultSettings) {
	    return m('.container', [
	        m('table.w3-table w3-bordered', [
	            m('tr', [
	                m('h1.categoryHeadline',"First Category"),
	                m('td',{style: {position: 'absolute', right: '95px', top: "180px"}},[
	                        m('button.reset_button', {onclick: ctrl.reset},'Reset'),
	                        m('button.reset_button',{onclick: ctrl.clear}, 'Clear')
	                ])
	            ]),
	        ]),
	        m.component(elementComponent, {key: "category1"} ,settings, defaultSettings.category1.stimulusMedia),
	        m('h1.categoryHeadline',"Second Category"),
	        m.component(elementComponent, {key:"category2"}, settings, defaultSettings.category2.stimulusMedia)
	    ])
	}

	var attributesComponent = {
	    controller:controller$5,
	    view:view$6
	};

	function controller$5(settings, defaultSettings, clearElement){
	    return {reset:reset, clear:clear};
	    function reset(){
	        Object.assign(settings.attribute1,  JSON.parse(JSON.stringify(defaultSettings.attribute1)));
	        Object.assign(settings.attribute2,  JSON.parse(JSON.stringify(defaultSettings.attribute2)));}
	    function clear(){
	        Object.assign(settings.attribute1, clearElement[0]);
	        Object.assign(settings.attribute2, clearElement[0]);
	    }
	}

	function view$6(ctrl,settings, defaultSettings) {
	    return m('.container', [
	        m('table.w3-table w3-bordered', [
	            m('tr', [
	                m('h1.categoryHeadline',"First Attribute"),
	                m('td',{style: {position: 'absolute', right: '95px', top: "180px"}},[
	                        m('button.reset_button', {onclick: ctrl.reset},'Reset'),
	                        m('button.reset_button',{onclick: ctrl.clear}, 'Clear')
	                ])
	            ]),
	        ]),
	        m.component(elementComponent,{key: "attribute1"} ,settings, defaultSettings.attribute1.stimulusMedia),
	        m('h1.categoryHeadline',"Second Attribute"),
	        m.component(elementComponent,{key:"attribute2"}, settings, defaultSettings.attribute2.stimulusMedia)
	    ])
	}

	var importComponent = {
	    controller:controller$6,
	    view:view$7
	};

	function view$7(ctrl){
	    return m('div.uploadDiv', [
	        m('i.fa.fa-info-circle', {style: {padding: '5px'}}),
	        m('.card.info-box.card-header', ["If you saved a JSON file from a previous session, you can upload that file here to edit the parameters."]),
	        m('label', 'Upload a JSON file: ', {style:{'text-align': 'center'}}),
	        m('input[type=file]',{id:"uploadFile", style: {'text-align': 'center'}, onchange: ctrl.handleFile})
	    ]);
	}

	function controller$6(settings) {
	    let fileInput = m.prop('');
	    return {fileInput:fileInput, handleFile:handleFile, updateSettings:updateSettings};

	    function handleFile(){
	        var importedFile = document.getElementById("uploadFile").files[0];
	        var reader = new FileReader();
	        reader.readAsText(importedFile); 
	        reader.onload = function() {
	        var fileContent = JSON.parse(reader.result);
	        updateSettings(fileContent);};
	        reader.onerror = function() {console.log(reader.error);};
	    }
	    function updateSettings(input) {
	        settings.category1 = input.category1;
	        settings.category2 = input.category2;
	        settings.attribute1 = input.attribute1;
	        settings.attribute2 = input.attribute2;
	        settings.parameters.base_url = input.base_url;
	        settings.parameters.remindError = input.remindError;
	        settings.parameters.errorCorrection;
	        settings.parameters.isTouch = input.isTouch;
	        if(input.isQualtrics){
	            settings.parameters.isQualtrics = input.isQualtrics;
	            settings.parameters.showDebriefing = input.showDebriefing;
	            settings.parameters.fullscreen = input.fullscreen;
	        }
	        settings.blocks.blockCategories_nTrials = input.blockCategories_nTrials,
	        settings.blocks.blockCategories_nMiniBlocks = input.blockCategories_nMiniBlocks,
	        settings.blocks.blockAttributes_nTrials = input.blockAttributes_nTrials,
	        settings.blocks.blockAttributes_nMiniBlocks = input.blockAttributes_nMiniBlocks,
	        settings.blocks.blockFirstCombined_nTrials = input.blockFirstCombined_nTrials,
	        settings.blocks.blockFirstCombined_nMiniBlocks = input.blockFirstCombined_nMiniBlocks,
	        settings.blocks.blockSecondCombined_nTrials = input.blockSecondCombined_nTrials,
	        settings.blocks.blockSecondCombined_nMiniBlocks = input.blockSecondCombined_nMiniBlocks,
	        settings.blocks.blockSwitch_nTrials = input.blockSwitch_nTrials,
	        settings.blocks.blockSwitch_nMiniBlocks = input.blockSwitch_nMiniBlocks,
	        settings.blocks.randomBlockOrder = input.randomBlockOrder,
	        settings.blocks.randomAttSide = input.randomAttSide;
	        if (input.isTouch){
	            settings.touch_text.textOnError = input.textOnError,
	            settings.touch_text.leftKeyText = input.leftKeyText,
	            settings.touch_text.rightKeyText = input.rightKeyText,
	            settings.touch_text.orKeyText = input.orKeyText,
	            settings.touch_text.AttributesBlockInstructions = input.AttributesBlockInstructions,
	            settings.touch_text.CategoriesBlockInstructions = input.CategoriesBlockInstructions,
	            settings.touch_text.FirstCombinedBlockInstructions = input.FirstCombinedBlockInstructions,
	            settings.touch_text.SecondCombinedBlockInstructions = input.SecondCombinedBlockInstructions,
	            settings.touch_text.SwitchedCategoriesInstructions = input.SwitchedCategoriesInstructions,
	            settings.touch_text.PreDebriefingText = input.PreDebriefingText;
	        }
	        else {
	            settings.text.textOnError = input.textOnError,
	            settings.text.leftKeyText = input.leftKeyText,
	            settings.text.rightKeyText = input.rightKeyText,
	            settings.text.orKeyText = input.orKeyText,
	            settings.text.AttributesBlockInstructions = input.AttributesBlockInstructions,
	            settings.text.CategoriesBlockInstructions = input.CategoriesBlockInstructions,
	            settings.text.FirstCombinedBlockInstructions = input.FirstCombinedBlockInstructions,
	            settings.text.SecondCombinedBlockInstructions = input.SecondCombinedBlockInstructions,
	            settings.text.SwitchedCategoriesInstructions = input.SwitchedCategoriesInstructions,
	            settings.text.PreDebriefingText = input.PreDebriefingText;
	        }
	    }
	}

	var links = {
		IAT: "https://minnojs.github.io/minnojs-blog/qualtrics-iat/",
		BIAT: "https://minnojs.github.io/minnojs-blog/qualtrics-biat/"
	};

	var helpComponent = {

		view: function(ctrl, settings, defaultSettings, type){
			return m('.container', [
	            m('.card card-body',
					m('span', "This tool creates a script for running an "+type+" in your online study. The script uses Project Implicit’s "+type+
					" extension, which runs on MinnoJS, a JavaScript player for online studies. ",
					m('a',{href: "http://projectimplicit.net/"}, "Project Implicit "),
					"has developed MinnoJS to program web studies. To create "+type+"s, we programmed a general script (the “extension”) that runs an "+type+
					" based on parameters provided by another, more simple script. In this page, you can create a script that uses our "+type+" extension. You can read more about the basic idea of using extensions in Minno ",
					m('a',{href: "https://github.com/baranan/minno-tasks/blob/master/implicitmeasures.md"}, "on this page. "),
					"We run those scripts in ",
					m('a',{href: "https://minnojs.github.io/docsite/minnosuitedashboard/"}, "Open Minno Suite, "),
					"our platform for running web studies. You can install that platform on your own server, use a more simple ",
					m('a',{href: "https://minnojs.github.io/minnojs-blog/csv-server/"}, "php server for Minno, "),
					"or run ",
					m('a',{href: links[type]}, "this script directly from Qualtrics."),
					)
	            )
			]);
		}
	};

	var parametersDesc = [
	    {name: 'isTouch', label:'Keyboard input or touch input?', desc:'Minno does not auto-detect the input method. If you need a touch version and a keyboard version, create two different scripts with this tool.'},
	    {name: 'isQualtrics', label:'Regular script or Qualtrics?', desc: ['If you want this IAT to run from Qualtrics, read ', m('a',{href: "https://minnojs.github.io/minnojs-blog/qualtrics-iat/"}, "this blog post "),"to see how."]},
	    {name: 'fullscreen', label:'Run Full Screen', desc: 'Do you want to enable a full screen option?'},
	    {name: 'showDebriefing', label:'Show results interpretation at the end', desc: 'Not recommended. A single IAT score is not a reliable estimate of any psychological construct.'},
	    {name: 'remindError', label: 'Error feedback on incorrect responses', desc: 'It is recommended to show participants an error feedback on error responses.'},
	    {name: 'errorCorrection', label: 'Require correct response', desc: 'It is recommended to require participants to hit the correct response even after errors.'},
		{isTouch:false, isQualtrics:false, fullscreen:false, showDebriefing:false, remindError:false, errorCorrection:false,base_url:''}
	];

	var textDesc=[
	    {name: 'textOnError', label:'Screen’s Bottom (error reminder)', desc:'We use this text to remind participants what happens on error. Replace this text if you do not require participants to correct their error responses (see General Parameters page).'},
	    {name: 'leftKeyText', label:'Top-left text (about the left key)', desc: 'We use this text to remind participants what key to use for a left response.'},
	    {name: 'rightKeyText', label:'Top-right text (about the right key)', desc: 'We use this text to remind participants what key to use for a right response.'},
	    {name: 'orKeyText', label:'Or', desc: 'We show this text in the combined blocks to separate between the two categories that use the same key.'},
	    {name: 'AttributesBlockInstructions', label: 'Instructions in Block 1', desc: 'The instructions in the attributes practice block.'},
	    {name: 'CategoriesBlockInstructions', label: 'Instructions in Block 2', desc: 'The instructions in the categories practice block.'},
	    {name: 'FirstCombinedBlockInstructions', label: 'Instructions in Blocks 3 and 6', desc: 'The instructions in the first combined (4-groups) block.'},
	    {name: 'SecondCombinedBlockInstructions', label: 'Instructions in Blocks 4 and 7', desc: 'The instructions in the second combined (4-groups) block.'},
	    {name: 'SwitchedCategoriesInstructions', label: 'Instructions in Block 5', desc: 'The instructions in the block that provides practice for the reversed categories.'},
	    {name: 'PreDebriefingText', label: 'Text before showing results', desc: 'Will be used only if you selected (in the General Parameters page) to show the participants an interpretation of the result. We recommend avoiding that.'},
		{textOnError:'', leftKeyText:'', rightKeyText:'', orKeyText:'', AttributesBlockInstructions:'',CategoriesBlockInstructions:'',
	    FirstCombinedBlockInstructions:'', SecondCombinedBlockInstructions:'', SwitchedCategoriesInstructions:'',PreDebriefingText:''}
	];

	var blocksDesc = [
	    {label:'Block 1', numTrialBlocks:'blockCategories_nTrials', numMiniBlocks: 'blockCategories_nMiniBlocks', desc:"Will present the categories."},
	    {label:'Block 2', numTrialBlocks:'blockAttributes_nTrials', numMiniBlocks: 'blockAttributes_nMiniBlocks', desc:"Will present the attributes."},
	    {label:'Blocks 3 and 6', numTrialBlocks:'blockFirstCombined_nTrials', numMiniBlocks: 'blockFirstCombined_nMiniBlocks', desc:"The first combined block."},
	    {label:'Blocks 4 and 7', numTrialBlocks:'blockSecondCombined_nTrials', numMiniBlocks: 'blockSecondCombined_nMiniBlocks', desc:"The second combined block."},
	    {label:'Block 5', numTrialBlocks:'blockSwitch_nTrials', numMiniBlocks: 'blockSwitch_nMiniBlocks', desc:"Reversing the attributes block. Some have recommended using 50 trials in this block."},
		{blockCategories_nTrials: 0,blockCategories_nMiniBlocks:0, blockAttributes_nTrials:0,blockAttributes_nMiniBlocks:0,
			blockFirstCombined_nTrials:0, blockFirstCombined_nMiniBlocks:0, blockSecondCombined_nTrials:0, blockSecondCombined_nMiniBlocks:0,
			blockSwitch_nTrials:0, blockSwitch_nMiniBlocks:0, randomBlockOrder: false, randomAttSide : false}
	];

	var categoryClear = [{name: "", title: {media: {word: ""}, css: {color: '#000000', 'font-size': '0em'}, height: 4}, 
	                        stimulusMedia: [],
	                        stimulusCss : {color:'#000000', 'font-size':'0em'}}];

	var tabs = [
		{value: 'parameters', text: 'General parameters', component: parametersComponent, rowsDesc: parametersDesc },
		{value: 'blocks', text: 'Blocks', component: blocksComponent, rowsDesc: blocksDesc},
		{value: 'categories', text: 'Categories', component: categoriesComponent, rowsDesc: categoryClear},
		{value: 'attributes', text: 'Attributes', component: attributesComponent, rowsDesc: categoryClear},
		{value: 'text', text: 'Texts', component: textComponent, rowsDesc: textDesc},
		{value: 'output', text: 'Complete', component: outputComponent},
	    {value: 'import', text: 'Import', component: importComponent},
	    {value: 'help', text: 'Help', component: helpComponent, rowsDesc:'IAT'}
	];

	function clone(obj){
	    return JSON.parse(JSON.stringify(obj));
	}

	var iat = {
	    controller: function(settings$1){ return {settings: settings$1 ? settings$1 : clone(settings)}},
	    view: function(ctrl){
	        return m('.container', [
	            m('header.bg-success.text-white.p-4.mb-3', 
	                m('h1', 'Create my IAT script')),
	            m.component(tabsComponent, tabs, ctrl.settings, settings)
	        ]);
	    }
	};

	m.mount(document.getElementById('dashboard'), iat);

}());
//# sourceMappingURL=iat_index.js.map
