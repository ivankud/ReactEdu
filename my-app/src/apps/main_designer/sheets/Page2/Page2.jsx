import React
// , {useState}
 from 'react';

// import {Object} from './../../../components';

import {ObjectJson} from '../../../components';

// import styles from './Page.module.css';
import { updateObject } from '../../../utils';

  const Page2 = () => {
    // const[object, setObject] = useState({"value":"green"})

    // const setProperty =(nameProperty, value)=>{
    //   let vObject = JSON.parse(JSON.stringify(object))
    //   vObject[nameProperty] = value;
    //   setObject(vObject) 
    // }

    
    var data = { 
      "store": {
        "book": [ 
          { "category": "reference",
            "author": "Nigel Rees",
            "title": "Sayings of the Century",
            "price": 8.95
          },
          { "category": "fiction",
            "author": "Evelyn Waugh",
            "title": "Sword of Honour",
            "price": 12.99
          }
        ],
        "bicycle": {
          "color": "red",
          "price": 19.95
        }
      }
    }
    var path = "store>book>0>price"

    updateObject(data, path,"10.00")
    
    return (        
        <div>
          <div>Тестовая страница</div>
          <ObjectJson/>
          {/* <div>Тестовая страница</div>
          <ObjectProperty
            property={object}
            setProperty={setProperty}
          />
          {JSON.stringify(object)} */}
        </div>
    )
  }

  export default Page2;