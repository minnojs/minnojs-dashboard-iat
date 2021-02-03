
var tabsComponent = {
    controller: function(tabs){
		var tab = tabs[0].value; // set default tab
		var index = setIndex(tab);
		return { tab: tab, index: index, setIndex:setIndex};

		function setIndex(tab){ return tabs.findIndex((element) => (element.value == tab));}
    },
	view: function(ctrl, tabs, settings, defaultSettings){
		return m('.container', [
			m('.tab', tabs.map(function(tab){
				if (tab.value == 'practice') {
					if(settings.parameters.practiceBlock == false) return null;
				}
				return m('button.tablinks', {
                    class: ctrl.tab == tab.value ? 'active' : '',
                    onclick:function(){
						ctrl.tab = tab.value;
						ctrl.index = ctrl.setIndex(tab.value);
					}},tab.text);
			})),
			m('.tabContent', [
				m.component(tabs[ctrl.index].component, settings, defaultSettings, tabs[ctrl.index].rowsDesc)
			])
		]);
	}
}

export default tabsComponent;
