
import tabsComponent from '../resources/tabsComponent.js';
import defaultSettings from './biatDefaultSettings.js';
import tabs from './biatTabs.js';
import {clone} from '../resources/utilities.js';

let biat = {
    controller: function(settings){
        return {settings: settings ? settings : clone(defaultSettings)};
    },
    view: function(ctrl){
        return m('.container', 
            m('.header.p-3 mb-2 bg-info text-white',
                m('h1.display-4', 'Create my BIAT script')),
            m.component(tabsComponent, tabs, ctrl.settings, defaultSettings)
        );
    }
};

export default biat;
