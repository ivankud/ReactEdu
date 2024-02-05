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
    "content":'asdfasdfas121231233123df',
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
        },
    ],
}

export default data_objects;
