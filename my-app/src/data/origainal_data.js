{
    "tag": "div",
    "id": "main_object",
    "namePage": "pageXXXX",
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
        },
        {
            "vNumber": 33
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
                "height": "30px",
                "borderColor": "#ffffff"
            },
            "value": "selRow['name']",
            "content": "Твое Имя"
        },
        {
            "tag": "input",
            "id": "InputDescription",
            "style": {
                "position": "absolute",
                "left": "152px",
                "top": "65px",
                "width": "181px",
                "height": "32px",
                "borderColor": "#ffffff"
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
                "height": "30px",
                "borderColor": "#ffffff"
            },
            "onChange": "(event)=>{\n                let selRow=this.state.selRow;\n                selRow['age'] = event.target.value;\n                this.setState({selRow:selRow});\n            }",
            "value": "selRow['age']",
            "content": "Возраст"
        },
        {
            "tag": "button",
            "id": "childAgePlus",
            "onClick": "()=>{console.log('123123123123')}",
            "style": {
                "position": "absolute",
                "background": "red",
                "left": "523px",
                "top": "68px",
                "width": "100px",
                "height": "30px"
            },
            "content": "AgePlus"
        }
    ]
}