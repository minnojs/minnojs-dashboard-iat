import defaultSettings from './defaultSettings';

var TextComponent = {
    controller:controller,
    view:view
};

var rows=[
    {name: 'textOnError', label:'Text On Error', desc:'Text Shown on user Error'},
    {name: 'leftKeyText', label:'Left Key Text', desc: 'Left Key Text'},
    {name: 'orKeyText', label:'Or Key Text', desc: 'Or Key Text'},
    {name: 'rightKeyText', label:'Right Key Text', desc: 'Right Key Text'},
    {name: 'AttributesBlockInstructions', label: 'Attributes Block Instructions Text', desc: 'Attributes Block Instructions Text'},
    {name: 'CategoriesBlockInstructions', label: 'Categories Block Instructions Text', desc: 'Categories Block Instructions Text'},
    {name: 'FirstCombinedBlockInstructions', label: 'First Combined Block Instructions Text', desc: 'First Combined Block Instructions Text'},
    {name: 'SecondCombinedBlockInstructions', label: 'Second Combined Block Instructions Text', desc: 'Second Combined Block Instructions Text'},
    {name: 'SwitchedCategoriesInstructions', label: 'Switched Categories Instructions Text', desc: 'Switched Categories Instructions Text'},
    {name: 'PreDebriefingText', label: 'Pre-Debriefing Text', desc: 'Pre-Debriefing Text'},
];

function controller(settings){
    var isTouch = settings.parameters.isTouch;
    var textparameters;
    isTouch ? textparameters = settings.touch_text : textparameters = settings.text;
    return {reset:reset, clear:clear, set:set, get:get};
    
    function reset(){isTouch ? Object.assign(textparameters, defaultSettings.touch_text) : Object.assign(textparameters, defaultSettings.text)}
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
                        m('textarea',{style: {width: '30rem' ,height: '4rem'}, value:ctrl.get(row.name), onchange:m.withAttr('value', ctrl.set(row.name))})
                    ])
                ])
            }
            ),
    
        ])
    ]) 
};

    
            

export default TextComponent;
