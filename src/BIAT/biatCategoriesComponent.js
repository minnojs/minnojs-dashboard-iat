import elementComponent from './biatElementComponent.js';
import {clone} from '../resources/utilities.js';

let categoriesComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, clearElement){
    let categories = settings.categories;
    let keys_categories = [];
    for (let i=0; i < categories.length; i++){
        //let category = categories[i];
        //keys_categories.push({i: Math.random()});
        categories[i].key = Math.random();
    }
    let headlines = ['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth'];
    let keys = Array.from(Array(8)).map(x=>Math.random())
    let addFlag =  m.prop('visible');
    let removeFlag = m.prop('hidden');
    let chooseFlag = m.prop('hidden');
    let firstFlag = m.prop('false'); //to know if the first&second original categories() were choosen to remove. For reset actions.
    let secondFlag = m.prop('false');
    let choosenCategoriesList = [];
    let chooseClicked = m.prop(false);
    
    return {addFlag:addFlag, removeFlag, chooseFlag ,firstFlag, secondFlag, categories: categories, headlines: headlines, 
        reset:reset, clear:clear, addCategory:addCategory, choosenCategoriesList:choosenCategoriesList, 
        updateChoosenBlocks:updateChoosenBlocks, removeBlocks:removeBlocks, keys, chooseCategories: chooseCategories};
    
    function reset(){
        Object.assign(settings.categories[0], clone(defaultSettings.categories[0]));
        Object.assign(settings.categories[1], clone(defaultSettings.categories[1]));
        if(categories.length > 2) categories.length = 2
        addFlag('visible');
        firstFlag('false');
        secondFlag('false');
    }
    function clear(){
        settings.categories.forEach(element => Object.assign(element, clone(clearElement[0])));
    }
    function addCategory() {
        categories.push(clone(clearElement[0]));
        //let last_category = categories[categories.length -1];
        let last = categories.length - 1
        //keys_categories.push({ : Math.random()});
        categories[last].key = Math.random()
        console.log (categories);
        if (categories.length === 8) addFlag('hidden');
    }
    function updateChoosenBlocks(e, index){
        //if clicked the checkbox to uncheck the item
        if (choosenCategoriesList.includes(index) && !e.target.checked){
            var i = choosenCategoriesList.indexOf(index);
            if (i !== -1) {
            choosenCategoriesList.splice(i, 1);
            }
            return;
        } 
        if (e.target.checked) choosenCategoriesList.push(index);
    }
    function chooseCategories(){
        chooseFlag('visible');
        if (!chooseClicked()) { //show the alert only for the first time the choose button has been clicked
            alert('To choose categories to remove, please tik the checkbox near the wanted category, and to remove them click the \'Remove Choosen Categories\' button below')
            chooseClicked(true)
        }
    }
    function removeBlocks(){

        if (categories.length < 2) {
            alert('Minimum number of blocks needs to be 2'); 
            choosenCategoriesList.length = 0;
            return;
        }
        if ((categories.length - choosenCategoriesList.length) < 2){
            alert('Minimum number of blocks needs to be 2, please choose less categories to remove');
            choosenCategoriesList.length = 0;
            return;
        }
        choosenCategoriesList.sort();
        for (let i = choosenCategoriesList.length - 1; i >=0; i--) {
            if (choosenCategoriesList[i] === 0) firstFlag('true');
            if (choosenCategoriesList[i] === 1) secondFlag('true');

            categories.splice(choosenCategoriesList[i],1)
        }
        choosenCategoriesList.length = 0;
        chooseFlag('hidden');
        addFlag(categories.length < 8 ? 'visible' : 'hidden');
    }
}

function view(ctrl,settings, defaultSettings, clearElement) {
    return m('.container',{id:'categories'} ,[
        m('.row top-buffer',[
            m('.col',{style:{'margin-bottom':'7px'}},[
                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
                    m('button.btn btn btn-danger', {onclick: ctrl.reset},[
                        m('i.fas fa-undo fa-sm'), ' Reset'
                    ]),
                    m('button.btn btn btn-danger',{onclick: ctrl.clear},[
                        m('i.far fa-trash-alt fa-sm'), ' Clear'
                    ])
                ])
            ])
        ]),
        //filter to remove the first element
        ctrl.categories.map(function(category, index){
            let stimulusMedia;
            let startStimulus;
            let key = category.key;
            if ((index === 0 && ctrl.firstFlag() == 'false') || (index === 1 && ctrl.secondFlag() == 'false')){
                stimulusMedia = defaultSettings.categories[index].stimulusMedia;
                startStimulus = defaultSettings.categories[index].title.startStimulus;
            }
            else {
                stimulusMedia = clearElement[0].stimulusMedia;
                startStimulus = clearElement[0].title.startStimulus;
            }
            return m('div',{key: key},[
                m('input[type=checkbox]', {checked : ctrl.choosenCategoriesList.includes(index), style:{visibility: ctrl.chooseFlag()}, onclick: (e) => ctrl.updateChoosenBlocks(e, index)}),           
                m('h1.categoryHeadline', ctrl.headlines[index] + ' Category'),
                m('.row top-buffer'),
                m.component(elementComponent, {key:'categories'}, settings, stimulusMedia, startStimulus, index),
            ]);
        }),
        m('.row.space justify-content-md-center',[
            m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons'}},[
                m('button.btn btn btn-info',{onclick: ctrl.addCategory, style:{'padding-right':'60px','padding-left':'60px' ,visibility: ctrl.addFlag()}}, [m('i.fas fa-plus')],' Add Category'),
                m('button.btn btn btn-warning',{onclick: ctrl.chooseCategories},[
                    m('i.fas fa-check'), ' Choose Blocks to Remove']),
                m('button.btn btn btn-danger',{onclick: ctrl.removeBlocks},[
                    m('i.far fa-minus-square'), ' Remove Choosen Blocks']),
        ])
    ]),
    ]);
}

export default categoriesComponent;

