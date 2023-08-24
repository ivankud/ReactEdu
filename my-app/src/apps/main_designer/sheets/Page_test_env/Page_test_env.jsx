import React
, {
  useEffect,
  useState
}
 from 'react';
 import { createRoot } from 'react-dom/client';
 import { AgGridReact } from 'ag-grid-react'; 
 import 'ag-grid-community/styles/ag-grid.css';
 import 'ag-grid-community/styles/ag-theme-alpine.css';
// import {Object} from './../../../components';

import { saveAs } from 'file-saver';
// import ReactDomServer from 'react-dom/server';

import {
  // ObjectJson,
  Button,
  ObjectTree,
  // ResizableBox,
  // Content,
  // SwaggerAPITree
  TableModelDialog
} from '../../../components';

import {convertJsonToRenderText,convertJsonToRenderClass} from '../../../utils'

// import { Resizable  } from 'react-resizable';

// import data_objects from '../../../../data/jsobject2';

import data_objects  from '../../../../data/jsobject3';
import config_app from '../../../../data/config_app';

import styles from './Page_test_env.module.css';
// import { updateObject } from '../../../utils';

  const Page_test_env = () => {
    const [rowData] = useState([
          {make: "Toyota", model: "Celica", price: 35000},
          {make: "Ford", model: "Mondeo", price: 32000},
          {make: "Porsche", model: "Boxster", price: 72000}
      ]);
    const [columnDefs] = useState([
        { field: 'make' },
        { field: 'model' },
        { field: 'price' }
    ]);
    // const [swaggerData,setSwaggerData] = useState({})
    // const [isLaoded, setIsLoaded] = useState(false)
    const [width, setWidth] = useState(200)
    const [tab, setTab] = useState(2)
    const [height, setHeight] = useState(200)
    const onResize = (event, {element, size, handle}) => {
      setWidth(size.width)
      setHeight(size.height)
    };
    const [model,setModel] = useState({})
    const changeModel=(vModel)=>{
      console.log('vModel>>',vModel)
      setModel(vModel)
    }
    const [modal, setModal] = useState(true)
    const changeModal =()=>{
      setModal(!modal)
    }
    // let apiUrl = config_app.projects.filter(item=>item.name==='kamaz')[0]['swagger-path']
    // useEffect(()=>{
    //   fetch(apiUrl,{method:"get"})
    //   .then(async resolve=>{
    //     setSwaggerData(await resolve.json())
    //     setIsLoaded(true)
    //   })
    //   .catch(reject=>{})  
    // },[])    
    return (        
        <div>
          {JSON.stringify(model)}
          <button onClick={changeModal}>Показать модальное окно модели</button>
          {modal&&<TableModelDialog modal={modal} toggle={changeModal} model={model} changeModel={changeModel}/>}
          {/* {isLaoded&&<SwaggerAPITree data_objects={swaggerData}/>} */}
          <div style={{position:"relative"}}>
            {/* <ResizableBox/> */}
          </div>          
          <ObjectTree data_objects={data_objects}/>   
          <input defaultValue={'213123123'} onChange={()=>{console.log('123123123')}}></input>       
          <table className={styles.table} style={{position:"absolute", left:"200px", top:"200px"}} onClick={()=>{console.log("clickTable")}}>
            <tr>
              <th colspan="2"></th>
            </tr>            
            <tr>
              <td><h12> </h12></td>
              <td><h12> </h12></td>
            </tr>        
            <tr>
              <td><h12> </h12></td>
              <td><h12> </h12></td>
            </tr>
          </table>
          <button style={{border:"none", background: "none"}}>1111111</button>
          
          <button  className={styles['elementButtonInvisibleStyle']}>2222222</button>
          <button  className='border'>2222222</button>
          <div className={styles['header-top']}>
            123123
          </div>
          <p>asdfasdfasdf</p>
          <Button style={{textAlign:'center', lineHeight:"10px"}}>123123</Button>
          <div style={{"width":"30px","height":"30px","border-color":"pink","borderStyle":"solid"}}>4444</div>

          <button style={{fontSize: "x-small"}}>123123</button>
          <div class="container">
          <div class="resize-both" style={{
            border: "5px green double",
            padding: "20px",
            width: "200px",
            height: "200px",
            margin: "16px",
            overflow: "auto",
            resize: "horizontal"
        }}>
              This division can be resized
              in both directions
          </div>
          
          <div class="resize-hor">
              This division can be
              resized horizontally
          </div>
          
          <div class="resize-ver">
              This division can be
              resized vertically
          </div>
          
        </div>
        <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
      </div>
    )
  }


  

  export default Page_test_env;