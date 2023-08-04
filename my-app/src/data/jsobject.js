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
    "context":[],
    "content":'',
    "children":[
        {
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
            "tag":"div",
            "id":"child1", 
            "style":{
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
                        "width": "100px",
                        "height": "30px"
                    },
                    "content":'Five elem',
                },
                {
                    "tag":"div",
                    "id":"child6", 
                    "style":{
                        "position":"absolute",
                        "left":"100px",
                        "top":"200px",
                        "width": "100px",
                        "height": "30px"
                    },
                    "content":'Six elem',
                },
            ]
        },
        {
            "tag":"div",
            "id":"child2", 
            "style":{
                "border-color": "pink",
                "borderStyle": "solid",
                "borderWidth": "5px",
                "position":"absolute",
                "left":"30px",
                "top":"100px",
                "width": "300px",
                "height": "300px"
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
                        "width": "100px",
                        "height": "30px"
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
                        "width": "100px",
                        "height": "30px"
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
