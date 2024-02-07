import React /*, { useEffect, useState }*/ from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

/*  ВАРИАНТ НЕБЕЗОПАСНЫЙ, пока отклонен по причине безопасности
    граничит с eval, что очень плохо
    как безопасный вариант обеспечить вызов функции с БД, такой вариант обеспечит сосредоточение логики на базе данных
    пока в разработке вариант с статической генерацией страниц и сохранением кода страницы в директории
  */
class Page_test_env2 extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        count : 0
      }
      this.counterAdd = this.counterAdd.bind(this)
  }

  counterAdd (){
    this.setState({count: this.state.count+1 })
  }
  
  componentDidMount(){
    const funkBody = "return function (name) { return `Hello, ${this.state.count}` }";
    let funk = new Function(funkBody)();
    const funk1 = funk.bind(this)
  }

  render(){
    return (
      <div id='main_frame' style={{ position: "relative" }}>
        <div>
          <p>Вы нажали {this.state.count} раз</p>
          <button onClick={() => {
            // setState({...state, count: state.count+1})
            }
          }>
            Нажми на меня
          </button>
          <button id='12312312'>
            Нажми на меня
          </button>
        </div>
      </div>
    )
  }  
};

export default Page_test_env2;
