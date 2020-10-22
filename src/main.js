import tabsComponent from './tabsComponent.js';

var Main = {
    view: function(){
        return m('.container', [
            m('header.bg-success.text-white.p-4.mb-3', [
                m('h1', 'Creating an IAT test')
            ]),
            m(tabsComponent)
        ]);
    }
};

export default Main;


