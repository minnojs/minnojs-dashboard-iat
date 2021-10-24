import {showClearOrReset} from '../resources/utilities.js';

let blocksComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, rows){
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
function view(ctrl, settings){
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

export default blocksComponent;