/**
* @preserve minnojs-amp-dashboard v1.0.0
* @license Apache-2.0 (2021)
*/

(function () {
	'use strict';

	var tabsComponent = {
	    controller: function(tabs){
			var tab = tabs[0].value; // set default tab
			var index = setIndex(tab);
			return {tab, index, setIndex};
			function setIndex(tab){ return tabs.findIndex((element) => (element.value == tab));}
	    },
		view: function(ctrl, tabs, settings, defaultSettings){
			return m('.container', [
				m('.tab', tabs.map(function(tab){
					if (tab.value == 'practice'){
						if(settings.parameters.practiceBlock == false) return null;
					}
					return m('button',{
	                    class: ctrl.tab == tab.value ? 'active' : '',
	                    onclick:function(){
							ctrl.tab = tab.value;
							ctrl.index = ctrl.setIndex(tab.value);
						}},tab.text);
				})),
				m('.div',{key:tabs[ctrl.index].value}, 
					m.component(tabs[ctrl.index].component, settings, defaultSettings, tabs[ctrl.index].rowsDesc, tabs[ctrl.index].subTabs, tabs[ctrl.index].type))
			]);
		}
	};

	let settings = {
	    parameters : {isQualtrics:false, targetCat : 'Chinese symbol', primeDuration: 100, fixationDuration:0, postPrimeDuration : 100, targetDuration : 100, showRatingDuration : 300, responses : 2,
	    sortingLabel1 : 'Pleasant', //Response is coded as 0. 
	    sortingLabel2 : 'Unpleasant',  //Response is coded as 1.
	    randomizeLabelSides : false, //IF false, then label1 is on the left, and label2 is on the right.
	    rightKey : 'i', 
	    leftKey : 'e', 
	    fixationStimulus : { //The fixation stimulus 
	        css : {color:'#000000', 'font-size':'3em'}, 
	        media : {word:'+'}
	    },  
	    maskStimulus : { //The mask stimulus 
	        css : {color:'000000', 'font-size':'3em'}, 
	        media : {image:'ampmask.jpg'}
	    }, 
	    base_url: {image: 'https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/docs/images/'}
	    },
	    exampleBlock:{
	        exampleTargetStimulus : 
	        {
	            nameForLogging : 'exampleTarget', //Will be used in the logging
	            sameAsTargets : true //Use the same media array as the first targetCat.
	        },
	        exampleFixationStimulus : { //The fixation stimulus in the example block
	            css : {color:'000000', 'font-size':'3em'}, 
	            media : {word:'+'}
	        }, 
	        exampleMaskStimulus : { //The mask stimulus in the example block
	            css : {color:'000000', 'font-size':'3em'}, 
	            media : {image:'ampmaskr.jpg'}
	        }, 
	        exampleBlock_fixationDuration : -1, 
	        exampleBlock_primeDuration : 100, 
	        exampleBlock_postPrimeDuration : 100, 
	        exampleBlock_targetDuration : 300, 
	    },
	    primeStimulusCSS : {color:'#0000FF','font-size':'2.3em'}, //The CSS for all the prime stimuli.
	    primeCats :  [
	        {
	            nameForFeedback : 'positive words',  //Will be used in the user feedback 
	            nameForLogging : 'positive', //Will be used in the logging
	            //An array of all media objects for this category.
	            mediaArray : [{word : 'Wonderful'}, {word : 'Great'}]
	        }, 
	        {
	            nameForFeedback : 'negative words',  //Will be used in the user feedback 
	            nameForLogging : 'negative', //Will be used in the logging
	            mediaArray : [{word : 'Awful'}, {word : 'Horrible'}]
	        }
	    ],
	    examplePrimeStimulus : {
	        nameForLogging : 'examplePrime', //Will be used in the logging
	        //An array of all media objects for this category.
	        mediaArray : [{word : 'Table'}, {word : 'Chair'}]
	    },
	    targetStimulusCSS : {color:'#0000FF','font-size':'2.3em'}, //The CSS for all the target stimuli (usually irrelevant because the targets are Chinese pictographs.
	    //The prime categories.
	    targetCats :  [
	        {
	            nameForLogging : 'chinese',  //Will be used in the logging
	            //An array of all media objects for this category. The default is pic1-pic200.jpg
	            mediaArray : [
	                {image : 'pic1.jpg'}, {image : 'pic2.jpg'}, {image : 'pic3.jpg'}, {image : 'pic4.jpg'}, {image : 'pic5.jpg'}, {image : 'pic6.jpg'}, {image : 'pic7.jpg'}, {image : 'pic8.jpg'}, {image : 'pic9.jpg'}, 
	                {image : 'pic10.jpg'}, {image : 'pic11.jpg'}, {image : 'pic12.jpg'}, {image : 'pic13.jpg'}, {image : 'pic14.jpg'}, {image : 'pic15.jpg'}, {image : 'pic16.jpg'}, {image : 'pic17.jpg'}, {image : 'pic18.jpg'}, {image : 'pic19.jpg'}, 
	                {image : 'pic20.jpg'}, {image : 'pic21.jpg'}, {image : 'pic22.jpg'}, {image : 'pic23.jpg'}, {image : 'pic24.jpg'}, {image : 'pic25.jpg'}, {image : 'pic26.jpg'}, {image : 'pic27.jpg'}, {image : 'pic28.jpg'}, {image : 'pic29.jpg'}, 
	                {image : 'pic30.jpg'}, {image : 'pic31.jpg'}, {image : 'pic32.jpg'}, {image : 'pic33.jpg'}, {image : 'pic34.jpg'}, {image : 'pic35.jpg'}, {image : 'pic36.jpg'}, {image : 'pic37.jpg'}, {image : 'pic38.jpg'}, {image : 'pic39.jpg'}, 
	                {image : 'pic40.jpg'}, {image : 'pic41.jpg'}, {image : 'pic42.jpg'}, {image : 'pic43.jpg'}, {image : 'pic44.jpg'}, {image : 'pic45.jpg'}, {image : 'pic46.jpg'}, {image : 'pic47.jpg'}, {image : 'pic48.jpg'}, {image : 'pic49.jpg'}, 
	                {image : 'pic50.jpg'}, {image : 'pic51.jpg'}, {image : 'pic52.jpg'}, {image : 'pic53.jpg'}, {image : 'pic54.jpg'}, {image : 'pic55.jpg'}, {image : 'pic56.jpg'}, {image : 'pic57.jpg'}, {image : 'pic58.jpg'}, {image : 'pic59.jpg'}, 
	                {image : 'pic60.jpg'}, {image : 'pic61.jpg'}, {image : 'pic62.jpg'}, {image : 'pic63.jpg'}, {image : 'pic64.jpg'}, {image : 'pic65.jpg'}, {image : 'pic66.jpg'}, {image : 'pic67.jpg'}, {image : 'pic68.jpg'}, {image : 'pic69.jpg'}, 
	                {image : 'pic70.jpg'}, {image : 'pic71.jpg'}, {image : 'pic72.jpg'}, {image : 'pic73.jpg'}, {image : 'pic74.jpg'}, {image : 'pic75.jpg'}, {image : 'pic76.jpg'}, {image : 'pic77.jpg'}, {image : 'pic78.jpg'}, {image : 'pic79.jpg'}, 
	                {image : 'pic80.jpg'}, {image : 'pic81.jpg'}, {image : 'pic82.jpg'}, {image : 'pic83.jpg'}, {image : 'pic84.jpg'}, {image : 'pic85.jpg'}, {image : 'pic86.jpg'}, {image : 'pic87.jpg'}, {image : 'pic88.jpg'}, {image : 'pic89.jpg'}, 
	                {image : 'pic90.jpg'}, {image : 'pic91.jpg'}, {image : 'pic92.jpg'}, {image : 'pic93.jpg'}, {image : 'pic94.jpg'}, {image : 'pic95.jpg'}, {image : 'pic96.jpg'}, {image : 'pic97.jpg'}, {image : 'pic98.jpg'}, {image : 'pic99.jpg'}, 
	                {image : 'pic110.jpg'}, {image : 'pic111.jpg'}, {image : 'pic112.jpg'}, {image : 'pic113.jpg'}, {image : 'pic114.jpg'}, {image : 'pic115.jpg'}, {image : 'pic116.jpg'}, {image : 'pic117.jpg'}, {image : 'pic118.jpg'}, {image : 'pic119.jpg'}, 
	                {image : 'pic120.jpg'}, {image : 'pic121.jpg'}, {image : 'pic122.jpg'}, {image : 'pic123.jpg'}, {image : 'pic124.jpg'}, {image : 'pic125.jpg'}, {image : 'pic126.jpg'}, {image : 'pic127.jpg'}, {image : 'pic128.jpg'}, {image : 'pic129.jpg'}, 
	                {image : 'pic130.jpg'}, {image : 'pic131.jpg'}, {image : 'pic132.jpg'}, {image : 'pic133.jpg'}, {image : 'pic134.jpg'}, {image : 'pic135.jpg'}, {image : 'pic136.jpg'}, {image : 'pic137.jpg'}, {image : 'pic138.jpg'}, {image : 'pic139.jpg'}, 
	                {image : 'pic140.jpg'}, {image : 'pic141.jpg'}, {image : 'pic142.jpg'}, {image : 'pic143.jpg'}, {image : 'pic144.jpg'}, {image : 'pic145.jpg'}, {image : 'pic146.jpg'}, {image : 'pic147.jpg'}, {image : 'pic148.jpg'}, {image : 'pic149.jpg'}, 
	                {image : 'pic150.jpg'}, {image : 'pic151.jpg'}, {image : 'pic152.jpg'}, {image : 'pic153.jpg'}, {image : 'pic154.jpg'}, {image : 'pic155.jpg'}, {image : 'pic156.jpg'}, {image : 'pic157.jpg'}, {image : 'pic158.jpg'}, {image : 'pic159.jpg'}, 
	                {image : 'pic160.jpg'}, {image : 'pic161.jpg'}, {image : 'pic162.jpg'}, {image : 'pic163.jpg'}, {image : 'pic164.jpg'}, {image : 'pic165.jpg'}, {image : 'pic166.jpg'}, {image : 'pic167.jpg'}, {image : 'pic168.jpg'}, {image : 'pic169.jpg'}, 
	                {image : 'pic170.jpg'}, {image : 'pic171.jpg'}, {image : 'pic172.jpg'}, {image : 'pic173.jpg'}, {image : 'pic174.jpg'}, {image : 'pic175.jpg'}, {image : 'pic176.jpg'}, {image : 'pic177.jpg'}, {image : 'pic178.jpg'}, {image : 'pic179.jpg'}, 
	                {image : 'pic180.jpg'}, {image : 'pic181.jpg'}, {image : 'pic182.jpg'}, {image : 'pic183.jpg'}, {image : 'pic184.jpg'}, {image : 'pic185.jpg'}, {image : 'pic186.jpg'}, {image : 'pic187.jpg'}, {image : 'pic188.jpg'}, {image : 'pic189.jpg'}, 
	                {image : 'pic190.jpg'}, {image : 'pic191.jpg'}, {image : 'pic192.jpg'}, {image : 'pic193.jpg'}, {image : 'pic194.jpg'}, {image : 'pic195.jpg'}, {image : 'pic196.jpg'}, {image : 'pic197.jpg'}, {image : 'pic198.jpg'}, {image : 'pic199.jpg'}, 
	                {image : 'pic200.jpg'}
	            ]
	        }
	    ],
	    blocks: {trialsInBlock : [40, 40, 40], trialsInExample : 3,
	    },
	    text: { //Instructions text for the 2-responses version.
	        exampleBlockInst: '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
	        'Press the key <B>rightKey</B> if the targetCat is more rightAttribute than average. ' + 
	        'Hit the <b>leftKey</b> key if it is more leftAttribute than average.<br/><br/>' + 
	        'The items appear and disappear quickly.  ' + 
	        'Remember to ignore the item that appears before the targetCat and evaluate only the targetCat.<br/><br/></p>'  + 
	        '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' + 
	        'When you are ready to try a few practice responses, hit the <b>space bar</b>.</p>' + 
	        '<p style="font-size:12px; text-align:center; font-family:arial">' + 
	        '<color="000000">[Round 1 of nBlocks]</p></div>',
	        firstBlockInst : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
	        "See how fast it is? Don't worry if you miss some. " + 
	        'Go with your gut feelings.<br/><br/>' + 
	        'Concentrate on each targetCat and rate it as more rightAttribute than the average targetCat with the <b>rightKey</b> key, ' + 
	        'or more leftAttribute than average with the <b>leftKey</b> key.<br/><br/>' + 
	        'Evaluate each targetCat and not the item that appears before it. ' + 
	        'Those items are sometimes distracting.<br/><br/>' + 
	        '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' + 
	        'Ready? Hit the <b>space bar</b>.</p>' + 
	        '<p style="font-size:12px; text-align:center; font-family:arial">' + 
	        '<color="000000">[Round 2 of nBlocks]</p></div>',
	        middleBlockInst : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
	        'Continue to another round of this task. ' + 
	        'The rules are exactly the same:<br/><br/>' + 
	        'Concentrate on the targetCat and rate it as more rightAttribute than average with the <b>rightKey</b> key, ' + 
	        'or more leftAttribute than average with the <b>leftKey</b> key.<br/><br/>' + 
	        'Evaluate each targetCat and not the item that appears before it. ' + 
	        'Those items are sometimes distracting. Go with your gut feelings.<br/><br/>' + 
	        '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' + 
	        'Ready? Hit the <b>space bar</b>.</p>' + 
	        '<p style="font-size:12px; text-align:center; font-family:arial">' + 
	        '<color="000000">[Round blockNum of nBlocks]</p></div>',
	        lastBlockInst : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
	        'Ready for the FINAL round? ' + 
	        'The rules are exactly the same:<br/><br/>' + 
	        'Concentrate on the targetCat and rate it as more rightAttribute than average with the <b>rightKey</b> key, ' + 
	        'or more leftAttribute than average with the <b>leftKey</b> key.<br/><br/>' + 
	        'Evaluate each targetCat and not the item that appears before it. ' + 
	        'Those items are sometimes distracting. Go with your gut feelings.<br/><br/>' + 
	        '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' + 
	        'Ready? Hit the <b>space bar</b>.</p>' + 
	        '<p style="font-size:12px; text-align:center; font-family:arial">' + 
	        '<color="000000">[Round blockNum of nBlocks]</p></div>',
	        endText: '<div><p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial"><color="FFFFFF">'+
	        'You have completed the task<br/><br/>Press "space" to continue to next task.</p></div>',
	    },
	    text_seven:{ //Instructions text for the 7-responses version.
	        exampleBlockInst7: '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
	        'Rate your feelings toward the targetCats from <i>Extremely negativeAdj</i> to <i>Extremely positiveAdj</i>. ' + 
	        'The items appear and disappear quickly.  ' + 
	        'Remember to ignore the item that appears before the targetCat and evaluate only the targetCat.<br/><br/></p>'  + 
	        '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' + 
	        'When you are ready to try a few practice responses, hit the <b>space bar</b>.</p>' + 
	        '<p style="font-size:12px; text-align:center; font-family:arial">' + 
	        '<color="000000">[Round 1 of nBlocks]</p></div>',
	        firstBlockInst7 : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
	        "See how fast it is? Don't worry if you miss some. " + 
	        'Go with your gut feelings.<br/><br/>' + 
	        'Concentrate on each targetCat and rate it based on your own feelings. ' + 
	        'Evaluate each targetCat and not the item that appears before it. ' + 
	        'Those items are sometimes distracting.<br/><br/>' + 
	        'Notice: you can respond with your mouse or the keys 1-7.<br/><br/>' + 
	        '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' + 
	        'Ready? Hit the <b>space bar</b>.</p>' + 
	        '<p style="font-size:12px; text-align:center; font-family:arial">' + 
	        '<color="000000">[Round 2 of nBlocks]</p></div>',
	        middleBlockInst7 : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
	        'Continue to another round of this task. ' + 
	        'The rules are exactly the same:<br/><br/>' + 
	        'Concentrate on each targetCat and rate it based on your own feelings. ' + 
	        'Evaluate each targetCat and not the item that appears before it. ' + 
	        'Those items are sometimes distracting.<br/><br/>' + 
	        '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' + 
	        'Ready? Hit the <b>space bar</b>.</p>' + 
	        '<p style="font-size:12px; text-align:center; font-family:arial">' + 
	        '<color="000000">[Round blockNum of nBlocks]</p></div>',
	        lastBlockInst7 : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial"><color="000000"><br/>' + 
	        'Ready for the FINAL round? ' + 
	        'The rules are exactly the same:<br/><br/>' + 
	        'Concentrate on each targetCat and rate it based on your own feelings. ' + 
	        'Evaluate each targetCat and not the item that appears before it. ' + 
	        'Those items are sometimes distracting.<br/><br/>' + 
	        '<p style="font-size:16px; text-align:center; font-family:arial"><color="000000"><br/><br/>' + 
	        'Ready? Hit the <b>space bar</b>.</p>' + 
	        '<p style="font-size:12px; text-align:center; font-family:arial">' + 
	        '<color="000000">[Round blockNum of nBlocks]</p></div>',
	        endText: '<div><p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial"><color="FFFFFF">'+
	        'You have completed the task<br/><br/>Press "space" to continue to next task.</p></div>', 
	    }
	};

	function clone(obj){
	    return JSON.parse(JSON.stringify(obj));
	}

	function showClearOrReset(element, value, action){
	    let msg_text = {
	        'reset':'This will delete all current properties and reset them to default values.',
	        'clear':'This will delete all current properties.'
	    };
	    swal({
	        title: "Are you sure?",
	        text: msg_text[action],
	        icon: "warning",
	        buttons: true,
	        dangerMode: true,
	      })
	      .then((willDelete) => {
	        if (willDelete) {
	            Object.assign(element, clone(value));
	            m.redraw();
	        } 
	      }).catch((error) =>{
	        swal("Oops!", "Something went wrong on the page!\n"+error, "error");
	      });
	}

	function showRestrictions(text, icon = 'warning', title = ''){
	    swal({
	        title: title,
	        text:text,
	        icon: icon,
	        button: 'Got it',
	      });
	}

	var parametersComponent = {
	    controller:controller,
	    view:view
	};

	function controller(settings, defaultSettings, rows){
	    var parameters = settings.parameters;
	    var qualtricsParameters = ['leftKey', 'rightKey', 'fullscreen', 'showDebriefing'];
	    return {reset, clear, set, get, rows, qualtricsParameters};
	    
	    function reset(){showClearOrReset(parameters, defaultSettings.parameters, 'reset');}
	    function clear(){showClearOrReset(parameters, rows.slice(-1)[0],'clear');}    
	    function get(name, object, parameter){
	        if(name == 'base_url') 
	            return parameters[name][object]
	        if (name == 'isTouch')
	            if(parameters[name] == true) return 'Touch' 
	            else return 'Keyboard';
	        if (name == 'isQualtrics')
	            if (parameters[name] == true){return 'Qualtrics'}
	            else return 'Regular';
	        if(object && parameter){
	            if (parameter == 'font-size')
	                return parseFloat((parameters[name][object][parameter].replace("em","")));
	            return parameters[name][object][parameter]
	        }
	        return parameters[name];
	    }
	    function set(name, object, parameter){
	        return function(value){ 
	            if(name === 'base_url')
	                return parameters[name][object] = value
	            if (name == 'isTouch')
	                if(value == 'Keyboard') return parameters[name] = false;
	                else return parameters[name] = true;
	            if (name == 'isQualtrics')
	                if (value == 'Regular') return parameters[name] = false;
	                else return parameters[name] = true;
	            if(name.includes('Duration')) return parameters[name] = Math.abs(value)
	            if(object && parameter) {
	                if (parameter === 'font-size'){
	                    value = Math.abs(value);
	                    if (value === 0){ 
	                        showRestrictions('Font\'s size must be bigger than 0.', 'error');
	                        return parameters[name][object][parameter]; 
	                    }
	                    return parameters[name][object][parameter] = value + "em";
	                }
	                return parameters[name][object][parameter] = value
	            }
	            return parameters[name] = value; 
	    }}
	}

	function view(ctrl, settings){
	    return m('.container' , [
	        ctrl.rows.slice(0,-1).map((row) => {

	            if(!ctrl.get('responses')) //check if the mesuare is AMP which has keys parametes on both regular and qualtrics versions
	                if((ctrl.qualtricsParameters.includes(row.name)) && ctrl.get('isQualtrics') === 'Regular') return;
	            if(settings.parameters.isTouch && row.name.toLowerCase().includes('key')) return;
	            if(ctrl.get('responses') === 2 && row.name ==='showRatingDuration') return; //amp, show this only if responses is 7.
	            
	            return m('.row.space.line', [
	                    m('.col-xs-1.space',[
	                        m('i.fa.fa-info-circle'),
	                        m('.card.info-box.card-header', [row.desc])
	                    ]),
	                    m('.col-3.space', row.label),
	                    row.name.toLowerCase().includes('key') ? //case of keys parameters
	                        m('.col-8.space',
	                            m('input[type=text].form-control',{style: {width:'3rem'}, value:ctrl.get(row.name), onchange:m.withAttr('value', ctrl.set(row.name))}))                    
	                    : row.options ? //case of isTouch and isQualtrics
	                        m('.col-8.space',
	                            m('select.form-control',{value: ctrl.get(row.name), onchange:m.withAttr('value',ctrl.set(row.name)), style: {width: '8.3rem', height:'2.8rem'}},[
	                                row.options.map(function(option){return m('option', option);})
	                        ]))
	                    : row.name.includes('Duration') ? //case of duration parameter
	                        m('.col-8.space',
	                            m('input[type=number].form-control',{min:0, style: {width:'5rem'}, value:ctrl.get(row.name), onchange:m.withAttr('value', ctrl.set(row.name))})) 
	                    : (row.name === 'fixationStimulus') ||  (row.name === 'deadlineStimulus' || row.name === 'maskStimulus') ?
	                        m('.col-8.space',[
	                            m('.row',[
	                                m('.col',[
	                                    m('span', 'Font\'s color: '),
	                                    m('input[type=color]', {style: {'border-radius':'3px', 'margin-left':'0.3rem'}, value: ctrl.get(row.name,'css','color'), onchange:m.withAttr('value', ctrl.set(row.name,'css','color'))})
	                                ])
	                            ]),m('br'),
	                            m('.row',[
	                                m('.col',[
	                                    m('span', 'Font\'s size: '),
	                                    m('input[type=number]', {style: {'border-radius':'4px','border':'1px solid #E2E3E2', 'margin-left':'0.3rem'}, value:ctrl.get(row.name,'css','font-size') ,min: '0' ,onchange:m.withAttr('value', ctrl.set(row.name,'css','font-size'))})
	                                ])
	                            ]),m('br'),
	                            m('.row',[
	                                m('.col',[
	                                    m('span', 'Text: '),
	                                    row.name !== 'maskStimulus' ? m('input[type=text]', {style: {'border-radius':'3px','border':'1px solid #E2E3E2',height:'2.5rem',width:'15rem', 'margin-left':'0.3rem'}, value:ctrl.get(row.name,'media','word') ,onchange:m.withAttr('value', ctrl.set(row.name,'media','word'))})
	                                    : m('input[type=text]', {style: {'border-radius':'3px','border':'1px solid #E2E3E2',height:'2.5rem',width:'15rem', 'margin-left':'0.3rem'}, value:ctrl.get(row.name,'media','image') ,onchange:m.withAttr('value', ctrl.set(row.name,'media','image'))})
	                                ])
	                            ])
	                        ])
	                    : (row.name === 'sortingLabel1' || row.name === 'sortingLabel2' || row.name === 'targetCat') ?
	                        m('.col-8.space',
	                            m('input[type=text]', {style: {'border-radius':'3px','border':'1px solid #E2E3E2',height:'2.5rem',width:'15rem'}, value:ctrl.get(row.name) ,onchange:m.withAttr('value', ctrl.set(row.name))}))
	                    : m('.col-8.space',
	                            m('input[type=checkbox]', {onclick: m.withAttr('checked', ctrl.set(row.name)), checked: ctrl.get(row.name)}))
	                    ])
	        }),
	        m('.row.space.line', [
	            m('.col-xs-1.space',[
	                m('i.fa.fa-info-circle'),
	                m('.card.info-box.card-header', ['If your task has any images, enter here the path to that images folder. It can be a full url, or a relative URL to the folder that will host this script'])
	            ]),
	            m('.col-3.space', 'Image\'s URL'),
	            m('.col-8 param-buffer',
	                m('input[type=text].form-control',{style: {width: '30rem'}, value:ctrl.get('base_url','image'), onchange:m.withAttr('value', ctrl.set('base_url','image'))})
	            )
	            ]),
	        m('.row.space',[
	            m('.col',{style:{'margin-bottom':'7px'}},[
	                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
	                    m('button.btn btn-secondary', 
	                        {title:'Reset all current fields to default values', onclick: () => ctrl.reset()},
	                        m('i.fas fa-undo fa-sm'), ' Reset'),
	                    m('button.btn btn-danger',
	                        {title:'Clears all current values',onclick:() => ctrl.clear()},
	                        m('i.far fa-trash-alt fa-sm'), ' Clear')
	                ])
	            ])
	        ])
	    ])
	}

	let blocksComponent = {
	    controller:controller$1,
	    view:view$1
	};

	function controller$1(settings, defaultSettings, rows){
	    let blocks = settings.blocks;
	    return {set, get, rows, reset, clear};
	    
	    function reset(){showClearOrReset(blocks, defaultSettings.blocks, 'reset');}
	    function clear(){showClearOrReset(blocks, rows.slice(-1)[0], 'clear');}
	    function get(name){return blocks[name];}
	    function set(name, type){ 
	        if (type === 'number') return function(value){return blocks[name] = Math.abs(Math.round(value));};
	        return function(value){return blocks[name] = value;};
	    }
	}
	function view$1(ctrl, settings){
	    return m('.container' , [
	        //create numbers inputs
	        m('.row.space.line', [
	            m('.col-xs-1.space',[
	                m('i.fa.fa-info-circle'),
	                m('.card.info-box.card-header', ['Change to 0 if you don\'t want an example block'])
	            ]),
	            m('.col-3.space', 'Trials In Example Block'),
	            m('.col-8.space',
	                m('input[type=number].form-control',{style:{width:'4em'},onchange: m.withAttr('value', ctrl.set('trialsInExample', 'number')), value: ctrl.get('trialsInExample'), min:0}))
	        ]),
	        // ctrl.rows.slice(0,-1).map(function(row){
	        //     if(!row.options){
	        //         return m('.row.space.line', [
	        //             m('.col-xs-1.space',[
	        //                 m('i.fa.fa-info-circle'),
	        //                 m('.card.info-box.card-header', [row.desc])
	        //             ]),
	        //             m('.col-3.space', row.label),
	        //             m('.col-8.space',
	        //                 m('input[type=number].form-control',{style:{width:'4em'},onchange: m.withAttr('value', ctrl.set(row.name, 'number')), value: ctrl.get(row.name), min:0}))
	        //         ]);
	        //     }
	        //     else{
	        //         return m('.row.space.line', [
	        //             m('.col-xs-1.space',[
	        //                 m('i.fa.fa-info-circle'),
	        //                 m('.card.info-box.card-header', [row.desc])
	        //             ]),
	        //             m('.col-3.space', row.label),
	        //             m('.col-8.space',
	        //                 m('select.form-control',{value: ctrl.get(row.name), onchange:m.withAttr('value',ctrl.set(row.name)), style: {width: '8.3rem'}},[
	        //                     row.options.map(function(option){return m('option', option);})
	        //                 ]))
	        //         ]);
	        //     }
	        // }),
	        m('.row.space',[
	            m('.col',{style:{'margin-bottom':'7px'}},[
	                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
	                    m('button.btn btn-secondary', 
	                        {title:'Reset all current fields to default values', onclick: () => ctrl.reset()},
	                        m('i.fas fa-undo fa-sm'), ' Reset'),
	                    m('button.btn btn-danger',
	                        {title:'Clears all current values',onclick:() => ctrl.clear()},
	                        m('i.far fa-trash-alt fa-sm'), ' Clear')
	                ])
	            ])
	        ])
	    ]);
	}

	let links = {IAT: 'https://minnojs.github.io/minnojs-blog/qualtrics-iat/', 
		BIAT: 'https://minnojs.github.io/minnojs-blog/qualtrics-biat/',
		STIAT: 'https://minnojs.github.io/minnojs-blog/qualtrics-stiat/',
		SPF: '#',
		EP: 'https://minnojs.github.io/minnojs-blog/qualtrics-priming/',
		AMP:'https://minnojs.github.io/minnojs-blog/qualtrics-amp/'
	};

	let helpComponent = {
		view: function(ctrl, settings, defaultSettings, type){
			return m('.container', [
				m('.card card-body', 
				m('span', 'This tool creates a script for running an '+type+
				' in your online study. The script uses Project Implicit’s '+type+
				' extension, which runs on MinnoJS, a JavaScript player for online studies. ', 
				m('a',{href: 'http://projectimplicit.net/'}, 
				'Project Implicit '), 'has developed MinnoJS to program web studies. To create '+type+
				's, we programmed a general script (the “extension”) that runs an '+type+
				' based on parameters provided by another, more simple script. In this page, you can create a script that uses our '+type+
				' extension. You can read more about the basic idea of using extensions in Minno ', 
				m('a',{href: 'https://github.com/baranan/minno-tasks/blob/master/implicitmeasures.md'}, 'on this page. '), 'We run those scripts in ', 
				m('a',{href: 'https://minnojs.github.io/docsite/minnosuitedashboard/'}, 'Open Minno Suite, '), 
				'our platform for running web studies. You can install that platform on your own server, use a more simple ', 
				m('a',{href: 'https://minnojs.github.io/minnojs-blog/csv-server/'}, 'php server for Minno, '), 'or run ', 
				m('a',{href: links[type]}, 'this script directly from Qualtrics.')
				))]);}
	};

	let parametersDesc = [
	    {name: 'isQualtrics',options:['Regular','Qualtrics'], label:'Regular script or Qualtrics?', desc: ['If you want this IAT to run from Qualtrics, read ', m('a',{href: 'https://minnojs.github.io/minnojs-blog/qualtrics-iat/'}, 'this blog post '),'to see how.']},
	    {name: 'responses', label: 'Number of responses options', options:[2,7], desc: 'Change to 7 for a 1-7 rating'},
	    {name: 'leftKey', label: 'Left Key', desc: 'Change the left key'},
	    {name: 'rightKey', label: 'Right Key', desc: 'Change the right key'},
	    {name: 'sortingLabel1', label: 'First Sorting Label',desc: 'Response is coded as 0.'},
	    {name: 'sortingLabel2', label: 'Second Sorting Label', desc: 'Response is coded as 1. '},
	    {name: 'randomizeLabelSides',label:'Randomize Label Sides', desc: 'If false, then label1 is on the left, and label2 is on the right.'},
	    {name: 'primeDuration', label: 'Prime Duration', desc: 'Default prime duration'},
	    {name: 'maskStimulus', label: 'Mask Stimulus', desc: 'The mask stimulus '},
	    {name: 'fixationDuration', label: 'Fixation Duration', desc: 'No fixation by default'},
	    {name: 'fixationStimulus', label: 'Fixation Stimulus', desc: 'Change the fixation stimulus here'},
	    {name: 'postPrimeDuration', label: 'Post Prime Duration', desc: 'Duration of blank screen between prime and target.'},
	    {name: 'targetDuration', label: 'Target Duration', desc: 'Duration of target presentation.'},
	    {name: 'targetCat', label: 'Target Category', desc: 'The name of the targets (used in the instructions).'},
	    {name: 'showRatingDuration', label: 'Show Rating Duration ', desc: 'In the 7-responses option, for how long to show the selected rating.'},
	    {isTouch:false, separateStimulusSelection:0, primeDuration:0, fixationDuration:0 ,deadlineDuration:0, deadlineMsgDuration:0, base_url:{regular:{image:''}, qualtrics:{image:''}}}
	];

	let blocksDesc = [
	    {name: 'trialsInExample', label: 'Number of trials in example block', desc: 'Change to 0 if you don\'t want an example block'},
	    {name: 'trialsInBlock', label: 'Number of trials in a block', desc: 'Number of trials in each block'},
	    {trialsInExample: 0, trialsInBlock: [0,0,0]}
	];

	let tabs = [
	    {value: 'parameters', text: 'General parameters', component: parametersComponent, rowsDesc: parametersDesc },
	    {value: 'blocks', text: 'Blocks', component: blocksComponent, rowsDesc: blocksDesc},
	    // {value: 'prime', text: 'Prime Categories', component: categoriesComponent, rowsDesc: primeClear, subTabs:primesTabs, type: 'EP'},
	    // {value: 'categories', text: 'Target Categories', component: categoriesComponent, rowsDesc: categoryClear, subTabs:categoriesTabs},
	    // {value: 'text', text: 'Texts', component: textComponent, rowsDesc: textDesc},
	    // {value: 'output', text: 'Complete', component: outputComponent},
	    // {value: 'import', text: 'Import', component: importComponent},
	    {value: 'help', text: 'Help', component: helpComponent, rowsDesc:'AMP'}
	];

	let biat = {
	    controller: function(settings$1){
	        return {settings: settings$1 ? settings$1 : clone(settings)};
	    },
	    view: function(ctrl){
	        return m('.container', 
	            m('.header.p-3 mb-2 bg-info text-white', {style:{'background-color': 'coral'}},
	                m('h1.display-4', 'Create my AMP script')),
	            m.component(tabsComponent, tabs, ctrl.settings, settings)
	        );
	    }
	};

	m.mount(document.getElementById('dashboard'), biat);

}());
//# sourceMappingURL=amp_index.js.map
