import React from 'react';

import styles from './ObjectProperty.module.css';

import { Input } from 'reactstrap';

const ObjectProperty = (props)=> {
    let inputPropertyName = Object.keys(props.property)[0];
    let inputValue = props.property.value;
    return (
        <div>
            <div className={styles['ObjectProperty']}>
                <div className={styles['ObjectProperty_head']}>
                    {Object.keys(props.property)[0]}
                </div>
                <div className={styles['ObjectProperty_value']}>
                    <Input
                        value={inputValue} 
                        onChange={
                            (e)=>{
                                console.log('key>>',inputPropertyName)
                                console.log('value>>',e.target.value)
                                props.setProperty(inputPropertyName,e.target.value)
                            }
                        }/>
                </div>
            </div>
        </div>
    )
}

export default ObjectProperty;