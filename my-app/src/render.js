import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './apps/main_designer/App';


let renderEntireTree = (props)=>{
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>    
      <App state={props}/>
    </React.StrictMode>
  );
}

export default renderEntireTree;