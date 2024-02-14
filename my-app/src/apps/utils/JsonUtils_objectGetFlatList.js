// let obj ={
//   "tag": "div",
//   "id": "des-main_object",
//   "block": "true",
//   "context": [
//       {
//           "selRow": {
//               "name": "Абу111",
//               "sdescription": "Человек прямоходящий",
//               "age": 42
//           }
//       },
//       {
//           "vNumber": 33
//       }
//   ],
//   "style": {
//       "position": "absolute",
//       "left": "0px",
//       "top": "0px",
//       "backgroundColor": "",
//       "width": "100%",
//       "height": "100%"
//   },
//   "content": "",
//   "children": [
//       {
//           "tag": "table",
//           "id": "des-Table_1",
//           "style": {
//               "position": "absolute",
//               "left": "273.83331298828125px",
//               "top": "245px",
//               "width": "750px",
//               "height": "400px"
//           },
//           "model": [
//               {
//                   "name": "field1",
//                   "field": "id"
//               },
//               {
//                   "name": "field2",
//                   "field": "scaption"
//               },
//               {
//                   "name": "field3",
//                   "field": "smnemocode"
//               }
//           ],
//           "content": "Таблица"
//       },
//       {
//           "tag": "div",
//           "id": "des-Div_1",
//           "style": {
//               "width": "40px",
//               "height": "40px",
//               "border-color": "pink",
//               "borderStyle": "solid",
//               "borderWidth": "1px",
//               "position": "absolute",
//               "left": "741.8333129882812px",
//               "top": "94px"
//           },
//           "content": "Контейнер"
//       },
//       {
//           "tag": "div",
//           "id": "des-Div_2",
//           "style": {
//               "width": "425px",
//               "height": "112px",
//               "border-color": "pink",
//               "borderStyle": "solid",
//               "borderWidth": "1px",
//               "position": "absolute",
//               "left": "117px",
//               "top": "74px"
//           },
//           "content": "Контейнер",
//           "children": [
//               {
//                   "tag": "button",
//                   "id": "des-ButtonType2_1",
//                   "style": {
//                       "position": "absolute",
//                       "left": "350px",
//                       "top": "0px",
//                       "backgroundColor": "red",
//                       "width": "75px",
//                       "height": "30px"
//                   },
//                   "content": "Кнопка2"
//               },
//               {
//                   "tag": "button",
//                   "id": "des-Button_2",
//                   "style": {
//                       "position": "absolute",
//                       "left": "290px",
//                       "top": "78px",
//                       "backgroundColor": "green",
//                       "width": "75px",
//                       "height": "30px"
//                   },
//                   "content": "Кнопка1"
//               },
//               {
//                   "tag": "input",
//                   "id": "des-Input_1",
//                   "style": {
//                       "position": "absolute",
//                       "left": "0px",
//                       "top": "82px",
//                       "width": "75px",
//                       "height": "30px"
//                   },
//                   "content": "Поле ввода"
//               }
//           ]
//       }
//   ]
// }

export function objectGetFlatList(obj, callback, targetNestingTag, result) {
  /*
    Разворачивает объект в плоский список объектов по указанному атрибуту
    если указан колбек возвращает результат работы указанной функции с плоским списокм
  */ 
  const vResult = result ?? [];
  vResult.push(obj);
  if(Object.keys(obj).indexOf(targetNestingTag) !== -1){
    obj[targetNestingTag].forEach(element => {
      objectGetFlatList(element, null, targetNestingTag, result)
    });    
  }
  // if(callback) {
  //    return callback(result)
  // }
  // else {
    // return result;
  // }
}

// let vList = [];
// let vn = 1;
// objectGetFlatList(obj, null, 'children',vList)
// console.log(vList)
// .then((res)=>{
  // vList = res;
// });

// vList.forEach(elem=>{
//   console.log(vn,'->>',vn)
//   vn++;
//   console.log(JSON.stringify(elem))  
// })


