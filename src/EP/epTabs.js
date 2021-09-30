import parametersComponent from '../resources/parametersComponent.js';
import outputComponent from './epOutputComponent.js';
import textComponent from '../resources/textComponent.js';
import blocksComponent from '../resources/blocksComponent.js';
import categoriesComponent from '../resources/categoriesComponent.js';
import importComponent from './epImportComponent.js';
import helpComponent from '../resources/helpComponent.js';

let parametersDesc = [
    {name: 'isQualtrics',options:['Regular','Qualtrics'], label:'Regular script or Qualtrics?', desc: ['If you want this IAT to run from Qualtrics, read ', m('a',{href: 'https://minnojs.github.io/minnojs-blog/qualtrics-iat/'}, 'this blog post '),'to see how.']},
    {name: 'separateStimulusSelection', label: 'Seperate Stimulus Selection', desc: 'Whether to select the prime and targe stimuli randomly without repetition for each prime-target combination until exhuastion or to select the stimuli randomly without repetition for the whole task.'},
    {name: 'primeDuration', label: 'Prime Duration', desc: 'Default prime duration'},
    {name: 'fixationDuration', label: 'Fixation Duration', desc: 'No fixation by default'},
    {name: 'fixationStimulus', label: 'Fixation Stimulus', desc: 'Change the fixation stimulus here'},
    {name: 'deadlineDuration', label: 'Deadline Duration', desc: '0 means no response deadline: we wait until response.'},
    {name: 'deadlineStimulus', label: 'Deadline Stimulus', desc: 'Change the deadline message stimulus here'},
    {isTouch:false, separateStimulusSelection:0, primeDuration:0, fixationDuration:0 ,deadlineDuration:0, deadlineMsgDuration:0, base_url:''}
];

let textDesc=[
    {name: 'firstBlock', label:'First Block\'\s Instructions', desc:'First\'\s Block Instructions'},
    {name: 'middleBlock', label:'Middle Block\'\s Instructions', desc: 'Middle Block\'\s Instructions'},
    {name: 'lastBlock', label:'Last Block\'\s Instructions', desc: 'Last Block\'\s Instructions'},
    {firstBlock: '', middleBlock:'', lastBlock:''},
    {} //an empty element

];

let blocksDesc = [
    {name: 'nBlocks', label: 'Number of blocks', desc: 'Set the number of blocks in the task'},
    {name: 'nTrialsPerPrimeTargetPair', label: 'Number of trials in a block, per prime-target combination', desc: 'How many trials in a block, per prime-target combination (always three blocks).'},
    {nBlocks: 0, nTrialsPerPrimeTargetPair: 0}
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
    {value: 'prime', text: 'Prime Categories', component: categoriesComponent, rowsDesc: primeClear, subTabs:primesTabs, type: 'EP'},
    {value: 'categories', text: 'Target Categories', component: categoriesComponent, rowsDesc: categoryClear, subTabs:categoriesTabs},
    {value: 'text', text: 'Texts', component: textComponent, rowsDesc: textDesc},
    {value: 'output', text: 'Complete', component: outputComponent},
    {value: 'import', text: 'Import', component: importComponent},
    {value: 'help', text: 'Help', component: helpComponent, rowsDesc:'EP'}
];

export default tabs;