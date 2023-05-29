import {
    createBrowserRouter,
    // RouterProvider,
  } from "react-router-dom";


import {Page1,Page2} from "./sheets";

const router_list = [
  {
    path: "/",
    element: <Page1/>,
    caption: 'Страница 1',
  },  
  {
    path: "/page1",
    element: <Page1/>,
    caption: 'Страница 2',
  },  
  {
    path: "/page2",
    element: <Page2/>,
    caption: 'Страница 3',
  },
];

const router = createBrowserRouter(router_list);

export {router, router_list};