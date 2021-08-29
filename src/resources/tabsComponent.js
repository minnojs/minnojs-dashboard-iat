
var tabsComponent = {
    controller: function(tabs){
		var tab = tabs[0].value; // set default tab
		var index = setIndex(tab);
		return {tab, index, setIndex};
		function setIndex(tab){ return tabs.findIndex((element) => (element.value == tab));}
    },
	view: function(ctrl, tabs, settings, defaultSettings){
		return m('.container', [
			m('.tab', tabs.map(function(tab){
				if (tab.value == 'practice'){
					if(settings.parameters.practiceBlock == false) return null;
				}
				return m('button',{
                    class: ctrl.tab == tab.value ? 'active' : '',
                    onclick:function(){
						ctrl.tab = tab.value;
						ctrl.index = ctrl.setIndex(tab.value);
					}},tab.text);
			})),
			m('.div',{key:tabs[ctrl.index].value}, 
				m.component(tabs[ctrl.index].component, settings, defaultSettings, tabs[ctrl.index].rowsDesc, tabs[ctrl.index].subTabs, tabs[ctrl.index].biat))
		]);
	}
}

export default tabsComponent;
