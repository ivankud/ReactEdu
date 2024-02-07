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
    "children":[{
            "tag": "table",
            "id": "Table_1",
            "style": {
                "position": "absolute",
                "left": "467.56640625px",
                "top": "242.25px"
            },
            "content": "Таблица",
            "model":[
                {
                    "name":"field1",
                    "field":"id"
                },
                {
                    "name":"field2",
                    "field":"scaption"
                },
                {
                    "name":"field3",
                    "field":"smnemocode"
                }]
        },
        {
            "tag":"button",
            "id":"child1", 
            "style":{
                "backgroundColor": "red",
                "position":"absolute",
                "left":"30px",
                "top":"30px",
            },
            "content":'First elem',
            "children":[
                {
                    "tag":"button",
                    "id":"child5", 
                    "style":{
                        "position":"absolute",
                        "left":"100px",
                        "top":"100px",
                        "width": "100%"
                    },
                    "content":'Five elem',
                },
                {
                    "tag":"div",
                    "id":"child6", 
                    "style":{
                        "backgroundColor": "yellow",
                        "position":"absolute",
                        "left":"100px",
                        "top":"200px",
                        "width": "100%"
                    },
                    "content":'Six elem',
                },
            ]
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



export default data_objects;
