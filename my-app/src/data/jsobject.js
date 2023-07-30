let data_objects = {
    "tag":"div",
    "id":"main_object", 
    "block":"true",
    "style":{
        "position":"absolute",
        "left":"0px",
        "top":"0px",
        "backgroundColor": "",
        "width":"100%",
        "height":"100%",
    },
    "content":'asdfasdfasdf',
    "children":[
        {
            "tag":"div",
            "id":"child1", 
            "style":{
                "backgroundColor": "red",
                "position":"absolute",
                "left":"30px",
                "top":"30px",
            },
            "content":'First elem',
        },
        {
            "tag":"button",
            "id":"child2", 
            "style":{
                "backgroundColor": "yellow",
                "position":"absolute",
                "left":"30px",
                "top":"100px",
            },
            "content":'Second elem',
        },
    ],
}

// const changeDataObject =(data)=> {
    // data_objects=data;
// }



export default data_objects;
