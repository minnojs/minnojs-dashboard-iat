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
    instTemplatePractice:'', instTemplateCategoryRight:'', instTemplateCategoryLeft:''}
];

// let blocksDesc = [
//     {label:'Block 1', numTrialBlocks:'blockCategories_nTrials', numMiniBlocks: 'blockCategories_nMiniBlocks', desc:'Will present the categories.'},
//     {label:'Block 2', numTrialBlocks:'blockAttributes_nTrials', numMiniBlocks: 'blockAttributes_nMiniBlocks', desc:'Will present the attributes.'},
//     {label:'Blocks 3 and 6', numTrialBlocks:'blockFirstCombined_nTrials', numMiniBlocks: 'blockFirstCombined_nMiniBlocks', desc:'The first combined block.'},
//     {label:'Blocks 4 and 7', numTrialBlocks:'blockSecondCombined_nTrials', numMiniBlocks: 'blockSecondCombined_nMiniBlocks', desc:'The second combined block.'},
//     {label:'Block 5', numTrialBlocks:'blockSwitch_nTrials', numMiniBlocks: 'blockSwitch_nMiniBlocks', desc:'Reversing the attributes block. Some have recommended using 50 trials in this block.'},
//     {blockCategories_nTrials: 0,blockCategories_nMiniBlocks:0, blockAttributes_nTrials:0,blockAttributes_nMiniBlocks:0,
//         blockFirstCombined_nTrials:0, blockFirstCombined_nMiniBlocks:0, blockSecondCombined_nTrials:0, blockSecondCombined_nMiniBlocks:0,
//         blockSwitch_nTrials:0, blockSwitch_nMiniBlocks:0, randomBlockOrder: false, randomAttSide : false}
// ];

let categoryClear = [{name: '', title: {media: {word: ''}, css: {color: '#000000', 'font-size': '0em'}, height: 4},
    stimulusMedia: [],
    stimulusCss : {color:'#000000', 'font-size':'0em'}}];

let blockClear =  
    [//Each object in this array defines a block
        {
            instHTML : '', 
            block : 1,
            miniBlocks : 0, 
            singleAttTrials : 0, 
            sharedAttTrials : 0, 
            categoryTrials : 0 
        }, 
        { 
            instHTML : '', 
            block : 2, 
            miniBlocks : 0, 
            singleAttTrials : 0, 
            sharedAttTrials : 0, 
            categoryTrials : 0
        }, 
        { 
            instHTML : '', 
            block : 3, 
            miniBlocks : 0, 
            singleAttTrials : 0, 
            sharedAttTrials : 0, 
            categoryTrials : 0
        }, 
        { 
            instHTML : '', 
            block : 4, 
            miniBlocks : 0, 
            singleAttTrials : 0, 
            sharedAttTrials : 0, 
            categoryTrials : 0
        }, 
        { 
            instHTML : '', 
            block : 5, 
            miniBlocks : 0, 
            singleAttTrials : 0, 
            sharedAttTrials : 0, 
            categoryTrials : 0
        }
    ]


let tabs = [
    {value: 'parameters', text: 'General parameters', component: parametersComponent, rowsDesc: parametersDesc },
    {value: 'blocks', text: 'Blocks', component: blocksComponent, rowsDesc: blockClear},
    {value: 'category', text: 'Category', component: categoryComponent, rowsDesc: categoryClear},
    {value: 'attributes', text: 'Attributes', component: attributesComponent, rowsDesc: categoryClear},
    {value: 'text', text: 'Texts', component: textComponent, rowsDesc: textDesc},
    {value: 'output', text: 'Complete', component: outputComponent},
    {value: 'import', text: 'Import', component: importComponent},
    {value: 'help', text: 'Help', component: helpComponent, rowsDesc:'STIAT'}
];

export default tabs;