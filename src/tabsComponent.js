import taskComponent from './taskComponent.js';
import parametersComponent from './parametersComponent.js';
import outputComponent from './outputComponent.js';

var components = {
    task: taskComponent,
    parameters: parametersComponent,
    categories: { view: function(){ return m('div', 'Categories component'); } },
    output: outputComponent
}

var tabs = [
	{value: 'task', text: 'Task parameters old'},
	{value: 'parameters', text: 'Task parameters'},
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
