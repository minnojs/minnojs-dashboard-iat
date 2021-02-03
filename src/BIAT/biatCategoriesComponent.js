import elementComponent from './biatElementComponent.js';
import {clone} from '../resources/utilities.js'

var categoriesComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, clearElement){
    var categories = settings.categories;
    var cur_index = 1;
    var headlines = ['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth'];
    var visibleFlag = m.prop('visible');
    
    return {visibleFlag:visibleFlag, categories: categories, cur_index, headlines: headlines, 
        reset:reset, clear:clear, addCategory:addCategory};
    
    function reset(){
        Object.assign(settings.categories[0], JSON.parse(JSON.stringify(defaultSettings.categories[0])));
        Object.assign(settings.categories[1], JSON.parse(JSON.stringify(defaultSettings.categories[1])));
        for (var i = 2; i < settings.categories.length ; i++)
            Object.assign(settings.categories[i], clone(clearElement[0]));
    }
    function clear(){
        settings.categories.forEach(element => {Object.assign(element, clone(clearElement[0]))});
    }
    function addCategory() {
        cur_index++;
        categories.push(clone(clearElement[0]));
        if (cur_index == 7) visibleFlag('hidden')
    }
}

function view(ctrl,settings, defaultSettings, clearElement) {
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
        m.component(elementComponent, {key: "categories"} ,settings, 
        defaultSettings.categories[0].stimulusMedia, defaultSettings.categories[0].title.startStimulus,{key: 0}),
        //filter to remove the first element
        ctrl.categories.filter(category => ctrl.categories.indexOf(category) != 0).map(function(category){
            var index =  ctrl.categories.lastIndexOf(category);
            var stimulusMedia = index === 1 ? defaultSettings.categories[1].stimulusMedia : clearElement[0].stimulusMedia;
            var startStimulus = index === 1 ? defaultSettings.categories[index].title.startStimulus : clearElement[0].title.startStimulus;
            return m('div',[           
                m('h1.categoryHeadline', {key: ctrl.cur_index} , ctrl.headlines[index] + " Category"),
                m.component(elementComponent, {key: "categories"} ,settings, stimulusMedia, startStimulus, {key: index}),
        ])
        }),
        m('div', {style: {visibility: ctrl.visibleFlag()}},
            m('button.reset_button',{onclick: ctrl.addCategory}, 'Add Category'))
    ])
};

export default categoriesComponent;
