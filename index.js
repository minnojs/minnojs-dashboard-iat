/**
 * @preserve minnojs-iat-dashboard v1.0.0
 * @license Apache-2.0 (2020)
 */

(function () {
    'use strict';

    var taskComponent = {};
<<<<<<< HEAD
    taskComponent.parameter = function(label,description, flag) {
        this.label = m.prop(label);
        this.description = m.prop(description);
=======
    taskComponent.task = function(data, flag) {
        this.description = m.prop(data);
>>>>>>> a7b09c19ab26b165cca2f1632f9bc0a95c207642
        this.checked = m.prop(flag);
    };
    taskComponent.list = Array;

<<<<<<< HEAD
    taskComponent.labels = ["Touch Device", "Qualtrics","Enable Full Screen","Show Debriefing",
                                "Show an Error Message", "Must correct wrong answers"];
    taskComponent.descriptions = ["Will the task run on touch devices?", "Is this a Qualtrics version", 
                                "Do you want to enable a full screen option?",
                                "Do you want to show debriefing at the end?",
                                "In the case of a mistake, do you want to display a message to the user?",
                                "In the case of a mistake, the user cannot continue if he didn't coreect his answer"];                    

    taskComponent.vm = (function() { //creating a complete list of parametrs and their features'
        var vm = {};
        vm.init = function() {
            vm.list = new taskComponent.list();
            for (var i = 0; i < taskComponent.labels.length; i++){
                vm.label = m.prop(taskComponent.labels[i]);
                vm.description = m.prop (taskComponent.descriptions[i]);
                if (taskComponent.labels[i] == "Show an Error Message" || taskComponent.labels[i] == "Must correct wrong answers")
                    vm.list.push(new taskComponent.parameter(vm.label(),vm.description(),true));          
                else vm.list.push(new taskComponent.parameter(vm.label(),vm.description(),false));          
=======
    taskComponent.parameters = ["Touch Device", "Qualtrics","Enable Full Screen","Show Debriefing",
                                "Show an Error Message", "Must correct wrong answers"];

    taskComponent.vm = (function() {
        var vm = {};
        vm.init = function() {
            vm.list = new taskComponent.list();
            for (var i = 0; i < taskComponent.parameters.length; i++){
                vm.description = m.prop(taskComponent.parameters[i]);
                console.log(taskComponent.parameters[i]);
                if (taskComponent.parameters[i] == "Show an Error Message" || taskComponent.parameters[i] == "Must correct wrong answers")
                    vm.list.push(new taskComponent.task(vm.description(),true));          
                else vm.list.push(new taskComponent.task(vm.description(),false));          
>>>>>>> a7b09c19ab26b165cca2f1632f9bc0a95c207642
            }
            };
        return vm;
    }());

    taskComponent.controller = function() {
        taskComponent.vm.init();
    };

<<<<<<< HEAD
    function resetTaskParameters () {
        var uncheck=document.getElementsByTagName('input');
        for(var i=0;i<uncheck.length;i++)
        {
            if(uncheck[i].type=='checkbox')
            {
                if ( i < 4) //for the two fields that supposed to be checked
                    uncheck[i].checked=false;
                else {
                    uncheck[i].checked=true;
                }
            }
            else {
                uncheck[i].value=""; //for image's url
            }
        }
    }

    function clearTaskParameters () {
        var uncheck=document.getElementsByTagName('input');
        for(var i=0;i<uncheck.length;i++)
        {
            if(uncheck[i].type=='checkbox')
            {
                uncheck[i].checked=false;
            }
            else {
                uncheck[i].value=""; //for image's url
            }
        }
    }

    taskComponent.view = function(){
            return m('.container', [
                m('table.w3-table w3-bordered',{id : "table"}, [
                    m("tr.border_lines", [
                        m("td"), //for space
                        m("td"), //for space
                        m("td",[
                        m("button.reset_button", {onclick: resetTaskParameters},'Reset'),
                        m("button.reset_button",{onclick: clearTaskParameters}, 'Clear'),
=======
    taskComponent.view = function(){
            return m('.container', [
                m('table.w3-table w3-bordered', [
                    m("tr.border_lines", [
                        m("td"), //for space
                        m("td",[
                        m("button.reset_button", 'Reset'),
                        m("button.reset_button",'Clear')
>>>>>>> a7b09c19ab26b165cca2f1632f9bc0a95c207642
                        ])
                    ]),
                    taskComponent.vm.list.map(function(task, index) {
                    return m("tr.lines", [
<<<<<<< HEAD
                        m("td.td_info",[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', [task.description()])
                        ]),
                        m("td.td_task", task.label()),
                        m("td", [
                        m("input[type=checkbox]", {onclick: m.withAttr("checked", task.checked), checked: task.checked()})
=======
                        //m("td",[
                            //m('.fas-fa-info-circle',[
                            //m('.card.info-box.card-header', ['Here you can define what will be the type of the server and the kind of certifications it will be included.'])
                        //]),
                        //]),
                        console.log(task.checked()),
                        m("td.td_task", task.description(),),
                        m("td", [
                            m("input[type=checkbox]", {onclick: m.withAttr("checked", task.checked), checked: task.checked()})
>>>>>>> a7b09c19ab26b165cca2f1632f9bc0a95c207642
                        ])
                    ])
                    }
                ),
                m("tr.lines", [
<<<<<<< HEAD
                    m("td.td_info",[
                        m('i.fa.fa-info-circle'),
                        m('.card.info-box.card-header', ["Please enter the directory url for the task's pictures"])
                        ]),
                    m("td.td_task", "Image's URL"),
                    m("td" ,[m("input",{id:"baseURL", style: {width: "30rem"}})])
                ]),
=======
                    m("td.td_task", "Image's URL"),
                    m("td", [m("input",{style: {width: "30rem"}})])
                ])
>>>>>>> a7b09c19ab26b165cca2f1632f9bc0a95c207642
            ])
        ]) 
    };

<<<<<<< HEAD
    ///////to get the paramters here just need to go through the checkboxes similar clear/resrt function
    ///// and check the checked field and the url value.

=======
>>>>>>> a7b09c19ab26b165cca2f1632f9bc0a95c207642
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
                    ctrl.tab == 1 ? m(taskComponent) : ctrl.tab == 2 ? 'tab 2' : 'tab 3'
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

    //testing

}());
//# sourceMappingURL=index.js.map
