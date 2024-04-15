import React from "react";

import styles from "./MenuBar.module.css";

import { MeRouter } from "./../";

// import {
//     MeRouter
//   } from './components'; //++

const MenuBar = (props) => {
  return (
    <div className={`${styles.menu_body} d-flex align-items-start flex-column `}>
      <div className="mb-auto">
        {props.menuBarShow === true && <MeRouter />}
      </div>
      <div className="w-100 d-flex justify-content-end">
        <button
          style={{borderStyle:'none', background:'none'}}
          onClick={() => {
            let bshow = !props.menuBarShow;
            props.changeMenuBarShow(bshow);
          }}
        >
          <h1>{props.menuBarShow === true ? "<<" : ">>"}</h1>
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
