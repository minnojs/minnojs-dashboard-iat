import parametersComponent from '../resources/parametersComponent.js';
import defaultSettings from './biatDefaultSettings.js';
import blocksComponent from './biatBlocksComponent.js';
import textComponent from '../resources/textComponent.js';
import practiceComponent from './biatPracticeComponent.js';
import categoriesComponent from './biatCategoriesComponent.js';
import attributesComponent from './biatAttributesComponent.js';
import outputComponent from './biatOutputComponent.js';
import importComponent from './biatImportComponent.js';
import helpComponent from '../resources/helpComponent.js';

var parametersDesc = [
    {name: 'isTouch', label:'Keyboard input or touch input?', desc:'Minno does not auto-detect the input method. If you need a touch version and a keyboard version, create two different scripts with this tool.'},
    {name: 'isQualtrics', label:'Regular script or Qualtrics?', desc: ['If you want this BIAT to run from Qualtrics, read ', m('a',{href: "https://minnojs.github.io/minnojs-blog/qualtrics-biat/"}, "this blog post "),"to see how."]},
    {name: 'practiceBlock', label: 'Practice Block', desc: 'Should the task start with a practice block?'},
    {name: 'remindError', label: 'Error feedback on incorrect responses', desc: 'It is recommended to show participants an error feedback on error responses'},
    {name: 'showStimuliWithInst', label: 'Show Stimuli with Instructions', desc: 'Whether to show the stimuli of the IN categories at the beginning of the block.'},
	{istouch:false, isQualtrics:false, practiceBlock:false, showStimuliWithInst:false, remindError:false, base_url:''}
];

var blocksDesc = [
    {name: 'nMiniBlocks', label: "Mini Blocks", desc: "Each block can be separated to a number of mini-blocks, to reduce repetition of the same response in consecutive trials. The default, 1, means that we don't actually use mini blocks."},
    {name: 'nTrialsPerMiniBlock', label: "Trials in Mini Blocks", desc: '50% on the right, 50% left, 50% attributes, 50% categories.'},
    {name: 'nPracticeBlockTrials', label: 'Trials in Practice Block', desc:'Should be at least 8 trials'},
    {name: 'nCategoryAttributeBlocks', label: 'Blocks per focal category-attribute combination', desc: 'Number of blocks per focal category-attribute combination'},
    {name: 'focalAttribute', label: 'Focal Attribute', desc: 'Sets whether we use a certain focal attribute throughout the task, or both.', options: ['attribute1','attribute2','both']},
    {name: 'firstFocalAttribute', label: 'First Focal Attribute', desc: "Sets what attribute appears first. Irrelevant if Focal Attribute is not 'both'.", options: ['attribute1','attribute2','random']},
    {name: 'focalCategoryOrder', label: 'Focal Category Order', desc: 'If bySequence then we always start with the first category in the list as the first focal category.', options: ['bySequence','random']},
    {nMiniBlocks: 0, nTrialsPerMiniBlock: 0, nPracticeBlockTrials:0, nCategoryAttributeBlocks:0,
        focalAttribute: 'attribute1', firstFocalAttribute : 'random', focalCategoryOrder: 'random'}
];

var textDesc = [
    {name: 'instTemplate', label:'Instructions', desc: 'Instructions'},
    {name: 'remindErrorText', label:'Screen’s Bottom (error reminder)', desc:'We use this text to remind participants what happens on error. Replace this text if you do not require participants to correct their error responses (see General Parameters page).'},
    {name: 'leftKeyText', label:'Top-left text (about the left key)', desc: 'We use this text to remind participants what key to use for a left response.'},
    {name: 'rightKeyText', label:'Top-right text (about the right key)', desc: 'We use this text to remind participants what key to use for a right response.'},
    {name: 'orKeyText', label:'Or', desc: 'We show this text in the combined blocks to separate between the two categories that use the same key.'},
    {name: 'finalText', label:'Text shown at the end', desc: 'Text shown at the end'},
    {remindErrorText:'', leftKeyText:'', rightKeyText:'', orKeyText:'', 
        instTemplate:'', finalText:''}
];

var elementClear = [{
    name : '',
    title : {
        media : {image : ''},
        css : {color:'#000000','font-size':'0em'},
        height : 4, 
        startStimulus : { 
            media : {image : ''}, 
            css : {color:'#000000','font-size':'0em'}, 
            height : 2
        }
    },
    stimulusMedia : [], 
stimulusCss : {color:'#000000','font-size':'0em'} }]

var tabs = [
	{value: 'parameters', text: 'General parameters', component: parametersComponent, rowsDesc: parametersDesc },
	{value: 'blocks', text: 'Blocks', component: blocksComponent, rowsDesc: blocksDesc},
    {value: 'practice', text: 'Practice Block', component: practiceComponent, rowsDesc: elementClear},
    {value: 'categories', text: 'Categories', component: categoriesComponent, rowsDesc: elementClear},
	{value: 'attributes', text: 'Attributes', component: attributesComponent, rowsDesc: elementClear},
	{value: 'text', text: 'Texts', component: textComponent, rowsDesc: textDesc},
	{value: 'output', text: 'Complete', component: outputComponent},
    {value: 'import', text: 'Import', component: importComponent},
    {value: 'help', text: 'Help', component: helpComponent, rowsDesc:'BIAT'}
];

//remove practice related elements
if (!defaultSettings.parameters.practiceBlock) {
    blocksDesc.splice(2,1); 
    tabs.splice(2,1);
}

export default tabs;