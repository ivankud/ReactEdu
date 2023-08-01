import React
, {useState, useEffect}
 from 'react';

// import {Object} from './../../../components';

import {
  // ObjectJson,
  // Button
} from '../../../components';

import styles from './Page2.module.css';
// import { updateObject } from '../../../utils';

  const Page2 = () => {
    return (        
        <div>
          <table className={styles.table}>
            <tr className={styles.tr}>
              <th colspan="2">Таблица</th>
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
        </div>
    )
  }

  export default Page2;