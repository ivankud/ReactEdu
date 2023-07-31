import React
// , {useState}
 from 'react';

// import {Object} from './../../../components';

import {
  // ObjectJson,
  Button
} from '../../../components';

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
          <Button >123123123</Button>
          <Button >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </Button>
          
        </div>
    )
  }

  export default Page2;