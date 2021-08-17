import { clone } from "../resources/utilities";

let blocksComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, clearBlock){
    var blocks = settings.trialsByBlock;
    let addFlag =  m.prop(blocks.length < 30 ? 'visible' : 'hidden');
    let removeFlag = m.prop('hidden');
    let chooseFlag = m.prop('hidden');
    let choosenBlocksList = [];
    let chooseClicked = m.prop(false)
    return {reset:reset, clear:clear, set:set, get:get, blocks:blocks, getParameters: getParameters, 
        setParameters:setParameters, addFlag:addFlag, removeFlag:removeFlag, 
        chooseFlag:chooseFlag, addBlock:addBlock, removeBlocks:removeBlocks,
        choosenBlocksList:choosenBlocksList, updateChoosenBlocks: updateChoosenBlocks, chooseBlocks:chooseBlocks};
    
    function reset(){
        Object.assign(blocks, clone(defaultSettings.trialsByBlock));
        if(blocks.length>5){
            blocks.length=5
        }
        settings.switchSideBlock = defaultSettings.switchSideBlock;
        settings.blockOrder = defaultSettings.blockOrder;
        choosenBlocksList.length = 0;
        addFlag('visible')
    }
    function clear(){
        blocks.forEach(element => {
            element.instHTML = '',
            element.miniBlocks = 0,
            element.singleAttTrials = 0, 
            element.sharedAttTrials = 0, 
            element.categoryTrials = 0 
        });
        settings.switchSideBlock = 0;
        settings.blockOrder = defaultSettings.blockOrder;
    }
    function get(name, index){ return blocks[index][name]; }
    function set(name, index, type){ 
        if (type === 'text') return function(value){return blocks[index][name] = value; };
        return function(value){return blocks[index][name] = Math.abs(Math.round(value));};
    }
    function getParameters(name){ return settings[name]; }
    function setParameters(name, type){ 
        if (type === 'select') return function(value){return settings[name] = value; };
        return function(value){return settings[name] = Math.abs(Math.round(value));};
    }
    function updateChoosenBlocks(e, index){
        if (choosenBlocksList.includes(index) && !e.target.checked){
            var i = choosenBlocksList.indexOf(index);
            if (i !== -1) {
            choosenBlocksList.splice(i, 1);
            }
            return;
        } 
        if (e.target.checked) choosenBlocksList.push(index);
    }
    function chooseBlocks(){
        chooseFlag('visible');
        if(!chooseClicked()){  //show the alert only for the first time the choose button has been clicked
            alert('To choose blocks to remove, please tik the checkbox near the wanted block, and to remove them click the \'Remove Choosen Blocks\' button below')
            chooseClicked(true);
        }
    }
    function addBlock(){
        blocks.push(clone(clearBlock[0]));
        blocks.slice(-1)[0]['block'] = blocks.length;
        if (blocks.length === 30) addFlag('hidden') //limit blocks to 30
    }
    function removeBlocks(){
        if (blocks.length < 4) {
            alert('Minimum number of blocks needs to be 3'); 
            choosenBlocksList.length = 0;
            return;
        }
        if ((blocks.length - choosenBlocksList.length) < 3){
            alert('Minimum number of blocks needs to be 3, please choose less blocks to remove');
            choosenBlocksList.length = 0;
            return;
        }
        choosenBlocksList.sort();
        for (let i = choosenBlocksList.length - 1; i >=0; i--) {
            blocks.splice(choosenBlocksList[i],1)
        }
        for (let i = 0; i < blocks.length; i++) {
            blocks[i]['block'] = i+1
        }
        choosenBlocksList.length = 0;
        chooseFlag('hidden');
    }
}

function view(ctrl){
    return m('.container' , [
        m('.row.space top-buffer', [
            m('.col-sm-2.space',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['Change to \'startRight\' if you want to start with category on the right in the first block, \'startLeft\' if you want to start with category on the left in the first block or \'random\' if you want to randomize the order.']),
                m('span', [' ', 'Blocks order'])
            ]),
            m('.col-md-10',
                m('select.form-control',{value: ctrl.getParameters('blockOrder'), onchange:m.withAttr('value',ctrl.setParameters('blockOrder','select')), style: {width: '8.3rem', height:'2.7rem'}},[
                    m('option', 'random'),
                    m('option', 'startRight'),
                    m('option', 'startLeft'),
                ]))        
        ]),
        m('.row.space top-buffer', [
            m('.col-sm-2.space',[
                m('i.fa.fa-info-circle'),
                m('.card.info-box.card-header', ['By default, we switch on block 4 (i.e., after blocks 2 and 3 showed the first pairing condition).']),
                m('span', [' ', 'Switch side block'])
            ]),
            m('.col-sm-9',
                m('input[type=number].form-control',{value: ctrl.getParameters('switchSideBlock'), onchange:m.withAttr('value',ctrl.setParameters('switchSideBlock')), style: {width: '4em'}, min:0}))   
        ]),
        ctrl.blocks.map(function(block) {
            let index = ctrl.blocks.indexOf(block);
            return m('div',[
                m('.row.space top-buffer', [
                    m('.col-sm-2',[
                        m('input[type=checkbox]', {checked : ctrl.choosenBlocksList.includes(index), style:{visibility: ctrl.chooseFlag()}, onclick: (e) => ctrl.updateChoosenBlocks(e, index)}),
                        m('span', [' ','Block '+parseInt(index+1)])
                    ]),
                    m('.col-md-10',[
                        m('.row.space', [
                            m('.col-sm-3.space',[
                                m('i.fa.fa-info-circle'),
                                m('.card.info-box.card-header', ['Empty field means we will create the instructions from a deafault template. ']),
                                m('span', [' ', 'Block\'s Instructions:'])
                            ]),
                            m('.col-sm-9', [
                                m('textarea.form-control',{style: {width: '15rem' ,height: '4rem'},onchange: m.withAttr('value', ctrl.set('instHTML', index, 'text')), value: ctrl.get('instHTML', index)})
                            ])
                        ]),
                        m('.row.space',[
                            m('.col-sm-3.space',[
                                m('i.fa.fa-info-circle'),
                                m('.card.info-box.card-header', ['Higher number reduces repetition of same group/response. Set to 1 if you don\'t need mini blocks. 0 will break the task.']),
                                m('span', [' ', 'Number of mini-blocks: '])
                            ]),
                            m('.col-sm-9', [
                                m('input[type=number].form-control',{style:{width:'4em'},onchange: m.withAttr('value', ctrl.set('miniBlocks', index,'number')), value: ctrl.get('miniBlocks', index), min:0})
                            ])
                        ]),
                        m('.row.space',[
                            m('.col-sm-3.space',[
                                m('i.fa.fa-info-circle'),
                                m('.card.info-box.card-header', ['Number of trials of the attribute that does not share key with the category (in a mini block).']),
                                m('span', [' ', 'Number of single attribute trials: '])
                            ]),
                            m('.col-sm-9', [
                                m('input[type=number].form-control',{style:{width:'4em'},onchange: m.withAttr('value', ctrl.set('singleAttTrials', index,'number')), value: ctrl.get('singleAttTrials', index), min:0})
                            ])
                        ]),
                        m('.row.space',[
                            m('.col-sm-3.space',[
                                m('i.fa.fa-info-circle'),
                                m('.card.info-box.card-header', ['Number of trials of the attribute that shares key with the category (in a mini block).']),
                                m('span', [' ', 'Number of shared key attribute trials: '])
                            ]),
                            m('.col-sm-9', [
                                m('input[type=number].form-control',{style:{width:'4em'},onchange: m.withAttr('value', ctrl.set('sharedAttTrials', index,'number')), value: ctrl.get('sharedAttTrials', index), min:0})
                            ])
                        ]),
                        m('.row.space',[
                            m('.col-sm-3.space',[
                                m('i.fa.fa-info-circle'),
                                m('.card.info-box.card-header', ['Number of trials of the category (in a mini-block). If 0, the label does not appear.']),
                                m('span', [' ', 'Number of category trials: '])
                            ]),
                            m('.col-sm-9', [
                                m('input[type=number].form-control',{style:{width:'4em'}, onchange: m.withAttr('value', ctrl.set('categoryTrials', index,'number')), value: ctrl.get('categoryTrials', index), min:0})
                            ])
                        ])
                    ])
                ])
            ]);
                    
        }),
        m('.row.space justify-content-md-center',[
            m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons'}},[
                m('button.btn btn btn-info',{onclick: ctrl.addBlock, style:{'padding-right':'60px','padding-left':'60px' ,visibility: ctrl.addFlag()}}, [m('i.fas fa-plus')],' Add Block'),
                m('button.btn btn btn-warning',{onclick: ctrl.chooseBlocks},[
                    m('i.fas fa-check'), ' Choose Blocks to Remove']),
                m('button.btn btn btn-danger',{onclick: ctrl.removeBlocks},[
                    m('i.far fa-minus-square'), ' Remove Choosen Blocks']),
            ])
        ]),
        m('.row.space',[
            m('.col',{style:{'margin-bottom':'7px'}},[
                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
                    m('button.btn btn-secondary', 
                        {title:'Reset all current fields to default values', onclick: () => confirm('Are you sure you want to reset the current form?\n This action is permanent') ? ctrl.reset() : null},[
                        m('i.fas fa-undo fa-sm'), ' Reset'
                    ]),
                    m('button.btn btn-danger',
                        {title:'Clears all current values',onclick:() => confirm('Are you sure you want to clear the current form?\n This action is permanent') ? ctrl.clear() : null},[
                        m('i.far fa-trash-alt fa-sm'), ' Clear'
                    ]),
                ]),
            ]),
        ])
    ]);
}


export default blocksComponent;

