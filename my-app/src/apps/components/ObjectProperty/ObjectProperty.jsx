import React from 'react';

import styles from './ObjectProperty.module.css';

// import { Input, Form } from 'reactstrap';

const ObjectProperty = (props)=> {
    // console.log('props.block',props.block)
    let inputPropertyName = Object.keys(props.property)[0]; 
    let inputValue = JSON.stringify(props.property[inputPropertyName], null,4);
    return (
        <div>
            <div className={styles['ObjectProperty']}>
                <div className={styles['ObjectProperty_head']}>
                    {Object.keys(props.property)[0]}
                </div>
                <div className={styles['ObjectProperty_value']}>
                    <textarea           
                        className={styles['ObjectProperty_textarea']}   
                        disabled={ 
                            props.block===true
                        } 
                        value={inputValue} 
                        onChange={
                            (e)=>{
                                let val = e.target.value;
                                val = JSON.stringify(e.target.value);
                                val = JSON.stringify(JSON.parse(e.target.value));
                                props.setProperty(inputPropertyName,val)
                            }
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default ObjectProperty;