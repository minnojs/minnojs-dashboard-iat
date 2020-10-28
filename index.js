/**
 * @preserve minnojs-iat-dashboard v1.0.0
 * @license Apache-2.0 (2020)
 */

(function () {
    'use strict';

    var tabsComponent = {
        controller: function(){
            return {
                tab: 1
            }
        },
        view: function(ctrl){
            return m('.container', [
                m('.tab', [
                    m('button.tablinks', {onclick:function(){ctrl.tab = 1;}}, 'Task parameters'),
                    m('button.tablinks', {onclick:function(){ctrl.tab = 2;}}, 'Categories'),
                    m('button.tablinks', {onclick:function(){ctrl.tab = 3;}}, 'Attributes')
                ]),
                m('.tabContent', [
                    ctrl.tab == 1 ? 'tab 1' : ctrl.tab == 2 ? 'tab 2' : 'tab 3'
                ])
            ]);
        }
    };

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

    //m.mount(document.documentElement, Main);
    m.mount(document.getElementById('dashboard'), Main);

}());
//# sourceMappingURL=index.js.map
