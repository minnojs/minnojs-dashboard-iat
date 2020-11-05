import tabsComponent from './tabsComponent.js';
import defaultSettings from './defaultSettings';

var Main = {
    controller: function(settings){
        return {settings: settings ? settings : clone(defaultSettings)}
    },
    view: function(ctrl){
        return m('.container', [
            m('header.bg-success.text-white.p-4.mb-3', [
                m('h1', 'Creating an IAT test')
            ]),
            m.component(tabsComponent, ctrl.settings)
        ]);
    }
};

export default Main;

// WARNING!! this does not clone functions, regex, Dates or anything complex!!
// If you need any of that good stuff, you need a more complex function
function clone(obj){
    return JSON.parse(JSON.stringify(obj));
}
