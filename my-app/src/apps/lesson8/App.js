import './App.css';

// import {
//   // Header,
//   Board,
//   Console,
// } from './../components';


import {router} from './root';

import {meRouter} from './../components';


import {
  RouterProvider,
} from "react-router-dom";



const App = () => { 
  // let arrGrid = Array(50).fill(Array(50).fill(0)); 
  return (
    <div>
      ↓
      <div><meRouter/></div>
      
      ↑
      <RouterProvider router={router} />
      {/* <Board grid = {arrGrid}/>
      <Console/> */}
    </div>
  );
}

export default App;
