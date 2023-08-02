import React
// , {useState, useEffect}
 from 'react';

// import {Object} from './../../../components';

import {
  // ObjectJson,
  Button,
  ObjectTree
} from '../../../components';



import data_objects from '../../../../data/jsobject';

import styles from './Page2.module.css';
// import { updateObject } from '../../../utils';

  const Page2 = () => {
    return (        
        <div>
          <ObjectTree data_objects={data_objects}/>
          
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
        </div>
    )
  }

  export default Page2;