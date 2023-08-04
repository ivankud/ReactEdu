let data_objects = {
    "tag": "div",
    "id": "main_object",
    "block": "true",
    "style": {
        "position": "absolute",
        "left": "0px",
        "top": "0px",
        "backgroundColor": "",
        "width": "100%",
        "height": "100%"
    },
    "context": [
        {
            "selRow": {
                "name": "Абу",
                "sdescription": "Человек прямоходящий",
                "age": 42
            }
        }
    ],
    "content": "",
    "children": [
        {
            "tag": "input",
            "id": "InputName",
            "style": {
                "position": "absolute",
                "left": "26px",
                "top": "67px",
                "width": "75px",
                "height": "30px"
            },
            "value": "selRow['name']",
            "content": "Имя"
        },
        {
            "tag": "input",
            "id": "InputDescription",
            "style": {
                "position": "absolute",
                "left": "152px",
                "top": "65px",
                "width": "181px",
                "height": "32px"
            },
            "value": "selRow['sdescription']",
            "content": "Описание"
        },
        {
            "tag": "input",
            "id": "InputAge",
            "style": {
                "position": "absolute",
                "left": "387px",
                "top": "68px",
                "width": "75px",
                "height": "30px"
            },
            "value": "selRow['age']",
            "content": "Возраст"
        },
        {
            "tag": "button",
            "id": "childAgePlus",
            "action": "selRow=selRow+1",
            "style": {
                "position": "absolute",
                "left": "523px",
                "top": "68px",
                "width": "100px",
                "height": "30px"
            },
            "content": "AgePlus"
        }
    ]
}

// const changeDataObject =(data)=> {
    // data_objects=data;
// }



export default data_objects;
