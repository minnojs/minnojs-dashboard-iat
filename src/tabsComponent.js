import parametersComponent from './parametersComponent.js';
import outputComponent from './outputComponent.js';
import TextComponent from './TextComponent.js';
import blocksComponent from './blocksComponent.js';
import categoriesComponent from './categoriesComponent.js';
import attributesComponent from './attributesComponent';
import importComponent from './importComponent.js';


var components = {
	import: importComponent,
    parameters: parametersComponent,
	text:TextComponent,
	output: outputComponent,
	blocks: blocksComponent,
	categories: categoriesComponent,
	attributes: attributesComponent
}

var tabs = [
	{value: 'parameters', text: 'Task parameters'},
	{value: 'blocks', text: 'Block parameters'},
	{value: 'categories', text: 'Categories'},
	{value: 'attributes', text: 'Attributes'},
	{value: 'text', text: 'Text'},
	{value: 'output', text: 'Output'},
	{value: 'import', text: 'Import'}
];

var tabsComponent = {
    controller: function(){
        // set default tab
        return { tab: 'parameters' }
    },
	view: function(ctrl, settings){
		return m('.container', [
			m('.tab', tabs.map(function(tab){
				return m('button.tablinks', {
                    class: ctrl.tab == tab.value ? 'active' : '',
                    onclick:function(){ctrl.tab = tab.value}
                },tab.text);
			})),
			m('.tabContent', [
				m.component(components[ctrl.tab], settings)
			])
		]);
	}
}

export default tabsComponent;
