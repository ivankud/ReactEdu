
import React from 'react';



class Page_example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          "selRow": {
                    "name": "Абу",
                    "sdescription": "Человек прямоходящий",
                    "age": 42
          },
          "vNumber": 33
}
    }

    render() {
        return (
            <div  style={{position:'relative'}}>
	<div 
    id="main_object"
    style={{"position":"absolute","left":"0px","top":"0px","backgroundColor":"","width":"100%","height":"100%"}}
>
		<input
    id="InputName"
    style={{"position":"absolute","left":"26px","top":"67px","width":"75px","height":"30px","borderColor":"#ffffff"}}
    placeholder={'Твое Имя'}
    defaultValue={'Твое Имя'}
    value={this.state.selRow['name']}
/>
		<input
    id="InputDescription"
    style={{"position":"absolute","left":"152px","top":"65px","width":"181px","height":"32px","borderColor":"#ffffff"}}
    placeholder={'Описание'}
    defaultValue={'Описание'}
    value={this.state.selRow['sdescription']}
/>
		<input
    id="InputAge"
    style={{"position":"absolute","left":"387px","top":"68px","width":"75px","height":"30px","borderColor":"#ffffff"}}
    placeholder={'Возраст'}
    defaultValue={'Возраст'}
    onChange={(event)=>
{
                let selRow=this.state.selRow;
                selRow['age'] = event.target.value;
                this.setState({selRow:selRow});
            }}
    value={this.state.selRow['age']}
/>
		<button 
    id="childAgePlus"
    key = "childAgePlus"
    style={{"position":"absolute","background":"red","left":"523px","top":"68px","width":"100px","height":"30px"}}
    onClick={()=>
{console.log('123123123123')}}
>
AgePlus

</button>
	</div>
</div>
    );}
}

export default Page_example;