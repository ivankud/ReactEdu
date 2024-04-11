import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import React from "react";
class Page_example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ position: "relative" }}>123123
        <div
          id="des-main_object"
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            backgroundColor: "",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "85.5px",
              top: "529.25px",
              width: "750px",
              height: "400px",
            }}
            className={"ag-theme-quartz"}
          >
            <AgGridReact
              rowData={[
                {
                  field1: "Строка1.id",
                  field2: "Строка1.scaption",
                  field3: "Строка1.smnemocode",
                },
                {
                  field1: "Строка2.id",
                  field2: "Строка2.scaption",
                  field3: "Строка2.smnemocode",
                },
                {
                  field1: "Строка3.id",
                  field2: "Строка3.scaption",
                  field3: "Строка3.smnemocode",
                },
              ]}
              columnDefs={[
                { field: "field1" },
                { field: "field2" },
                { field: "field3" },
              ]}
            ></AgGridReact>
          </div>
          <div
            id="des-Div_1"
            style={{
              width: "377px",
              height: "217px",
              borderColor: "pink",
              borderStyle: "solid",
              borderWidth: "1px",
              position: "absolute",
              left: "88px",
              top: "31px",
            }}
          >
            Контейнер
            <button
              id="des-ButtonType2_1"
              key="des-ButtonType2_1"
              style={{
                position: "absolute",
                left: "127px",
                top: "187px",
                backgroundColor: "red",
                width: "75px",
                height: "30px",
              }}
            >
              Кнопка2
            </button>
            <input
              id="des-Input_1"
              style={{
                position: "absolute",
                left: "0px",
                top: "0px",
                width: "75px",
                height: "30px",
              }}
              placeholder={"Поле ввода"}
              defaultValue={"Поле ввода"}
              value={this.state.undefined}
            />
            <button
              id="des-Button_1"
              key="des-Button_1"
              style={{
                position: "absolute",
                left: "302px",
                top: "55px",
                backgroundColor: "green",
                width: "75px",
                height: "30px",
              }}
            >
              Кнопка1
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Page_example;
