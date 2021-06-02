import parametersComponent from '../resources/parametersComponent.js';
import outputComponent from './outputComponent.js';
import textComponent from '../resources/textComponent.js';
import blocksComponent from './blocksComponent.js';
import categoriesComponent from './categoriesComponent.js';
import attributesComponent from './attributesComponent.js';
import importComponent from './importComponent.js';
import helpComponent from '../resources/helpComponent.js';

let parametersDesc = [
    {name: 'isTouch', options:['Keyboard', 'Touch'], label:'Keyboard input or touch input?', desc:'Minno does not auto-detect the input method. If you need a touch version and a keyboard version, create two different scripts with this tool.'},
    {name: 'isQualtrics',options:['Regular','Qualtrics'], label:'Regular script or Qualtrics?', desc: ['If you want this IAT to run from Qualtrics, read ', m('a',{href: 'https://minnojs.github.io/minnojs-blog/qualtrics-iat/'}, 'this blog post '),'to see how.']},
    {name: 'fullscreen', label:'Run Full Screen', desc: 'Do you want to enable a full screen option?'},
    {name: 'showDebriefing', label:'Show results interpretation at the end', desc: 'Not recommended. A single IAT score is not a reliable estimate of any psychological construct.'},
    {name: 'remindError', label: 'Error feedback on incorrect responses', desc: 'It is recommended to show participants an error feedback on error responses.'},
    {name: 'errorCorrection', label: 'Require correct response', desc: 'It is recommended to require participants to hit the correct response even after errors.'},
    {isTouch:false, isQualtrics:false, fullscreen:false, showDebriefing:false, remindError:false, errorCorrection:false,base_url:''}
];

let textDesc=[
    {name: 'textOnError', label:'Screen\'s Bottom (error reminder)', desc:'We use this text to remind participants what happens on error. Replace this text if you do not require participants to correct their error responses (see General Parameters page).'},
    {name: 'leftKeyText', label:'Top-left text (about the left key)', desc: 'We use this text to remind participants what key to use for a left response.'},
    {name: 'rightKeyText', label:'Top-right text (about the right key)', desc: 'We use this text to remind participants what key to use for a right response.'},
    {name: 'orKeyText', label:'Or', desc: 'We show this text in the combined blocks to separate between the two categories that use the same key.'},
    {name: 'AttributesBlockInstructions', label: 'Instructions in Block 1', desc: 'The instructions in the attributes practice block.'},
    {name: 'CategoriesBlockInstructions', label: 'Instructions in Block 2', desc: 'The instructions in the categories practice block.'},
    {name: 'FirstCombinedBlockInstructions', label: 'Instructions in Blocks 3 and 6', desc: 'The instructions in the first combined (4-groups) block.'},
    {name: 'SecondCombinedBlockInstructions', label: 'Instructions in Blocks 4 and 7', desc: 'The instructions in the second combined (4-groups) block.'},
    {name: 'SwitchedCategoriesInstructions', label: 'Instructions in Block 5', desc: 'The instructions in the block that provides practice for the reversed categories.'},
    {name: 'PreDebriefingText', label: 'Text before showing results', desc: 'Will be used only if you selected (in the General Parameters page) to show the participants an interpretation of the result. We recommend avoiding that.'},
    {textOnError:'', leftKeyText:'', rightKeyText:'', orKeyText:'', AttributesBlockInstructions:'',CategoriesBlockInstructions:'',
        FirstCombinedBlockInstructions:'', SecondCombinedBlockInstructions:'', SwitchedCategoriesInstructions:'',PreDebriefingText:''}
];

let blocksDesc = [
    {label:'Block 1', numTrialBlocks:'blockCategories_nTrials', numMiniBlocks: 'blockCategories_nMiniBlocks', desc:'Will present the categories.'},
    {label:'Block 2', numTrialBlocks:'blockAttributes_nTrials', numMiniBlocks: 'blockAttributes_nMiniBlocks', desc:'Will present the attributes.'},
    {label:'Blocks 3 and 6', numTrialBlocks:'blockFirstCombined_nTrials', numMiniBlocks: 'blockFirstCombined_nMiniBlocks', desc:'The first combined block.'},
    {label:'Blocks 4 and 7', numTrialBlocks:'blockSecondCombined_nTrials', numMiniBlocks: 'blockSecondCombined_nMiniBlocks', desc:'The second combined block.'},
    {label:'Block 5', numTrialBlocks:'blockSwitch_nTrials', numMiniBlocks: 'blockSwitch_nMiniBlocks', desc:'Reversing the attributes block. Some have recommended using 50 trials in this block.'},
    {name:'randomBlockOrder' ,label:'Randomly choose categories location in Block 1', desc:'If not randomized: the First Category (in the Categories page) will appear on the left in Blocks 1,3, and 4.'},
    {name:'randomAttSide',label:'Randomly choose attributes location in the task', desc: 'If not randomized: the First Category (in the Attributes page) will appear on the left.'},
    {blockCategories_nTrials: 0,blockCategories_nMiniBlocks:0, blockAttributes_nTrials:0,blockAttributes_nMiniBlocks:0,
        blockFirstCombined_nTrials:0, blockFirstCombined_nMiniBlocks:0, blockSecondCombined_nTrials:0, blockSecondCombined_nMiniBlocks:0,
        blockSwitch_nTrials:0, blockSwitch_nMiniBlocks:0, randomBlockOrder: false, randomAttSide : false}
];

let categoryClear = [{name: '', title: {media: {word: ''}, css: {color: '#000000', 'font-size': '0em'}, height: 4},
    stimulusMedia: [],
    stimulusCss : {color:'#000000', 'font-size':'0em'}}];

let tabs = [
    {value: 'parameters', text: 'General parameters', component: parametersComponent, rowsDesc: parametersDesc },
    {value: 'blocks', text: 'Blocks', component: blocksComponent, rowsDesc: blocksDesc},
    {value: 'categories', text: 'Categories', component: categoriesComponent, rowsDesc: categoryClear},
    {value: 'attributes', text: 'Attributes', component: attributesComponent, rowsDesc: categoryClear},
    {value: 'text', text: 'Texts', component: textComponent, rowsDesc: textDesc},
    {value: 'output', text: 'Complete', component: outputComponent},
    {value: 'import', text: 'Import', component: importComponent},
    {value: 'help', text: 'Help', component: helpComponent, rowsDesc:'IAT'}
];

export default tabs;