import taskComponent from './taskComponent.js';

var tabsComponent = {
    controller: function(){
        return {
            tab: 1
        }
    },
    view: function(ctrl){
        return m('.container', [
            m('.tab', [
                m('button.tablinks', {onclick:function(){ctrl.tab = 1}}, 'Task parameters'),
                m('button.tablinks', {onclick:function(){ctrl.tab = 2}}, 'Categories'),
                m('button.tablinks', {onclick:function(){ctrl.tab = 3}}, 'Attributes')
            ]),
            m('.tabContent', [
                ctrl.tab == 1 ? m(taskComponent) : ctrl.tab == 2 ? 'tab 2' : 'tab 3'
            ])
        ]);
    }
}

export default tabsComponent;
