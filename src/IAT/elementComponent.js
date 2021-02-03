
var elementComponent = {
    controller:controller,
    view:view,
};

function controller(object,settings, stimuliList){
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
                element.title.media = {}
                element.title.media = {word: category};
            }
            else {
                element.title.media = {}
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
        var list = element.stimulusMedia.filter(function(val,i){return select.target.options[i].selected})
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

};

export default elementComponent;

