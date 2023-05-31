import './App.css';

// import {
//   // Header,
//   Board,
//   Console,
// } from './../components';


import {
  RouterProvider, Route
} from "react-router-dom"; 

import {router, router_list} from './root';

import { 
  MenuBar,
} from '../components'; //++ 






const App = () => {
  // let arrGrid = Array(50).fill(Array(50).fill(0)); 
  return (
    <div className='row'>      
      <div 
        // className='col2' 
        style={{display: "inline-block",}}
      >
          <MenuBar router={router}/>
      </div>
      <div 
        // className='col2' 
        style={{display: "inline-block",}}
      >
        <RouterProvider router={router}/>
        </div>
    </div>
  );
}

export default App;
