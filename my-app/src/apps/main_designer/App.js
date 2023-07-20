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
    >      
      <div>
          <MenuBar router={router}/>
      </div>      
      <div>
          <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
