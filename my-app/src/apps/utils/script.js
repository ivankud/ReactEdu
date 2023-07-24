/*script for program, test and run different function*/

let data_objects = {
    "tag":"div",
    "id":"main_object", 
    "style":{
        "position":"absolute",
        "left":"0px",
        "top":"0px",
        "background-color": "green",
        "width":"100px",
        "height":"100px",
    },
    "content":'asdfasdfasdf',
    "children":[
        {
            "tag":"div",
            "id":"child1", 
            "style":{
                "background-color": "red",
                "position":"absolute",
                "left":"30px",
                "top":"30px",
            },
            "content":'First elem',
        },
        {
            "tag":"div",
            "id":"child2", 
            "style":{
                "background-color": "yellow",
                "position":"absolute",
                "left":"30px",
                "top":"100px",
            },
            "content":'Second elem',
            "children":[
                {
                    "tag":"div",
                    "id":"child4", 
                    "style":{
                        "background-color": "red",
                        "position":"absolute",
                        "left":"300px",
                        "top":"30px",
                    },
                    "content":'First elem',
                },
                {
                    "tag":"div",
                    "id":"child4", 
                    "style":{
                        "background-color": "yellow",
                        "position":"absolute",
                        "left":"30px",
                        "top":"100px",
                    },
                    "content":'Second elem',
                },
            ],
        },
    ],
}

function getObject(){}

function getChildren(){}

function getLoopForTags(json, id){
    // console.log('INPUT JSON>>',json)
    // console.log('INPUT ID>>',id)
    let targetJSON;
    Object.keys(json).forEach(key=>{
        if(json[key]===id && key==='id') {
            // console.log('FIND>>')
            targetJSON = json;
        }
    })
    if(targetJSON === undefined) {
        if(json.hasOwnProperty('children')) {
            json["children"].forEach((child, index) => {
                let tempTargetJSON = getLoopForTags(child, id)
                if(tempTargetJSON) {
                    if(targetJSON) console.error(`Найдено несколько объектов с заданным id - ${id}`)
                    targetJSON = tempTargetJSON;
                }
            });
        }
    }
    return targetJSON;
}

export function getElementById(json, id){
    return getLoopForTags(json, id);
}
// let elem = getElementById(data_objects,'child4')

// console.log('>>>',elem)
