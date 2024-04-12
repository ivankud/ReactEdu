import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Split from "@uiw/react-split";
class Page_test_env extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <Split mode="vertical" visible={false}>
            <div style={{ minHeight: 45, background: "#dcdcdc" }}>Header</div>
            <Split visible={false}>
              <div
                style={{minWidth: 200,maxWidth: 200,minHeight: 120,background: "#b5b5b5",}}>
                Sider
              </div>
              <div style={{ width: "100%", background: "#ececec" }}>
                Content
              </div>
            </Split>
            <div style={{ minHeight: 45, background: "#dcdcdc" }}>Footer</div>
          </Split>
          <div style={{ height: 20 }}></div>
          <Split visible={false}>
            <div
              style={{minWidth: 200,maxWidth: 200,minHeight: 85,background: "#a9a9a9",}}
            >
              Sider
            </div>
            <Split mode="vertical" visible={false} style={{ width: "100%" }}>
              <div style={{ minHeight: 45, background: "#dcdcdc" }}>Header</div>
              <div style={{ minHeight: 85, background: "#b5b5b5" }}>
                Content
              </div>
              <div style={{ minHeight: 45, background: "#dcdcdc" }}>Footer</div>
            </Split>
          </Split>
        </div>
        <Split style={{ height: "100%", border: "1px solid #d5d5d5", borderRadius: 3 }}>
          <div>Left Pane</div>
          <div>Center Pane</div>
          <div style={{ flex: 1 }}>Center Pane</div>
          <div>Right Pane</div>
        </Split>
      </div>
    );
  }
}

export default Page_test_env;
