import {
    // Header,
    Board,
    Console,
  } from '../../../components';


  const Page1 = () => {
    let arrGrid = Array(50).fill(Array(50).fill(0)); 
    return (        
        <div
          // style={{position:'static'}}
          // style={{display: "inline-block"}}
        >          
          2 Страница
            <Board grid = {arrGrid}/>
            <Console/>
        </div>
    )
  }

  export default Page1;