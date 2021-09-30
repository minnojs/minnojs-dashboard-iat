export function clone(obj){
    return JSON.parse(JSON.stringify(obj));
}

export function checkPrime(element, name_to_display, error_msg){
    let containsImage = false
    //check for missing titles and names
    if(element.name.length == 0)
        error_msg.push(name_to_display+'\'s\ name is missing');

    let mediaArray = element.mediaArray
    
    //if there an empty stimulli list
    if (mediaArray.length === 0) 
        error_msg.push(name_to_display+'\'s stimuli list is empty, please enter at least one stimulus.')
    
    //check if the stimuli contains images
    for(let i = 0; i < mediaArray.length ;i++)
        if(mediaArray[i].image) containsImage = true
    
    return containsImage
}

export function checkMissingElementName(element, name_to_display, error_msg){
    let containsImage = false
    //check for missing titles and names
    if(element.name.length == 0)
        error_msg.push(name_to_display+'\'s\ name is missing');

    if(element.title.media.image !== undefined){
        containsImage = true
        if(element.title.media.image.length == 0)
            error_msg.push(name_to_display+'\'s\ title is missing');   
    }
    else{
        if(element.title.media.word.length == 0)
            error_msg.push(name_to_display+'\'s\ title is missing');
    }
    let stimulusMedia = element.stimulusMedia
    
    //if there an empty stimulli list
    if (stimulusMedia.length === 0) 
        error_msg.push(name_to_display+'\'s stimuli list is empty, please enter at least one stimulus.')
    
    //check if the stimuli contains images
    for(let i = 0; i < stimulusMedia.length ;i++)
        if(stimulusMedia[i].image) containsImage = true
    
    if(element.title.startStimulus)
        element.title.startStimulus.media.image ? containsImage = true : '' //for biat only, checking if startStimulus contains image
    
    return containsImage
}

export function showClearOrReset(element, value, action){
    let msg_text = {
        'reset':'This will delete all current properties and reset them to default values.',
        'clear':'This will delete all current properties.'
    };
    swal({
        title: "Are you sure?",
        text: msg_text[action],
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            Object.assign(element, clone(value));
            m.redraw();
        } 
      }).catch((error) =>{
        swal("Oops!", "Something went wrong on the page!\n"+error, "error");
      });
}

export function showRestrictions(text, icon = 'warning', title = ''){
    swal({
        title: title,
        text:text,
        icon: icon,
        button: 'Got it',
      })
}

export function viewOutput(ctrl, settings){
    return m('.container',[
        m('.alert alert-danger', {role:'alert',style: {'margin-top':'20px',visibility: ctrl.error_msg.length === 0 ? 'hidden' : 'visible'}},[
            m('h6','Some problems were found in your script, it\'s recommended to fix them before proceeding to download:'),
            m('ul',[
                ctrl.error_msg.map(function(err){
                    return m('li',err);
                })
            ])
        ]),
        m('.row justify-content-md-center',[
            m('.col-auto'),
            m('col-auto',[
                m('.btn-group-vertical', {style:{'margin-right':'2em' ,width:'250px', 'data-toggle':'buttons'}},[
                    m('button.btn btn btn-primary.createFile', 
                        {onclick: ctrl.createFile(settings,'JS'),
                        title:'Download the JavaScript file. For more details how to use it, see the \"Help\" page.'},
                            m('i.fas fa-file-download'), ' Download Script'),
                    m('button.btn btn btn-primary.subOutput', 
                        {onclick: ctrl.createFile(settings,'JSON'),
                        title: 'Importing this file to this tool, will load all your parameters to this tool.'},
                            m('i.fas fa-file-download'), ' Download JSON'),
                    m('button.btn btn btn-primary.subOutput', {onclick: ctrl.printToPage(settings)}, 'Print to Browser')
                ])
            ])
        ]),
        m('div.space',{id: 'textDiv', style: {visibility: 'hidden'}},
            m('textarea.form-control', {id:'textArea', value:'', style: {width : '60rem', height: '25rem', 'margin-left':'3em'}}))
    ]);
}

export function viewImport(ctrl){
    return m('.container',[ 
        m('br'),
        m('.row justify-content-md-center',[
            m('.card border-info mb-3',{style:{'max-width': '25rem'}}, [
                m('.card-header','Upload a JSON file: ' ),
                m('.card-body text-info',[
                    m('p.card-title','If you saved a JSON file from a previous session, you can upload that file here to edit the parameters.'),
                    m('input[type=file].form-control',{id:'uploadFile', style: {'text-align': 'center'}, onchange: ctrl.handleFile})
                ])
            ])
        ])
    ]);
}