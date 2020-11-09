import parametersComponent from './parametersComponent.js';
import outputComponent from './outputComponent.js';
import blocksComponent from './blocksComponent.js';

var components = {
    parameters: parametersComponent,
    categories: { view: function(){ return m('div', 'Categories component'); } },
	output: outputComponent,
	blocks: blocksComponent
}

var tabs = [
	{value: 'parameters', text: 'Task parameters'},
	{value: 'blocks', text: 'Block parameters'},
	{value: 'categories', text: 'Categories'},
	{value: 'output', text: 'Output'}
];

var tabsComponent = {
    controller: function(){
        // set default tab
        return { tab: 'output' }
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
