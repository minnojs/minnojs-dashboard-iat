var taskComponent = {};
taskComponent.task = function(data, flag) {
    this.description = m.prop(data);
    this.checked = m.prop(flag);
};
taskComponent.list = Array;

taskComponent.parameters = ["Touch Device", "Qualtrics","Enable Full Screen","Show Debriefing",
                            "Show an Error Message", "Must correct wrong answers"];

taskComponent.vm = (function() {
    var vm = {}
    vm.init = function() {
        vm.list = new taskComponent.list();
        for (var i = 0; i < taskComponent.parameters.length; i++){
            vm.description = m.prop(taskComponent.parameters[i]);
            if (taskComponent.parameters[i] == "Show an Error Message" || taskComponent.parameters[i] == "Must correct wrong answers")
                vm.list.push(new taskComponent.task(vm.description(),true));          
            else vm.list.push(new taskComponent.task(vm.description(),false));          
        }
        }
    return vm;
}())

// taskComponent.controller = function() {
//     taskComponent.vm.init()
// }

function reset () {
    console.log("hello");
    //console.log(document.getElementById("table"));
}

taskComponent.view = function() {
        return m('.container', [
            m('table.w3-table w3-bordered', {id = "table"} [
                m("tr.border_lines",[
                    m("td"), //for space
                    m("td",[
                    m("button.reset_button",{onclick : reset()} ,'Reset'),
                    m("button.reset_button",'Clear')
                    ])
                    ],
                taskComponent.vm.list.map(function(task, index) {
                return m("tr.lines", [
                    //m("td",[
                        //m('.fas-fa-info-circle',[
                        //m('.card.info-box.card-header', ['Here you can define what will be the type of the server and the kind of certifications it will be included.'])
                    //]),
                    //]),
                    m("td.td_task", task.description()),
                    m("td", [
                        m("input[type=checkbox]", {onclick: m.withAttr("checked", task.checked), checked: task.checked()})
                    ])
                ])
                }
            ),
            m("tr.lines", [
                m("td.td_task", "Image's URL"),
                m("td", [m("input",{style: {width: "30rem"}})])
            ])
        )]
    )]
);
};


export default taskComponent;
