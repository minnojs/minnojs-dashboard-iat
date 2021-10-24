import parametersComponent from '../resources/parametersComponent.js';
// import outputComponent from './epOutputComponent.js';
// import textComponent from '../resources/textComponent.js';
import blocksComponent from './ampBlocksComponent.js';
// import categoriesComponent from '../resources/categoriesComponent.js';
// import importComponent from './epImportComponent.js';
import helpComponent from '../resources/helpComponent.js';

let parametersDesc = [
    {name: 'isQualtrics',options:['Regular','Qualtrics'], label:'Regular script or Qualtrics?', desc: ['If you want this IAT to run from Qualtrics, read ', m('a',{href: 'https://minnojs.github.io/minnojs-blog/qualtrics-iat/'}, 'this blog post '),'to see how.']},
    {name: 'responses', label: 'Number of responses options', options:[2,7], desc: 'Change to 7 for a 1-7 rating'},
    {name: 'leftKey', label: 'Left Key', desc: 'Change the left key'},
    {name: 'rightKey', label: 'Right Key', desc: 'Change the right key'},
    {name: 'sortingLabel1', label: 'First Sorting Label',desc: 'Response is coded as 0.'},
    {name: 'sortingLabel2', label: 'Second Sorting Label', desc: 'Response is coded as 1. '},
    {name: 'randomizeLabelSides',label:'Randomize Label Sides', desc: 'If false, then label1 is on the left, and label2 is on the right.'},
    {name: 'primeDuration', label: 'Prime Duration', desc: 'Default prime duration'},
    {name: 'maskStimulus', label: 'Mask Stimulus', desc: 'The mask stimulus '},
    {name: 'fixationDuration', label: 'Fixation Duration', desc: 'No fixation by default'},
    {name: 'fixationStimulus', label: 'Fixation Stimulus', desc: 'Change the fixation stimulus here'},
    {name: 'postPrimeDuration', label: 'Post Prime Duration', desc: 'Duration of blank screen between prime and target.'},
    {name: 'targetDuration', label: 'Target Duration', desc: 'Duration of target presentation.'},
    {name: 'targetCat', label: 'Target Category', desc: 'The name of the targets (used in the instructions).'},
    {name: 'showRatingDuration', label: 'Show Rating Duration ', desc: 'In the 7-responses option, for how long to show the selected rating.'},
    {isTouch:false, separateStimulusSelection:0, primeDuration:0, fixationDuration:0 ,deadlineDuration:0, deadlineMsgDuration:0, base_url:{regular:{image:''}, qualtrics:{image:''}}}
];

let textDesc=[
    {name: 'firstBlock', label:'First Block\'\s Instructions', desc:'First\'\s Block Instructions'},
    {name: 'middleBlock', label:'Middle Block\'\s Instructions', desc: 'Middle Block\'\s Instructions'},
    {name: 'lastBlock', label:'Last Block\'\s Instructions', desc: 'Last Block\'\s Instructions'},
    {firstBlock: '', middleBlock:'', lastBlock:''},
    {} //an empty element

];

let blocksDesc = [
    {name: 'trialsInExample', label: 'Number of trials in example block', desc: 'Change to 0 if you don\'t want an example block'},
    {name: 'trialsInBlock', label: 'Number of trials in a block', desc: 'Number of trials in each block'},
    {trialsInExample: 0, trialsInBlock: [0,0,0]}
];

let categoryClear = [{
    name: '', 
    title: {media: {word: ''}, 
    css: {color: '#000000', 'font-size': '1em'}, height: 4},
    stimulusMedia: [],
    stimulusCss : {color:'#000000', 'font-size':'1em'}
}];

let primeClear = [{
    name : '',  //Will be used in the logging
    mediaArray : []

}]

let categoriesTabs = [
    {value: 'rightAttTargets', text: 'First Category'},
    {value: 'leftAttTargets', text: 'Second Category'},
]

let primesTabs = [
    {value: 'prime1', text: 'First Category'},
    {value: 'prime2', text: 'Second Category'},
    {value:'primeStimulusCSS', text:'Prime Design'}
]

let tabs = [
    {value: 'parameters', text: 'General parameters', component: parametersComponent, rowsDesc: parametersDesc },
    {value: 'blocks', text: 'Blocks', component: blocksComponent, rowsDesc: blocksDesc},
    // {value: 'prime', text: 'Prime Categories', component: categoriesComponent, rowsDesc: primeClear, subTabs:primesTabs, type: 'EP'},
    // {value: 'categories', text: 'Target Categories', component: categoriesComponent, rowsDesc: categoryClear, subTabs:categoriesTabs},
    // {value: 'text', text: 'Texts', component: textComponent, rowsDesc: textDesc},
    // {value: 'output', text: 'Complete', component: outputComponent},
    // {value: 'import', text: 'Import', component: importComponent},
    {value: 'help', text: 'Help', component: helpComponent, rowsDesc:'AMP'}
];

export default tabs;