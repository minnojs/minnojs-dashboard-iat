export function clone(obj){
    return JSON.parse(JSON.stringify(obj));
}

export function checkMissingElementName(element, name_to_display, error_msg){
    let containsImage = false
    
    //check for missing titles and names
    if(element.name.length == 0)
        error_msg.push(name_to_display+'\'s\ name is missing');

    if(element.title.media.image !== undefined){
        containsImage = true
        if(element.title.media.image.length == 0){
            error_msg.push(name_to_display+'\'s\ title is missing');   
        } 
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
    

    return containsImage
}


    // function checkMissingElementName(element, name_to_display){
    //     if(settings[element].name.length == 0)
    //         error_msg.push(name_to_display+'\'s\ name is missing');
    
    //     if(settings[element].title.media.image !== undefined){
    //         containsImage = true
    //         if(settings[element].title.media.image.length == 0){
    //             error_msg.push(name_to_display+'\'s\ title is missing');
    //         }
    //     }
    //     else{
    //         if(settings[element].title.media.word.length == 0){
    //             error_msg.push(name_to_display+'\'s\ title is missing');
    //         }   
    //     }
    
    //     let stimulusMedia = settings[element].stimulusMedia
    //     for(let i = 0; i < stimulusMedia.length ;i++){
    //         if(stimulusMedia[i].image) containsImage = true
    //     }
    // }