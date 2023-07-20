
import { Button } from 'reactstrap';
import React, { useState, useEffect } from 'react';

// import styles from './Page.module.css';

  const Page2 = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      // Обновляем заголовок документа, используя API браузера
      document.title = `Вы нажали ${count} раз`;
    });

    const foo = `<div>foo</div>`;
    return (        
        <div>
          <div>Тестовая страница</div>
          <div>{count}</div>
          <Button color="danger" onClick={()=>setCount(count+1)}>Danger!</Button>
          {/* {`<div>asdfasdf</div>`} */}
          <div dangerouslySetInnerHTML={{ __html: foo }}></div>
        </div>
    )
  }

  export default Page2;