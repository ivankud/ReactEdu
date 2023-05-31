import React from 'react';

import styles from './MenuBar.module.css'



import {MeRouter} from './../'

// import { 
//     MeRouter
//   } from './components'; //++ 

const MenuBar = (props) => {
    return (
        <div className={styles.menu_body}
        >
            <MeRouter/>  
        </div>
    )
}

export default MenuBar;