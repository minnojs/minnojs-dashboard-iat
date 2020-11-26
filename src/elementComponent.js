
var elementComponent = {
    controller:controller,
    view:view,
};

function controller(object, settings){
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

function view(ctrl) {
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

};

export default elementComponent;

