import {
    // Header,
    Board,
    Console,
  } from '../../../components';


  const Page1 = () => {
    let arrGrid = Array(50).fill(Array(50).fill(0)); 
    return (        
        <div>
            <Board grid = {arrGrid}/>
            <Console/>
        </div>
    )
  }

  export default Page1;