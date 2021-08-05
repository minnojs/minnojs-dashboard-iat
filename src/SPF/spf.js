import tabsComponent from '../resources/tabsComponent.js';
import defaultSettings from './spfDefaultSettings.js';
import tabs from './spfTabs.js';
import {clone} from '../resources/utilities.js';

let spf = {
    controller: function(settings){ return {settings: settings ? settings : clone(defaultSettings)};},
    view: function(ctrl){
        return m('.container', 
            m('.header.p-3 mb-2 bg-info text-white',
                m('h1.display-4', 'Create my SPF script')),
            m.component(tabsComponent, tabs, ctrl.settings, defaultSettings)
        );
    }
};

export default spf;
