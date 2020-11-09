import defaultSettings from './defaultSettings';

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

function controller(settings){
    var parameters = settings.parameters;
    return {reset:reset, clear:clear, set:set, get:get};
    
    function reset(){ Object.assign(parameters, defaultSettings.parameters)}
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
};

export default parametersComponent;
