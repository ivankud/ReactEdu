// import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './apps/main_designer/App';

// import App from './apps/lesson9/App';

import reportWebVitals from './reportWebVitals';
import renderEntireTree from './render';

import data from './data/jsobject'

renderEntireTree(data)



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>    
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
