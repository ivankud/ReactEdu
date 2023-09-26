import styles from './App.module.css';


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
  return (
    <div 
      className={`${styles["grid-container"]}`}
      style={{display: "flex",flexDirection: "row"}}
    >      
      <div>
          <MenuBar router={router}/>
      </div>      
      <div style={{flex: 1}}>
          <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
