import React
, {
  useEffect,
  useState
}
 from 'react';

import { Button } from '../../../components'

import { saveAs } from 'file-saver';


import {
  convertJsonToRenderClass,
  selectAndReadFileFromWindow, // открытие окна для выбора файла и считывания содердимого JSON
} from '../../../utils'


import data_objects  from '../../../../data/jsobject3';


  const Page_generator = () => {
    const [JSONContent, setJSONContent] = useState(data_objects)  // контент полученный из файла в нем хранится JSON для генерации страницы
    const [renderClass, setRenderClass] = useState(convertJsonToRenderClass(data_objects))

    const setJSONContentFromFile = (value)=>{ /*прочтение контента из файла и установка в шаблон*/
      let vValue = value.replace('export default data_objects;','').replace('let data_objects = ','')
      // console.log('vValue->>')
      // console.log(vValue)
      setJSONContent(JSON.parse(vValue));      
      // setRenderClass(convertJsonToRenderClass(JSON.parse(vValue)))
    }

    useEffect(()=>{
      // setRenderClass(convertJsonToRenderClass(JSONContent))
      // setRenderClass(convertJsonToRenderClass(JSONContent))
    },[JSONContent])
    const vContent = JSONContent;
    return (        
        <div>
          <div style={{display:"flex", width:'90vw'}}>
            <div style={{width:'700px', height: "100vh"}}>
              <div className='d-flex justify-content-center w-100'><h1>Выберите JSON страницы</h1></div>
              <Button className='w-100' onClick={()=>{
                selectAndReadFileFromWindow(setJSONContentFromFile);
              }}>Открыть файл</Button>
              {/* {JSONContent} */}
              <textarea /*defaultValue*/ value={`${JSON.stringify(JSONContent, null, 4)}`} style={{width:'700px', height: "100vh"}}/>
            </div>
            <div style={{flex:1}}>     
              <div className='d-flex justify-content-center w-100'><h1> </h1></div>
              <Button   // кнопка сохранения сгенерированного кода в файл
                id='saveButtonForGenCode'
                className='w-100'
                onClick={()=>{
                  var blob = new Blob([renderClass], {type: "text/plain;charset=utf-8"});
                  saveAs(blob, `${data_objects.namePage}.jsx`);}
                }
              >Сохранить</Button>         
              <textarea
                id="genCodeTextarea"
                // defaultValue={renderClass} 
                value={renderClass} 
                style={{height: "100vh", width:'100%'}}
              />
            </div>
          </div>
        </div>
    )
  }


  

  export default Page_generator;