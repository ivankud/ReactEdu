import React
, {
  useState
  // , useEffect
}
 from 'react';

// import {Object} from './../../../components';

import { saveAs } from 'file-saver';
// import ReactDomServer from 'react-dom/server';

import {
  // ObjectJson,
  Button,
  ObjectTree,
  // ResizableBox,
  // Content,
} from '../../../components';

import {convertJsonToRenderText,convertJsonToRenderClass} from '../../../utils'

// import { Resizable  } from 'react-resizable';

// import data_objects from '../../../../data/jsobject2';

import data_objects  from '../../../../data/jsobject3';

import styles from './Page2.module.css';
// import { updateObject } from '../../../utils';

  const Page2 = () => {
    const [width, setWidth] = useState(200)
    const [tab, setTab] = useState(2)
    const [height, setHeight] = useState(200)
    const onResize = (event, {element, size, handle}) => {
      setWidth(size.width)
      setHeight(size.height)
    };

    // let content = convertJsonToRenderText(data_objects)
    let renderClass = convertJsonToRenderClass(data_objects)
    return (        
        <div>
          {tab===2&&
          <div style={{display:"flex", width:'90vw'}}>
            <div style={{width:'700px', height: "100vh"}}>
              <textarea defaultValue={`${JSON.stringify(data_objects, null, 4)}`} style={{width:'700px', height: "100vh"}}/>
            </div>
            <div style={{flex:1}}>              
              <textarea defaultValue={renderClass} style={{height: "80vh", width:'100%'}}/>
              <button
                onClick={()=>{var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "hello world.txt");}}
              >Сохранить</button>
                {/* <div dangerouslySetInnerHTML={{__html: content2}}></div> */}                      
            </div>
          </div>
          }
          {tab===1&&<div>
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
          </div>}
        </div>
    )
  }


  

  export default Page2;