import tabsComponent from '../resources/tabsComponent.js';
import defaultSettings from './stiatDefaultSettings.js';
import tabs from './stiatTabs.js';
import {clone} from '../resources/utilities.js';

let stiat = {
    controller: function(settings){ return {settings: settings ? settings : clone(defaultSettings)};},
    view: function(ctrl){
        return m('.container', 
            m('.header.p-3 mb-2 bg-info text-white',
                m('h1.display-4', 'Create my STIAT script')),
            m.component(tabsComponent, tabs, ctrl.settings, defaultSettings)
        );
    }
};

export default stiat;
