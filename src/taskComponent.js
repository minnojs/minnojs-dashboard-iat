var taskComponent = {};
taskComponent.parameter = function(label,description, flag) {
    this.label = m.prop(label);
    this.description = m.prop(description);
    this.checked = m.prop(flag);
};
taskComponent.list = Array;

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
        }
        };
    return vm;
}());

taskComponent.controller = function() {
    taskComponent.vm.init();
};

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
                    ])
                ]),
                taskComponent.vm.list.map(function(task, index) {
                return m("tr.lines", [
                    m("td.td_info",[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', [task.description()])
                    ]),
                    m("td.td_task", task.label()),
                    m("td", [
                    m("input[type=checkbox]", {onclick: m.withAttr("checked", task.checked), checked: task.checked()})
                    ])
                ])
                }
            ),
            m("tr.lines", [
                m("td.td_info",[
                    m('i.fa.fa-info-circle'),
                    m('.card.info-box.card-header', ["Please enter the directory url for the task's pictures"])
                    ]),
                m("td.td_task", "Image's URL"),
                m("td" ,[m("input",{id:"baseURL", style: {width: "30rem"}})])
            ]),
        ])
    ]) 
};


export default taskComponent;

///////to get the paramters here just need to go through the checkboxes similar clear/resrt function
///// and check the checked field and the url value.