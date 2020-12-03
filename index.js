/**
 * @preserve minnojs-iat-dashboard v1.0.0
 * @license Apache-2.0 (2020)
 */

(function () {
    'use strict';

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
            rightKeyText:"or",
            orKeyText:'Press "I" for',
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
        {name: 'fullscreen', label:'Enable Full Screen', desc: 'Do you want to enable a full screen option?'},
        {name: 'showDebriefing', label:'Show Debriefing', desc: 'Do you want to show debriefing at the end?'},
        {name: 'remindError', label: 'Show an Error Message', desc: 'In the case of a mistake, do you want to display a message to the user?'},
        {name: 'errorCorrection', label: 'Must correct wrong answers', desc: 'In the case of a mistake, the user cannot continue if he didn\'t coreect his answer'},
    ];


    function controller(settings$1){
        var parameters = settings$1.parameters;
        return {reset:reset, clear:clear, set:set, get:get};
        
        function reset(){Object.assign(parameters, settings.parameters);}
        function clear(){Object.assign(parameters, {isTouch:false, isQualtrics:false, fullScreen:false, showDebriefing:false, remindError:false, errorCorrection:false,base_url:''}); }
        function get(name){return parameters[name]; }
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
        //controller:controller,
        view:view$1
    };


    function view$1(ctrl,settings){
        return m('div', [
            m('button.CreateFile', {onclick: createFile(settings)}, 'Download script'),
            m('button.CreateFile', {onclick: createJSONFile(settings)}, 'Download JSON File'),
            m('button.CreateFile', {onclick: toConsole(settings)}, 'Print to Console'),
            //m('button.CreateFile', {onclick: toConsole2(settings)}, 'Print to Console-newSetting')
        ]);
    }



    function createJSONFile(settings){
        return function(){
            var output = updateSettings(settings);
            var textFileAsBlob = new Blob([JSON.stringify(output,null,4)], {type : 'application/json'});
            var downloadLink = document.createElement("a");
            downloadLink.download = "newIAT.json";
            if (window.webkitURL != null) {downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);}
            else {
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick = destroyClickedElement;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
                }
            downloadLink.click();
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState == 4 && this.status == 200) {
                    var myObj = JSON.parse(this.responseText);
                    console.log("data====>",myObj);
                }
            };
            xhttp.open("GET", "src/newIAT (7).json", true);
            //xhttp.open("GET", "jsonExample.json", true);
            xhttp.send();
            }
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
            //console.log(JSON.parse('C:\Users\elinor\COMP167\jsonExample.json'));
            }
    }



    function toConsole(settings){
        return function(){
            window.settings = settings;
            console.log(settings);
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
        Object.assign(output, settings.blocks);
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

    var blocksComponent = {
        controller:controller$2,
        view:view$3
    };

    var rows$2 = [
        {label:'Categories', numTrialBlocks:'blockCategories_nTrials', numMiniBlocks: 'blockCategories_nMiniBlocks'},
        {label:'Attributes', numTrialBlocks:'blockAttributes_nTrials', numMiniBlocks: 'blockAttributes_nMiniBlocks'},
        {label:'First Combined Block', numTrialBlocks:'blockFirstCombined_nTrials', numMiniBlocks: 'blockFirstCombined_nMiniBlocks'},
        {label:'Second Combined Block', numTrialBlocks:'blockSecondCombined_nTrials', numMiniBlocks: 'blockSecondCombined_nMiniBlocks'},
        {label:'Switch Block', numTrialBlocks:'blockSwitch_nTrials', numMiniBlocks: 'blockSwitch_nMiniBlocks'}
    ];

    function controller$2(settings$1){
        var blocks = settings$1.blocks;
        return {reset:reset, clear:clear, set:set, get:get};
        
        function reset(){Object.assign(blocks, settings.blocks);}
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
    function view$3(ctrl){
        return m('.container' , [
            m('table.w3-table w3-bordered', [
                m('tr.border_lines', [
                    m('td'), //for space
                    m('td',[
                        m('button.reset_button', {onclick: ctrl.reset},'Reset'),
                        m('button.reset_button',{onclick: ctrl.clear}, 'Clear'),
                    ])
                ]),
                rows$2.map(function(row) {
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

    var elementComponent = {
        controller:controller$3,
        view:view$4,
    };

    function controller$3(object, settings){
        var element = settings[object.key];
        let fields = {
            newStimulus : m.prop(''),
            elementType: m.prop(object.key.includes("category") ? 'Category' : 'Attribute'),
            titleType: m.prop(element.title.media.word == undefined ? 'image' : 'word'),
            titleHidden: m.prop(this.titleType == 'word'? 'hidden': 'visible'), //weather the category design flags will be visible
            selectedStimuli: m.prop(''),
            stimuliType: m.prop('word'),
            stimuliHidden: m.prop(this.stimuliType == 'word' ? 'hidden' : 'visible')};
        checkStimuliType();    
        return {fields, set:set, get:get, addStimulus:addStimulus, 
            updateSelectedStimuli:updateSelectedStimuli,removeChosenStimuli:removeChosenStimuli, removeAllStimuli:removeAllStimuli, 
            updateTitleType:updateTitleType, checkStimuliType:checkStimuliType};
        
        function get(name,media = null,type = null){ 
            if (name == 'title' && media == null && type == null) { //special case - return the title's value (word/image)
                if (element.title.media.word == undefined) return element.title.media.image;
                else return element.title.media.word;}
            if (media !=null && type!=null) {
                if (type == 'font-size') {
                    return parseFloat((element[name][media][type].replace("em","")));}
                return element[name][media][type];}
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
                            return element[name][media][type]; }
                        else return element[name][media][type] = value + "em";
                    }
                    return element[name][media][type] = value;
                }
                else if (media == 'color') return element[name][media] = value;
                else if (media == 'font-size') {
                    if (value == 0) { 
                        alert("Font's size must be bigger then 0");
                        return element[name][media]; }
                    else return element[name][media] = value + "em";
                }
                else return element[name] = value; }
        }
        function updateTitleType () { 
            return function (value) {
                fields.titleType(value);
                var type = fields.titleType(value); //get the selected type
                var object = element.title.media;
                var category;
                if (object.word != undefined) category = object.word;
                else category = object.image;
                if (type == 'word') {
                    element.title.media = {word: category};
                    fields.titleHidden('visible');}
                else {
                    element.title.media = {image: category};
                    fields.titleHidden('hidden');}
            }
        }
        function checkStimuliType() {
            var stimuli = element['stimulusMedia'];
            var type = 'word';
            var count = 0;
            if (stimuli.length == 0) type = 'image';
            else {
                for (var i = 0; i<stimuli.length; i++) {
                    if (stimuli[i].word == undefined) count = count+1;
                }
            }
            if (count == stimuli.length ) type = 'image'; //if all stimuli are images
            if (type == 'image') fields.stimuliHidden('hidden');
            else fields.stimuliHidden('visible');
            fields.stimuliType(type);
            if (fields.titleType() == 'image') fields.titleHidden('hidden'); //update titleHiddenFlag
            else fields.titleHidden('visible');
        }
        function addStimulus(event){
            var new_stimuli = fields.newStimulus();
            var event = event.path[0].id; //get the button name, to know the kind of the stimulus added
            if(new_stimuli == null || new_stimuli == "") alert("Please fill the stimulus field");
            else {
              if (event == "addWord")
                element.stimulusMedia.push({word : new_stimuli});
              else element.stimulusMedia.push({image : new_stimuli});
              fields.newStimulus(''); //reset the field
              checkStimuliType();}        
        }
        function updateSelectedStimuli(select){
            var list =[];
            for (var i = 0; i < select.target.options.length; i++) {
                if (select.target.options[i].selected) {
                    var temp = select.target.options[i].value;
                    if (temp.includes("[Word]")) temp=temp.replace("[Word]",'').slice(0,-1);
                    else temp=temp.replace("[Image]",'').slice(0,-1);
                    list.push(temp);
                }
            }
            fields.selectedStimuli(list);
        }
        function removeChosenStimuli() {
            var selected = fields.selectedStimuli();
            var stimuli = element.stimulusMedia;
            for (var i = 0; i<selected.length;i++) {
                for (var j=0; j<stimuli.length;j++) {
                    if(stimuli[j].word == undefined) {
                        if (stimuli[j].image == selected[i]) stimuli.splice(j,1);}
                    else if (stimuli[j].word == selected[i]) stimuli.splice(j,1);
                }
            }
            element.stimulusMedia = stimuli;
            checkStimuliType();
        }
        function removeAllStimuli() {
            element.stimulusMedia.length = 0;
            checkStimuliType();
        }
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
                        m('select',{value: ctrl.fields.titleType(), onchange:m.withAttr('value',ctrl.updateTitleType())},[
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
                        m('div',{style: {position: "relative", top: "300px", left: "-2px"}}, [
                        m('i.fa.fa-info-circle', ),
                        m('.card.info-box.card-header', ['To select multiple stimuli, please press the ctrl key while selecting the desired stimuli'])])
                    ]),
                    m('td',[
                        m('br'),
                        m('span',"Enter Stimulus contnet: "),
                        m('br'),
                        m('input[type=text', {style: {width: '15rem'}, pattern: "([A-z0-9À-ž\s]){2,}", value: ctrl.fields.newStimulus(), oninput: m.withAttr("value", ctrl.fields.newStimulus)}),
                        m('br'),
                        m('input[type=button]', {id:"addWord", value: 'Add Word', onclick:ctrl.addStimulus}),
                        m('input[type=button]', {id:"addImage", value: 'Add Image', onclick: ctrl.addStimulus})
                    ]),
                ]),
                m('tr.border_lines',[
                    m('td'),
                    m('td',[
                        m('span',"Stimuli: "),
                        m('br'),
                        m('select', {multiple : "multiple", size : "8" ,style: {width: '15rem'}, onchange: (e) => ctrl.updateSelectedStimuli(e)},[
                            ctrl.get('stimulusMedia').map(function(option){
                                if (option.word == undefined) return m('option', option.image + " [Image]");
                                return m('option', option.word + " [Word]");
                        })
                        ]),
                        m('div',{style: {visibility:ctrl.fields.stimuliHidden(), position: "relative", top: "-170px", left: "255px", marginBottom: "-150px"}},[
                            m('span',"Stimuli font's design:"),m('br'),
                            m('label',"Font color: "),m('br'),
                            m('input[type=color]', {value: ctrl.get('stimulusCss','color'), onchange:m.withAttr('value', ctrl.set('stimulusCss','color'))}),
                            m('br'), m('label', "Font's size:"), m('br'),
                            m('input[type=number]', {value:ctrl.get('stimulusCss','font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set('stimulusCss','font-size'))})
                        ]),
                        m('br'),
                        m('input[type=button]', {value: 'Remove Chosen Stimuli', onclick:ctrl.removeChosenStimuli}),
                        m('input[type=button]', {value: 'Remove All Stimuli', onclick:ctrl.removeAllStimuli}),
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

    function controller$4(settings$1){
        return {reset:reset, clear:clear};
        function reset(){
            Object.assign(settings$1.category1, settings.category1);
            Object.assign(settings$1.category2, settings.category2);}
        function clear(){
            Object.assign(settings$1.category1, {name: "", title: {media: {image: ""}, css: {color: '#000000', 'font-size': '0em'}, height: 4}, 
            stimulusMedia: [],
            stimulusCss : {color:'#000000', 'font-size':'0em'}});
            Object.assign(settings$1.category2, {name: "", title: {media: {image: ""}, css: {color: '#000000', 'font-size': '0em'}, height: 4}, 
            stimulusMedia: [],
            stimulusCss : {color:'#000000', 'font-size':'0em'}});
        }
    }

    function view$5(ctrl,settings) {
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
            m.component(elementComponent, {key: "category1"} ,settings),
            m('h1.categoryHeadline',"Second Category"),
            m.component(elementComponent, {key:"category2"}, settings)
        ])
    }

    var attributesComponent = {
        controller:controller$5,
        view:view$6
    };

    function controller$5(settings$1){
        return {reset:reset, clear:clear};
        function reset(){
            Object.assign(settings$1.attribute1, settings.category1);
            Object.assign(settings$1.attribute2, settings.category2);}
        function clear(){
            Object.assign(settings$1.attribute1, {name: "", title: {media: {image: ""}, css: {color: '#000000', 'font-size': '0em'}, height: 4}, 
            stimulusMedia: [],
            stimulusCss : {color:'#000000', 'font-size':'0em'}});
            Object.assign(settings$1.attribute2, {name: "", title: {media: {image: ""}, css: {color: '#000000', 'font-size': '0em'}, height: 4}, 
            stimulusMedia: [],
            stimulusCss : {color:'#000000', 'font-size':'0em'}});
        }
    }

    function view$6(ctrl,settings) {
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
            m.component(elementComponent,{key: "attribute1"} ,settings),
            m('h1.categoryHeadline',"Second Attribute"),
            m.component(elementComponent,{key:"attribute2"}, settings)
        ])
    }

    var importComponent = {
        controller:controller$6,
        view:view$7
    };

    function view$7(ctrl){
        return m('div.uploadDiv', [
            m('i.fa.fa-info-circle', {style: {padding: '5px'}}),
            m('.card.info-box.card-header', ["You can upload a JSON file and update it's contnet through the editor and then download a new one"]),
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
            console.log("from file", fileContent);
            console.log("settings", settings);
            updateSettings(fileContent);
            };
            reader.onerror = function() {
                console.log(reader.error);
            };
        }
        function updateSettings(input) {
            settings.category1 = input.category1;
            settings.category2 = input.category2;
            settings.attribute1 = input.attribute1;
            settings.attribute2 = input.attribute2;
            settings.parameters.base_url = input.base_url;
            settings.parameters.remindError = input.remindError;
            settings.parameters.errorCorrection;
            if(input.isQualtrics){
                settings.parameters.isQualtrics = input.isQualtrics;
                settings.parameters.showDebriefing = input.showDebriefing;
                settings.parameters.fullscreen = input.fullscreen;
                settings.parameters.isTouch = input.isTouch;
            }
            Object.assign(settings.blocks, input.blockParameters);
            Object.assign(settings.text, input.text);

            //console.log("after UPDATE", settings);
        }
    }

    var components = {
    	import: importComponent,
        parameters: parametersComponent,
    	text:TextComponent,
    	output: outputComponent,
    	blocks: blocksComponent,
    	categories: categoriesComponent,
    	attributes: attributesComponent
    };

    var tabs = [
    	{value: 'parameters', text: 'Task parameters'},
    	{value: 'blocks', text: 'Block parameters'},
    	{value: 'categories', text: 'Categories'},
    	{value: 'attributes', text: 'Attributes'},
    	{value: 'text', text: 'Text'},
    	{value: 'output', text: 'Output'},
    	{value: 'import', text: 'Import'}
    ];

    var tabsComponent = {
        controller: function(){
            // set default tab
            return { tab: 'parameters' }
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
