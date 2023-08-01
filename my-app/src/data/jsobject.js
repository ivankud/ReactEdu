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
    "content":'',
    "children":[
        {
            "tag":"button",
            "id":"child1", 
            "style":{
                "backgroundColor": "red",
                "position":"absolute",
                "left":"30px",
                "top":"30px",
            },
            "content":'First elem'
        },
        {
            "tag":"div",
            "id":"child2", 
            "style":{
                "backgroundColor": "yellow",
                "position":"absolute",
                "left":"30px",
                "top":"100px",
            },
            "content":'Second elem',
            "children":[
                {
                    "tag":"button",
                    "id":"child3", 
                    "style":{
                        "position":"absolute",
                        "left":"100px",
                        "top":"100px",
                        "width": "100%"
                    },
                    "content":'Third elem',
                },
                {
                    "tag":"div",
                    "id":"child4", 
                    "style":{
                        "backgroundColor": "yellow",
                        "position":"absolute",
                        "left":"100px",
                        "top":"200px",
                        "width": "100%"
                    },
                    "content":'Fourth elem',
                },
            ]
        },
    ],
}

// const changeDataObject =(data)=> {
    // data_objects=data;
// }



export default data_objects;
