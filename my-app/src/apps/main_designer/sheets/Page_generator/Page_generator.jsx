import React
, {
  useState
}
 from 'react';


import { saveAs } from 'file-saver';


import {convertJsonToRenderClass} from '../../../utils'

import data_objects  from '../../../../data/jsobject3';


  const Page_generator = () => {
    const [renderClass, setRenderClass] = useState(convertJsonToRenderClass(data_objects))
    return (        
        <div>
          <div style={{display:"flex", width:'90vw'}}>
            <div style={{width:'700px', height: "100vh"}}>
              <textarea defaultValue={`${JSON.stringify(data_objects, null, 4)}`} style={{width:'700px', height: "100vh"}}/>
            </div>
            <div style={{flex:1}}>              
              <textarea defaultValue={renderClass} style={{height: "80vh", width:'100%'}}/>
              <button
                onClick={()=>{var blob = new Blob([renderClass], {type: "text/plain;charset=utf-8"});
                saveAs(blob, `${data_objects.namePage}.jsx`);}}
              >Сохранить</button>
            </div>
          </div>
        </div>
    )
  }


  

  export default Page_generator;