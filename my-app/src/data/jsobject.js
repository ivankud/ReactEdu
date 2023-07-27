let data_objects = {
    "tag":"div",
    "id":"main_object", 
    "style":{
        "position":"absolute",
        "left":"0px",
        "top":"0px",
        "backgroundColor": "green",
        "width":"100px",
        "height":"100px",
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
