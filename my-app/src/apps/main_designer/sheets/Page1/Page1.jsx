import {
    // Header,
    Board,
    Console,
  } from '../../../components';

  import data_objects from './jsobject'


  const Page1 = () => {
    let arrGrid = Array(50).fill(Array(50).fill(0)); 
    return (        
        <div
          // style={{position:'static'}}
          // style={{display: "inline-block"}}
        >          
          1 Страница
            <Board grid = {arrGrid} data_objects={data_objects}/>
            <Console data_objects={data_objects}/>
        </div>
    )
  }

  export default Page1;