/**
 * @preserve minnojs-iat-dashboard v1.0.0
 * @license Apache-2.0 (2020)
 */

(function () {
    'use strict';

    var tabsComponent = {
        view: function(){
            return m('.tab', [
                m('button.tablinks', 'Task parameters'),
                m('button.tablinks', 'Categories'),
                m('button.tablinks', 'Attributes')
            ])
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
