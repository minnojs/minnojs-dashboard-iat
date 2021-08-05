import parametersComponent from '../resources/parametersComponent.js';
import outputComponent from './stiatOutputComponent.js';
import textComponent from '../resources/textComponent.js';
import blocksComponent from './stiatlBlocksComponent.js';
import categoryComponent from './stiatCategoryComponent.js';
import attributesComponent from '../IAT/attributesComponent.js';
import importComponent from './stiatImportComponent.js';
import helpComponent from '../resources/helpComponent.js';

let parametersDesc = [
    {name: 'isQualtrics', options:['Regular','Qualtrics'],label:'Regular script or Qualtrics?', desc: ['If you want this IAT to run from Qualtrics, read ', m('a',{href: 'https://minnojs.github.io/minnojs-blog/qualtrics-iat/'}, 'this blog post '),'to see how.']},
    {isQualtrics:false, base_url:''}
];

let textDesc = [
    {name: 'leftKeyText', label:'Top-left text (about the left key)', desc: 'We use this text to remind participants what key to use for a left response.'},
    {name: 'rightKeyText', label:'Top-right text (about the right key)', desc: 'We use this text to remind participants what key to use for a right response.'},
    {name: 'orKeyText', label:'Or', desc: 'We show this text in the combined blocks to separate between the two categories that use the same key.'},
    {name: 'remindErrorText', label: 'Screen\'s Bottom (error reminder)', desc: 'We use this text to remind participants what happens on error. Replace this text if you do not require participants to correct their error responses (see General Parameters page).'},
    {name: 'finalText', label:'Text shown at the end', desc: 'Text shown at the end'},
    {name: 'instTemplatePractice', label:'Instructions in Practice Block', desc: 'The instructions in the practice block.'},
    {name: 'instTemplateCategoryRight', label:'Instructions in Right Category', desc: 'The instructions in the right category.'},
    {name: 'instTemplateCategoryLeft', label:'Instructions in Left Category', desc: 'The instructions in the left category.'},
    {textOnError:'', leftKeyText:'', rightKeyText:'', orKeyText:'', remindErrorText:'',finalText:'',
    instTemplatePractice:'', instTemplateCategoryRight:'', instTemplateCategoryLeft:''},
    {} //an empty element
];

let categoryClear = [{name: '', title: {media: {word: ''}, css: {color: '#000000', 'font-size': '0em'}, height: 4},
    stimulusMedia: [],
    stimulusCss : {color:'#000000', 'font-size':'0em'}}];

let clearBlock =  
    [
        //Each of the following defines a block
        {
            instHTML : '', 
            block : 1,
            miniBlocks : 0, 
            singleAttTrials : 0, 
            sharedAttTrials : 0, 
            categoryTrials : 0 
        }
    ]


let tabs = [
    {value: 'parameters', text: 'General parameters', component: parametersComponent, rowsDesc: parametersDesc },
    {value: 'blocks', text: 'Blocks', component: blocksComponent, rowsDesc: clearBlock},
    {value: 'category', text: 'Category', component: categoryComponent, rowsDesc: categoryClear},
    {value: 'attributes', text: 'Attributes', component: attributesComponent, rowsDesc: categoryClear},
    {value: 'text', text: 'Texts', component: textComponent, rowsDesc: textDesc},
    {value: 'output', text: 'Complete', component: outputComponent},
    {value: 'import', text: 'Import', component: importComponent},
    {value: 'help', text: 'Help', component: helpComponent, rowsDesc:'STIAT'}
];

export default tabs;