
import tabsComponent from '../resources/tabsComponent.js';
import defaultSettings from './ampDefaultSettings.js';
import tabs from './ampTabs.js';
import {clone} from '../resources/utilities.js';

let biat = {
    controller: function(settings){
        return {settings: settings ? settings : clone(defaultSettings)};
    },
    view: function(ctrl){
        return m('.container', 
            m('.header.p-3 mb-2 bg-info text-white', {style:{'background-color': 'coral'}},
                m('h1.display-4', 'Create my AMP script')),
            m.component(tabsComponent, tabs, ctrl.settings, defaultSettings)
        );
    }
};

export default biat;
