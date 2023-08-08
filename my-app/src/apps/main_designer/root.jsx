import {
    createBrowserRouter,
    // RouterProvider,
  } from "react-router-dom";


import {
  Page_Designer,
  Page_test_env,
  Page_example,
  Page_generator
} from "./sheets";

const router_list = [
  {
    path: "/",
    element: <Page_test_env/>,
    caption: 'Страница DEF',
  },  
  {
    path: "/page_designer",
    element: <Page_Designer/>,
    caption: 'Конструктор',
  },  
  {
    path: "/page_generator",
    element: <Page_generator/>,
    caption: 'Генератор',
  },
  {
    path: "/page3",
    element: <Page_example/>,
    caption: 'Сгенерированная страница',
  },
  {
    path: "/page_test",
    element: <Page_test_env/>,
    caption: 'Тестовая страница',
  },
];

const router = createBrowserRouter(router_list);

export {router, router_list};