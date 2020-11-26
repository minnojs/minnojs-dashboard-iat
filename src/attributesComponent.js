import elementComponent from './elementComponent.js';
import defaultSettings from './defaultSettings';

var attributesComponent = {
    controller:controller,
    view:view
};

function controller(settings){
    return {reset:reset, clear:clear};
    function reset(){
        Object.assign(settings.attribute1, defaultSettings.category1);
        Object.assign(settings.attribute2, defaultSettings.category2);}
    function clear(){
        Object.assign(settings.attribute1, {name: "", title: {media: {image: ""}, css: {color: '#000000', 'font-size': '0em'}, height: 4}, 
        stimulusMedia: [],
        stimulusCss : {color:'#000000', 'font-size':'0em'}});
        Object.assign(settings.attribute2, {name: "", title: {media: {image: ""}, css: {color: '#000000', 'font-size': '0em'}, height: 4}, 
        stimulusMedia: [],
        stimulusCss : {color:'#000000', 'font-size':'0em'}});
    }
}

function view(ctrl,settings) {
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
};


export default attributesComponent;
