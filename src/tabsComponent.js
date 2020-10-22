var tabsComponent = {
    view: function(){
        return m('.tab', [
            m('button.tablinks', 'Task parameters'),
            m('button.tablinks', 'Categories'),
            m('button.tablinks', 'Attributes')
        ])
    }
}

export default tabsComponent;
