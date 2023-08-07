
import React from 'react';



class Page3_example extends React.Component {
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
	<div>
		<div id="main_object" style={{position:'absolute',opacity:'0.9',left:'0px',top:'0px',width:'100%',height:'100%',borderStyle:'solid',borderColor:'#ffffff',borderWidth:'1px'}}>
			<div>
				<input id="InputName" style={{position:'absolute',opacity:'0.9',left:'26px',top:'67px',width:'75px',height:'30px',borderColor:'#ffffff',borderStyle:'solid',borderWidth:'1px'}} placeholder="Твое Имя" value={this.state.selRow['name']}/>
			</div>
			<div>
				<input id="InputDescription" style={{position:'absolute',opacity:'0.9',left:'152px',top:'65px',width:'181px',height:'32px',borderColor:'#ffffff',borderStyle:'solid',borderWidth:'1px'}} placeholder="Описание" value={this.state.selRow['sdescription']}/>
			</div>
			<div>
				<input id="InputAge" style={{position:'absolute',opacity:'0.9',left:'387px',top:'68px',width:'75px',height:'30px',borderColor:'#ffffff',borderStyle:'solid',borderWidth:'1px'}} placeholder="Возраст" value={this.state.selRow['age']}/>
			</div>
			<div>
				<button id="childAgePlus" style={{position:'absolute',opacity:'0.9',background:'red',left:'523px',top:'68px',width:'100px',height:'30px',borderStyle:'solid',borderColor:'#ffffff',borderWidth:'1px'}}>
AgePlus</button>
			</div>
		</div>
	</div>
</div>
    );}
}

export default Page3_example;