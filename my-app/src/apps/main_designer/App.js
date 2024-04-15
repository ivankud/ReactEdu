import styles from './App.module.css';

import React, { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//   // Header,
//   Board,
//   Console,
// } from './../components';

import {
  RouterProvider
} from "react-router-dom"; 

import {router} from './root';

import { 
  MenuBar,
} from '../components'; //++ 






const App = (props) => {
  const [menuBarShow, setMenuBarShow] = useState(true);

  const changeMenuBarShow = (value) =>{
    setMenuBarShow(value)
  }
  return (
    <div 
      className={`${styles["grid-container"]}`}
      style={{display: "flex",flexDirection: "row"}}
    >      
      <div style={menuBarShow?{width:'10%', height:'100%'}:{height:'100%'}}>
          <MenuBar router={router} menuBarShow={menuBarShow} changeMenuBarShow={changeMenuBarShow}/>
      </div>      
      <div style={menuBarShow?{width:'90%',flex: 1}:{flex: 1}}>
          <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
