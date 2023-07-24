
import { Button ,Input} from 'reactstrap';
import React, {
   useState,
   useEffect } from 'react';

import {ObjectProperty} from './../../../components';

// import styles from './Page.module.css';

  const Page2 = () => {
    const[object, setObject] = useState({"value":"green"})

    const setProperty =(nameProperty, value)=>{
      let vObject = JSON.parse(JSON.stringify(object))
      vObject[nameProperty] = value;
      setObject(vObject) 
    }

    return (        
        <div>
          <div>Тестовая страница</div>
          <ObjectProperty
            property={object}
            setProperty={setProperty}
          />
          {JSON.stringify(object)}
        </div>
    )
  }

  export default Page2;