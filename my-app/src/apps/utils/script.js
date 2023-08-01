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
                    "id":"child5", 
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


function getPathById(json, id, currentTargetPATH){
    let targetPATH='';
    let targetJSON;
    Object.keys(json).forEach(key=>{
        if(json[key]===id && key==='id') {
            targetPATH = currentTargetPATH;
        }
    })
    if(targetJSON === undefined) {
        if(json.hasOwnProperty('children')) {
            json["children"].forEach((child, index) => {
                let vTemp = currentTargetPATH+(currentTargetPATH&&'>')+'children'+'>'+index;
                // console.log(vTemp)
                let tempTargetPATH = getPathById(child,id,vTemp)
                if(tempTargetPATH) {
                    if(targetJSON) console.error(`Найдено несколько объектов с заданным id - ${id}`)
                    targetPATH = tempTargetPATH;
                }
            });
        }
    }
    return targetPATH;
}

function getPathById1(json, id){
    return getPathById(json, id,'');
}

let obj = {
    "1": "2023.07.30 11:12:16 Выбран объект main_object",
    "0": "2023.07.30 11:12:15 Выбран объект main_object"
}

function objectReverse(obj) {
    let new_obj= {}
    let rev_obj = Object.keys(obj).reverse();
    rev_obj.forEach(function(i) { 
      new_obj[i] = obj[i];
    })
    // console.log(new_obj)
    return new_obj;
  }


// let path = getPathById1(data_objects,'child4')

// console.log('result path>>>>> ',path)
