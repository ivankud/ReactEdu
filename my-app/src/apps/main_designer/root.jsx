import {
    createBrowserRouter,
    // RouterProvider,
  } from "react-router-dom";


import {
  Page_Designer,
  Page_test_env,
  Page_test_env2,
  Page_example,
  Page_generator,
  Page_test_File,
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
  {
    path: "/page_test_json",
    element: <Page_test_env2/>,
    caption: 'Отображение страницы из JSON',
  },
  
  {
    path: "/Page_test_File",
    element: <Page_test_File/>,
    caption: 'Работа с файловой системой',
  },
];

const router = createBrowserRouter(router_list);

export {router, router_list};